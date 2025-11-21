import { render } from '$lib';
import Email from './Email.svelte';

export const prerender = true;

export async function load() {
	const response = await render(Email);

	return {
		...response
	};
}
