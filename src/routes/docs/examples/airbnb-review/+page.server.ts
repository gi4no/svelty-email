import { render } from '$lib';
import Email from './Email.svelte';

export const prerender = true;

export async function load() {
	const result = await render(Email, {
		authorName: 'Bob'
	});

	return {
		...result
	};
}
