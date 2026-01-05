<script lang="ts">
	import { getTrendingVideos } from '$lib/services/dailymotion';
	import { mapToVideoCard, type VideoCardData } from '$lib/types';
	import VideoGrid from '$lib/components/sections/VideoGrid.svelte';
	import VideoSkeleton from '$lib/components/sections/VideoSkeleton.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { onMount } from 'svelte';

	let videos = $state<VideoCardData[]>([]);
	let loading = $state(true);
	let loadingMore = $state(false);
	let error = $state<string | null>(null);
	let pageNum = $state(1);

	onMount(async () => {
		try {
			const data = await getTrendingVideos(40, 1);
			videos = data.map(mapToVideoCard);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Something went wrong';
		} finally {
			loading = false;
		}
	});

	async function loadMore() {
		loadingMore = true;
		try {
			const nextPage = pageNum + 1;
			const data = await getTrendingVideos(40, nextPage);
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

<div class="py-12 md:py-20">
	<div class="container mx-auto px-6 md:px-12">
		{#if loading}
			<VideoSkeleton count={15} />
		{:else if error}
			<div class="flex flex-col items-center justify-center py-32 text-center">
				<p class="mb-6 text-text-secondary">{error}</p>
				<Button variant="outline" onclick={() => location.reload()}>Try Again</Button>
			</div>
		{:else if videos.length === 0}
			<div class="flex items-center justify-center py-32 text-center text-text-muted">
				<p>No content available at the moment.</p>
			</div>
		{:else}
			<VideoGrid {videos} />

			<div class="mt-20 flex justify-center">
				<Button
					variant="surface"
					size="md"
					class="md:px-8 md:py-3.5 md:text-base"
					onclick={loadMore}
					disabled={loadingMore}
				>
					{loadingMore ? 'Loading content...' : 'Show more videos'}
				</Button>
			</div>
		{/if}
	</div>
</div>
