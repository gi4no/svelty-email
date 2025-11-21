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
		[key: string]: any;
	}

	let { style = {}, class: className = undefined, ...rest }: Props = $props();

	const styleDefault = {
		width: '100%',
		border: 'none',
		borderTop: '1px solid #eaeaea',
		...style
	};
</script>

<hr style={styleToString(styleDefault)} {...rest} class={className} />
