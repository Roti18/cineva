<script lang="ts">
	import type { VideoCardData } from '$lib/types';
	import VideoCard from './VideoCard.svelte';

	const { videos }: { videos: VideoCardData[] } = $props();
</script>

<div class="grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
	{#each videos as video (video.id)}
		<VideoCard {video} />
	{/each}
</div>
