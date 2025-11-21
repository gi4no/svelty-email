<script>
	import Analytics from '$lib/_docs/Analytics.svelte';
	/**
	 * @typedef {Object} Props
	 * @property {import('./$types').PageData} data
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<Analytics />

{@render children?.()}
