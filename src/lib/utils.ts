import { headStyle } from './components/Tailwind.svelte';
import { tailwindToCss, type TailwindSetup } from './tailwind';

export const copyTextToClipboard = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text);
	} catch {
		throw new Error('Not able to copy');
	}
};

export const pxToPt = (px: string): number | null =>
	isNaN(Number(px)) ? null : (parseInt(px, 10) * 3) / 4;

export interface Margin {
	m?: string;
	mx?: string;
	my?: string;
	mt?: string;
	mr?: string;
	mb?: string;
	ml?: string;
}

export const withMargin = (props: Margin) =>
	[
		withSpace(props.m, ['margin']),
		withSpace(props.mx, ['marginLeft', 'marginRight']),
		withSpace(props.my, ['marginTop', 'marginBottom']),
		withSpace(props.mt, ['marginTop']),
		withSpace(props.mr, ['marginRight']),
		withSpace(props.mb, ['marginBottom']),
		withSpace(props.ml, ['marginLeft'])
	].filter((s) => Object.keys(s).length)[0];

const withSpace = (value: string | undefined, properties: string[]) => {
	return properties.reduce((styles, property) => {
		if (value) {
			return { ...styles, [property]: `${value}px` };
		}
		return styles;
	}, {});
};

// https://stackoverflow.com/a/61410824

export const styleToString = (style: Record<string, string | number | null>) => {
	return Object.keys(style).reduce(
		(acc, key) =>
			acc +
			key
				.split(/(?=[A-Z])/)
				.join('-')
				.toLowerCase() +
			':' +
			style[key] +
			';',
		''
	);
};

export const unreachable = (
	condition: never,
	message = `Entered unreachable code. Received '${condition}'.`
): never => {
	throw new TypeError(message);
};

const capitalize = function (str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

const toCamelCase = (str: string) =>
	str.split('-').reduce((acc, el, i) => {
		if (i === 0) {
			acc += el;
		} else {
			acc += capitalize(el);
		}
		return acc;
	}, '');

export const tailwindToInlineCss = (tailwind: TailwindSetup, className: string) => {
	if (!tailwind || !className) {
		return;
	}
	const {
		styles: styleInline,
		className: extraClass,
		nonInlineStyles
	} = tailwindToCss(tailwind, className);
	// inlinleStyle = Object.entries(styles).reduce((acc, [k, v]) => {
	// 	return `${acc}${k}:${v};`;
	// }, '');

	nonInlineStyles && headStyle.update((s) => [...s, nonInlineStyles]);

	return {
		extraClass,
		styleInline: Object.fromEntries(
			Object.entries(styleInline).map(([key, value]) => {
				return [toCamelCase(key), value];
			})
		)
	};
};
