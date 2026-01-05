<script lang="ts">
	import { page } from '$app/state';
	import ErrorPage from '$lib/components/ui/ErrorPage.svelte';

	const error = $derived(page.error);
	const status = $derived(page.status);

	const statusMessages: Record<number, string> = {
		401: 'Unauthorized access',
		403: 'Access denied',
		404: 'Page not found',
		500: 'Internal server error'
	};

	const message = $derived(error?.message || statusMessages[status] || 'Something went wrong');
</script>

<svelte:head>
	<title>{status} | {message}</title>
</svelte:head>

<ErrorPage {status} {message} title={statusMessages[status]} />
