<script lang="ts">
	import type {
		StandardLonghandProperties,
		StandardProperties,
		StandardShorthandProperties
	} from 'csstype';
	import { styleToString, tailwindToInlineCss } from '$lib/utils';
	import { getContext, type Snippet } from 'svelte';
	import type { TailwindSetup } from '$lib/tailwind';

	interface Props {
		style?: StandardLonghandProperties & StandardShorthandProperties & StandardProperties;
		class?: string | undefined;
		children?: Snippet;
		[key: string]: any;
	}

	let { style = {}, class: className = undefined, children, ...rest }: Props = $props();

	const tailwind = getContext<TailwindSetup>('tailwind');
	const { extraClass, styleInline } = tailwindToInlineCss(tailwind, className || '') || {};
</script>

<body
	{...rest}
	style={styleToString({ ...style, ...styleInline })}
	class="{className} {extraClass}"
>
	{@render children?.()}
</body>
