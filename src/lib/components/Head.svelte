<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { children, ...rest }: Props = $props();
</script>

<head {...rest}>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<meta name="x-apple-disable-message-reformatting" />
	{@render children?.()}
</head>
