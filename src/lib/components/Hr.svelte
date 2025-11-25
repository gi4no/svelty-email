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
		style?: StandardLonghandProperties & StandardProperties & StandardShorthandProperties;
		class?: string | undefined;
		[key: string]: any;
	}

	let { style = {}, class: className = undefined, ...rest }: Props = $props();

	const tailwind = getContext<TailwindSetup>('tailwind');
	const { extraClass, styleInline } = tailwindToInlineCss(tailwind, className || '') || {};

	const styleDefault = {
		width: '100%',
		border: 'none',
		borderTop: '1px solid #eaeaea',
		...style,
		...styleInline
	};
</script>

<hr style={styleToString(styleDefault)} {...rest} class="{className} {extraClass}" />
