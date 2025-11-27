<script lang="ts">
	import type {
		StandardLonghandProperties,
		StandardProperties,
		StandardShorthandProperties
	} from 'csstype';
	import { styleToString, tailwindToInlineCss } from '$lib/utils';
	import type { TailwindSetup } from '$lib/tailwind';
	import { getContext } from 'svelte';

	interface Props {
		style?: StandardProperties & StandardLonghandProperties & StandardShorthandProperties;
		alt: string;
		src: string;
		width: string;
		height: string;
		class?: string | undefined;
		[key: string]: any;
	}

	let {
		style = {},
		alt = '',
		src = '',
		width = '0',
		height = '0',
		class: className = undefined,
		...rest
	}: Props = $props();

	const tailwind = getContext<TailwindSetup>('tailwind');
	const { extraClass, styleInline } = tailwindToInlineCss(tailwind, className || '') || {};

	const styleDefault = {
		display: 'block',
		outline: 'none',
		border: 'none',
		textDecoration: 'none',
		...style,
		...styleInline
	};
</script>

<img
	{alt}
	{src}
	{width}
	{height}
	style={styleToString(styleDefault)}
	{...rest}
	class="{className} {extraClass}"
/>
