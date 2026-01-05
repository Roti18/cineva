<script lang="ts">
	import { getEmbedUrl } from '$lib/services/dailymotion';
	import { onMount } from 'svelte';
	import Skeleton from '../ui/Skeleton.svelte';

	const { videoId, title = '' }: { videoId: string; title?: string } = $props();

	let iframeContainer: HTMLDivElement;
	let isVisible = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					isVisible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);

		observer.observe(iframeContainer);

		return () => observer.disconnect();
	});
</script>

<div class="group relative">
	<div
		class="absolute -inset-4 rounded-full bg-accent/5 opacity-0 blur-3xl transition-opacity duration-1000 group-hover:opacity-100"
	></div>

	<div
		class="relative aspect-video w-full overflow-hidden rounded-2xl border border-surface-3 bg-surface-1 shadow-2xl shadow-black/60 transition-transform duration-500"
		bind:this={iframeContainer}
	>
		{#if isVisible}
			<iframe
				src={getEmbedUrl(videoId)}
				{title}
				allow="autoplay; fullscreen; picture-in-picture"
				allowfullscreen
				class="absolute top-0 left-0 h-full w-full border-none"
			></iframe>
		{:else}
			<Skeleton class="h-full w-full" />
		{/if}
	</div>
</div>
