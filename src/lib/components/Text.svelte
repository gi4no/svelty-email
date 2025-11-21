<script lang="ts">
	import type {
		StandardLonghandProperties,
		StandardProperties,
		StandardShorthandProperties
	} from 'csstype';
	import { styleToString } from '$lib/utils';

	interface Props {
		style?: StandardLonghandProperties & StandardShorthandProperties & StandardProperties;
		class?: string | undefined;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { style = {}, class: className = undefined, children, ...rest }: Props = $props();

	const styleDefault = {
		fontSize: '14px',
		lineHeight: '24px',
		margin: '16px 0',
		...style
	};
</script>

<p style={styleToString(styleDefault)} {...rest} class={className}>
	{@render children?.()}
</p>
