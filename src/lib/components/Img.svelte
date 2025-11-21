<script lang="ts">
	import type {
		StandardLonghandProperties,
		StandardProperties,
		StandardShorthandProperties
	} from 'csstype';
	import { styleToString } from '$lib/utils';

	interface Props {
		style?: StandardProperties & StandardLonghandProperties & StandardShorthandProperties;
		alt: string;
		src: string;
		width: string;
		height: string;
		class?: string | undefined;
		[key: string]: any;
	}

	let {
		style = {},
		alt = '',
		src = '',
		width = '0',
		height = '0',
		class: className = undefined,
		...rest
	}: Props = $props();

	const styleDefault = {
		display: 'block',
		outline: 'none',
		border: 'none',
		textDecoration: 'none',
		...style
	};
</script>

<img {alt} {src} {width} {height} style={styleToString(styleDefault)} {...rest} class={className} />
