<script lang="ts">
	import type {
		StandardLonghandProperties,
		StandardProperties,
		StandardShorthandProperties
	} from 'csstype';
	import { pxToPt, styleToString, tailwindToInlineCss } from '$lib/utils';
	import type { TailwindSetup } from '$lib/tailwind';
	import { getContext } from 'svelte';

	interface Props {
		style?: StandardProperties & StandardLonghandProperties & StandardShorthandProperties;
		href: string;
		target?: string;
		pX?: number;
		pY?: number;
		class?: string | undefined;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let {
		style = {},
		href = '',
		target = '_blank',
		pX = 0,
		pY = 0,
		class: className = undefined,
		children,
		...rest
	}: Props = $props();

	const y = pY * 2;
	const textRaise = pxToPt(y.toString());

	const buttonStyle = (style?: Record<string, string | number> & { pY?: number; pX?: number }) => {
		const paddingY = style?.pY || 0;
		const paddingX = style?.pX || 0;

		return {
			...style,
			lineHeight: '100%',
			textDecoration: 'none',
			display: 'inline-block',
			maxWidth: '100%',
			padding: `${paddingY}px ${paddingX}px`
		};
	};

	const buttonTextStyle = (
		style?: Record<string, string | number | null> & { pY?: number; pX?: number }
	) => {
		const paddingY = style?.pY || 0;

		return {
			...style,
			maxWidth: '100%',
			display: 'inline-block',
			lineHeight: '120%',
			textDecoration: 'none',
			textTransform: 'none' as const,
			msoPaddingAlt: '0px',
			msoTextRaise: pxToPt(paddingY.toString())
		};
	};

	const tailwind = getContext<TailwindSetup>('tailwind');
	const { extraClass, styleInline } = tailwindToInlineCss(tailwind, className || '') || {};
</script>

<a
	{...rest}
	{href}
	{target}
	style={styleToString(buttonStyle({ ...style, pX, pY, ...styleInline }))}
	class="{className} {extraClass}"
>
	<span>
		{@html `<!--[if mso]><i style="letter-spacing: ${pX}px;mso-font-width:-100%;mso-text-raise:${textRaise}" hidden>&nbsp;</i><![endif]-->`}
	</span>
	<span style={styleToString(buttonTextStyle({ ...style, pX, pY }))}>
		{@render children?.()}
	</span>
	<span>
		{@html `<!--[if mso]><i style="letter-spacing: ${pX}px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]-->`}
	</span>
</a>
