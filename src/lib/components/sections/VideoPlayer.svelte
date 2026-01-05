<script lang="ts">
	import { getEmbedUrl } from '$lib/services/dailymotion';
	import { onMount } from 'svelte';
	import Skeleton from '../ui/Skeleton.svelte';
	import { Maximize } from '@lucide/svelte';

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
		class="pointer-events-none absolute -inset-4 rounded-full bg-accent/5 opacity-0 blur-3xl transition-opacity duration-1000 group-hover:opacity-100"
	></div>

	<div
		class="relative z-10 aspect-video w-full rounded-2xl border border-surface-3 bg-surface-1 shadow-2xl shadow-black/60 transition-transform duration-500"
		bind:this={iframeContainer}
	>
		{#if isVisible}
			<iframe
				src={getEmbedUrl(videoId)}
				{title}
				width="100%"
				height="100%"
				allow="autoplay; fullscreen; picture-in-picture; web-share; encrypted-media; gyroscope; accelerometer"
				allowfullscreen
				{...{ webkitallowfullscreen: true, mozallowfullscreen: true }}
				class="absolute top-0 left-0 h-full w-full rounded-2xl border-none"
			></iframe>

			<button
				onclick={() => {
					if (document.fullscreenElement) {
						document.exitFullscreen();
					} else {
						iframeContainer.requestFullscreen();
					}
				}}
				class="absolute right-2 bottom-2 z-20 flex h-8 w-8 translate-y-2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-black/60 active:scale-90 md:right-4 md:bottom-4 md:h-10 md:w-10"
				aria-label="Toggle Fullscreen"
			>
				<Maximize class="h-4 w-4 md:h-5 md:w-5" strokeWidth={2.5} />
			</button>
		{:else}
			<Skeleton class="h-full w-full" />
		{/if}
	</div>
</div>
