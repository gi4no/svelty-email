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
		class?: string | undefined;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { style = {}, class: className = undefined, children, ...rest }: Props = $props();

	const tailwind = getContext<TailwindSetup>('tailwind');
	const { extraClass, styleInline } = tailwindToInlineCss(tailwind, className || '') || {};

	const styleDefault = {
		fontSize: '14px',
		lineHeight: '24px',
		margin: '16px 0',
		...style,
		...styleInline
	};
</script>

<p style={styleToString(styleDefault)} {...rest} class="{className} {extraClass}">
	{@render children?.()}
</p>
