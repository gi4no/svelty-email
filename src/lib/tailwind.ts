import { generate, List, parse, type CssNode, type Rule, type StyleSheet } from 'css-tree';
import { compile } from 'tailwindcss';
import indexCss from 'tailwindcss/index.css?inline';
import preflightCss from 'tailwindcss/preflight.css?inline';
import themeCss from 'tailwindcss/theme.css?inline';
import utilitiesCss from 'tailwindcss/utilities.css?inline';
import type { TailwindConfig } from './components/Tailwind.svelte';
import { resolveAllCssVariables } from './tailwind/css/resolve-all-css-variables';
import { resolveCalcExpressions } from './tailwind/css/resolve-calc-expressions';
import { sanitizeDeclarations } from './tailwind/css/sanitize-declarations';
import { extractRulesPerClass } from './tailwind/css/extract-rules-per-class';
import { getCustomProperties } from './tailwind/css/get-custom-properties';
import { sanitizeNonInlinableRules } from './tailwind/css/sanitize-non-inlinable-rules';
import { makeInlineStylesFor } from './tailwind/css/make-inline-styles-for';
import { sanitizeClassName } from './tailwind/css/sanitize-class-name';

export type TailwindSetup = Awaited<ReturnType<typeof setupTailwind>>;

export async function setupTailwind(config: TailwindConfig = {}) {
	const baseCss = `
@layer theme, base, components, utilities;
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities);
@config;
`;
	const compiler = await compile(baseCss, {
		async loadModule(id, base, resourceHint) {
			if (resourceHint === 'config') {
				return {
					path: id,
					base: base,
					module: config
				};
			}

			throw new Error(`NO-OP: should we implement support for ${resourceHint}?`);
		},
		polyfills: 0, // All
		async loadStylesheet(id, base) {
			if (id === 'tailwindcss') {
				return {
					base,
					path: 'tailwindcss/index.css',
					content: indexCss
				};
			}

			if (id === 'tailwindcss/preflight.css') {
				return {
					base,
					path: id,
					content: preflightCss
				};
			}

			if (id === 'tailwindcss/theme.css') {
				return {
					base,
					path: id,
					content: themeCss
				};
			}

			if (id === 'tailwindcss/utilities.css') {
				return {
					base,
					path: id,
					content: utilitiesCss
				};
			}

			throw new Error('stylesheet not supported, you can only import the ones from tailwindcss');
		}
	});

	let css: string = baseCss;

	return {
		addUtilities: function addUtilities(candidates: string[]): void {
			css = compiler.build(candidates);
		},
		getStyleSheet: function getCss() {
			return parse(css) as StyleSheet;
		}
	};
}

export function sanitizeStyleSheet(styleSheet: StyleSheet) {
	resolveAllCssVariables(styleSheet);
	resolveCalcExpressions(styleSheet);
	sanitizeDeclarations(styleSheet);
}

export const tailwindToCss = (tailwindSetup: TailwindSetup, className: string) => {
	let classesUsed: string[] = [];

	const classes = className?.split(/\s+/);
	classesUsed = [...classesUsed, ...classes];
	tailwindSetup.addUtilities(classes);

	const styleSheet = tailwindSetup.getStyleSheet();
	sanitizeStyleSheet(styleSheet);

	const { inlinable: inlinableRules, nonInlinable: nonInlinableRules } = extractRulesPerClass(
		styleSheet,
		classesUsed
	);

	const customProperties = getCustomProperties(styleSheet);

	const nonInlineStyles: StyleSheet = {
		type: 'StyleSheet',
		children: new List<CssNode>().fromArray(Array.from(nonInlinableRules.values()))
	};
	sanitizeNonInlinableRules(nonInlineStyles);

	const residualClasses: string[] = [];

	const rules: Rule[] = [];
	for (const className of classes) {
		const rule = inlinableRules.get(className);
		if (rule) {
			rules.push(rule);
		} else {
			residualClasses.push(className);
		}
	}

	if (residualClasses.length > 0) {
		className = residualClasses
			.map((className) => {
				if (nonInlinableRules.has(className)) {
					return sanitizeClassName(className);
				}
				return className;
			})
			.join(' ');
	}

	const styles = makeInlineStylesFor(rules, customProperties);

	return {
		styles,
		customProperties,
		nonInlinableRules,
		nonInlineStyles: generate(nonInlineStyles),
		inlinableRules,
		className
	};
};
