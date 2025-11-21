<script lang="ts">
	import { Button, Hr, Html, Text } from '$lib';

	interface Props {
		name?: string;
	}

	let { name = 'World' }: Props = $props();
</script>

<Html lang="en">
	<Text>
		Hello, {name}!
	</Text>
	<Hr />
	<Button href="https://svelte.dev">Visit Svelte</Button>
</Html>
