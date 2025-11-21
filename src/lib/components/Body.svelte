<script lang="ts">
	import type {
		StandardLonghandProperties,
		StandardProperties,
		StandardShorthandProperties
	} from 'csstype';
	import { styleToString } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		style?: StandardLonghandProperties & StandardShorthandProperties & StandardProperties;
		class?: string | undefined;
		children?: Snippet;
		[key: string]: any;
	}

	let { style = {}, class: className = undefined, children, ...rest }: Props = $props();
</script>

<body {...rest} style={styleToString({ ...style })} class={className}>
	{@render children?.()}
</body>
