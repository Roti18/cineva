<script lang="ts">
	import { page } from '$app/state';
	import { searchVideos } from '$lib/services/dailymotion';
	import { mapToVideoCard, type VideoCardData } from '$lib/types';
	import VideoGrid from '$lib/components/sections/VideoGrid.svelte';
	import VideoSkeleton from '$lib/components/sections/VideoSkeleton.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import ErrorPage from '$lib/components/ui/ErrorPage.svelte';
	import TimeoutError from '$lib/components/ui/TimeoutError.svelte';

	let videos = $state<VideoCardData[]>([]);
	let loading = $state(false);
	let loadingMore = $state(false);
	let error = $state<string | null>(null);
	let currentQuery = $state('');
	let pageNum = $state(1);
	let abortController: AbortController | null = null;

	let query = $derived(page.url.searchParams.get('q') || '');

	$effect(() => {
		if (query && query !== currentQuery) {
			loadResults(query);
		}
	});

	async function loadResults(searchQuery: string) {
		if (abortController) abortController.abort();
		abortController = new AbortController();

		loading = true;
		error = null;
		videos = [];
		currentQuery = searchQuery;
		pageNum = 1;

		try {
			const data = await searchVideos(searchQuery, 40, 1, abortController.signal);
			videos = data.map(mapToVideoCard);
		} catch (e: any) {
			if (e.name === 'AbortError') return;
			error = e instanceof Error ? e.message : 'Search failed';
		} finally {
			if (currentQuery === searchQuery) loading = false;
		}
	}

	async function loadMore() {
		loadingMore = true;
		try {
			const nextPage = pageNum + 1;
			const data = await searchVideos(currentQuery, 40, nextPage);
			const newVideos = data.map(mapToVideoCard);
			videos = [...videos, ...newVideos];
			pageNum = nextPage;
		} catch (e) {
			console.error(e);
		} finally {
			loadingMore = false;
		}
	}
</script>

<svelte:head>
	<title>{query ? `${query} / Search Results` : 'Search'} | Cineva</title>
</svelte:head>

<div class="py-12 md:py-16">
	<div class="container mx-auto px-6 md:px-12">
		{#if query}
			<header class="mb-12">
				<p class="mb-2 text-[11px] font-bold tracking-widest text-accent uppercase">
					Search Results
				</p>
				<h1 class="text-3xl font-black tracking-tight text-text-primary">
					Showing results for "{query}"
				</h1>
			</header>

			{#if loading}
				<VideoSkeleton count={10} />
			{:else if error}
				{#if error.includes('Timeout')}
					<TimeoutError actionLabel="Retry Hunt" />
				{:else}
					<ErrorPage status={500} title="Search Breach" message={error} actionLabel="Retry Hunt" />
				{/if}
			{:else if videos.length === 0}
				<div class="flex flex-col items-center justify-center py-32 text-center text-text-muted">
					<p class="text-lg">We couldn't find anything matching your search.</p>
					<Button variant="ghost" class="mt-4" onclick={() => history.back()}
						>Try another search</Button
					>
				</div>
			{:else}
				<VideoGrid {videos} />

				<div class="mt-20 flex justify-center pb-12">
					<Button variant="surface" size="lg" onclick={loadMore} disabled={loadingMore}>
						{loadingMore ? 'Loading more results...' : 'Load more results'}
					</Button>
				</div>
			{/if}
		{:else}
			<div
				class="flex flex-col items-center justify-center py-40 text-center text-text-muted opacity-60"
			>
				<p class="text-xl font-medium">Explore the cinematic library</p>
			</div>
		{/if}
	</div>
</div>
