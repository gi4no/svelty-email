<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
	export const cols: 1 | 2 | 3 | 4 = 2;
</script>

<div class={'card-group'}>
	{@render children?.()}
</div>

<style>
	.card-group {
		display: grid;
		grid-gap: 1rem;
		grid-template-columns: repeat(1, 1fr);
	}

	@media (min-width: 576px) {
		.card-group {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
