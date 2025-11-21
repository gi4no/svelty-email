<script lang="ts">
	interface Props {
		lang?: string;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { lang = 'en', children, ...rest }: Props = $props();
</script>

<html {...rest} id="__svelte-email" {lang}>
	{@render children?.()}
</html>
