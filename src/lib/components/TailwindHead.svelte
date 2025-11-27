<script lang="ts">
	import { headStyle } from './Tailwind.svelte';
</script>

<svelte:head>
	{#if $headStyle.length > 0}
		{@html `<${''}style>${$headStyle.reduce((acc, el) => (acc += el))}</${''}style>`}
	{/if}
</svelte:head>
