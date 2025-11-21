<script lang="ts">
	import type {
		StandardLonghandProperties,
		StandardProperties,
		StandardShorthandProperties
	} from 'csstype';
	import { styleToString } from '$lib/utils';

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

	const styleDefault = {
		color: '#067df7',
		textDecoration: 'none',
		...style
	};
</script>

<a {...rest} {href} {target} style={styleToString(styleDefault)} class={className}>
	{@render children?.()}
</a>
