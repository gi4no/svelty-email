<script lang="ts">
	import type {
		StandardLonghandProperties,
		StandardProperties,
		StandardShorthandProperties
	} from 'csstype';
	import { styleToString, tailwindToInlineCss } from '$lib/utils';
	import { getContext } from 'svelte';
	import { type TailwindSetup } from '$lib/tailwind';

	interface Props {
		style?: StandardLonghandProperties & StandardProperties & StandardShorthandProperties;
		class?: string | undefined;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { style = {}, class: className = undefined, children, ...rest }: Props = $props();

	const tailwind = getContext<TailwindSetup>('tailwind');

	const { extraClass, styleInline } = tailwindToInlineCss(tailwind, className || '') || {};


	const styleDefaultTable = {
		width: '100%',
		...style,
		...styleInline
	};

	const styleDefaultTr = {
		display: 'grid',
		gridAutoColumns: 'minmax(0, 1fr)',
		gridAutoFlow: 'column'
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
	class="{className} {extraClass}"
>
	<tbody>
		<tr style={styleToString(styleDefaultTr)}>
			<td>{@render children?.()}</td>
		</tr>
	</tbody>
</table>
