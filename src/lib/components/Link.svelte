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
		style?: StandardLonghandProperties & StandardShorthandProperties & StandardProperties;
		target?: string;
		href: string;
		class?: string | undefined;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let {
		style = {},
		target = '_blank',
		href = '',
		class: className = undefined,
		children,
		...rest
	}: Props = $props();

	const tailwind = getContext<TailwindSetup>('tailwind');
	const { extraClass, styleInline } = tailwindToInlineCss(tailwind, className || '') || {};

	const styleDefault = {
		color: '#067df7',
		textDecoration: 'none',
		...style,
		...styleInline
	};
</script>

<a {...rest} {href} {target} style={styleToString(styleDefault)} class="{className} {extraClass}">
	{@render children?.()}
</a>
