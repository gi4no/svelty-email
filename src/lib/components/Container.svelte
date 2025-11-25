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
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { style = {}, className = undefined, children, ...rest }: Props = $props();

	const tailwind = getContext<TailwindSetup>('tailwind');
	const { extraClass, styleInline } = tailwindToInlineCss(tailwind, className || '') || {};

	const styles = { maxWidth: '37.5em', ...style, ...styleInline };
	const inlineStyle = styleToString(styles);
</script>

<div>
	{@html `<!--[if mso | IE]>
        <table role="presentation" width="100%" align="center" style="${inlineStyle}" class="${className}"><tr><td></td><td style="width:37.5em;">
      <![endif]-->`}
</div>
<div {...rest} style={inlineStyle} class="{className} {extraClass}">
	{@render children?.()}
</div>
<div>
	{@html `<!--[if mso | IE]>
        </td><td></td></tr></table>
        <![endif]-->`}
</div>
