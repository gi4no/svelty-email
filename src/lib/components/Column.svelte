<script lang="ts">
	import type {
		StandardLonghandProperties,
		StandardProperties,
		StandardShorthandProperties
	} from 'csstype';
	import { styleToString } from '$lib/utils';

	interface Props {
		style?: StandardLonghandProperties & StandardProperties & StandardShorthandProperties;
		class?: string | undefined;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { style = {}, className = undefined, children, ...rest }: Props = $props();

	const styleDefault = {
		display: 'inline-flex',
		justifyContent: 'center',
		alignItems: 'center',
		...style
	};
</script>

<td style={styleToString(styleDefault)} role="row" {...rest} class={className}>
	{@render children?.()}
</td>
