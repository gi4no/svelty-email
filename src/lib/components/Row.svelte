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

	let { style = {}, class: className = undefined, children, ...rest }: Props = $props();

	const styleDefaultTable = {
		width: '100%',
		...style
	};

	const styleDefaultTr = {
		width: '100%'
	};
</script>

<table
	style={styleToString(styleDefaultTable)}
	align="center"
	border={0}
	cellPadding={0}
	cellSpacing={0}
	role="presentation"
	{...rest}
	class={className}
>
	<tbody style={styleToString(styleDefaultTr)}>
		<tr style={styleToString(styleDefaultTr)}>
			{@render children?.()}
		</tr>
	</tbody>
</table>
