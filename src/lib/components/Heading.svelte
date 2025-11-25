<script lang="ts">
	import type {
		StandardLonghandProperties,
		StandardProperties,
		StandardShorthandProperties
	} from 'csstype';
	import { styleToString, tailwindToInlineCss, withMargin } from '$lib/utils';
	import { getContext, type Snippet } from 'svelte';
	import type { TailwindSetup } from '$lib/tailwind';

	interface Props {
		style?: StandardLonghandProperties & StandardProperties & StandardShorthandProperties;
		as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		className?: string;
		m?: string;
		mx?: string;
		my?: string;
		mt?: string;
		mr?: string;
		mb?: string;
		ml?: string;
		children?: Snippet;
	}

	let {
		as = 'h1',
		className,
		m,
		mx,
		my,
		mt,
		mr,
		mb,
		ml,
		style,
		children,
		...rest
	}: Props = $props();

	const tailwind = getContext<TailwindSetup>('tailwind');
	const { extraClass, styleInline } = tailwindToInlineCss(tailwind, className || '') || {};
</script>

<svelte:element
	this={as}
	style={styleToString({
		...withMargin({
			m: m,
			mx: mx,
			my: my,
			mt: mt,
			mr: mr,
			mb: mb,
			ml: ml
		}),
		...style,
		...styleInline
	})}
	class="{className} {extraClass}"
	{...rest}
>
	{@render children?.()}
</svelte:element>
