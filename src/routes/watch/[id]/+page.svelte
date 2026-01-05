<script lang="ts">
	import { page } from '$app/state';
	import { getVideoById, getTrendingVideos } from '$lib/services/dailymotion';
	import { mapToVideoCard, formatViews, type VideoCardData } from '$lib/types';
	import VideoPlayer from '$lib/components/sections/VideoPlayer.svelte';
	import VideoGrid from '$lib/components/sections/VideoGrid.svelte';
	import Skeleton from '$lib/components/ui/Skeleton.svelte';

	interface VideoDetails {
		id: string;
		title: string;
		description: string;
		views: number;
		channel: string;
	}

	let video = $state<VideoDetails | null>(null);
	let relatedVideos = $state<VideoCardData[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);
	let isExpanded = $state(false);

	let videoId = $derived(page.params.id);

	$effect(() => {
		if (videoId) {
			window.scrollTo({ top: 0, behavior: 'smooth' });
			loadVideo(videoId);
		}
	});

	async function loadVideo(id: string) {
		loading = true;
		error = null;

		try {
			const data = await getVideoById(id);
			if (!data) {
				error = 'Video not found';
				return;
			}

			video = {
				id: data.id,
				title: data.title,
				description: data.description || '',
				views: data.views_total,
				channel: data['owner.screenname']
			};

			const trending = await getTrendingVideos(12);
			relatedVideos = trending.filter((v) => v.id !== id).map(mapToVideoCard);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Loading failed';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>{video?.title || 'Watch'} | Cineva</title>
</svelte:head>

<div class="py-8 md:py-16">
	<div class="container mx-auto max-w-7xl px-6 md:px-12">
		{#if loading}
			<div class="space-y-8">
				<Skeleton class="aspect-video rounded-2xl" />
				<div class="space-y-4">
					<Skeleton class="h-8 w-3/4" />
					<Skeleton class="h-4 w-1/4" />
				</div>
			</div>
		{:else if error}
			<div class="flex flex-col items-center justify-center py-32 text-center text-text-secondary">
				<p class="mb-4">{error}</p>
				<a href="/" class="cursor-pointer font-bold text-accent transition-all hover:underline"
					>← Return home</a
				>
			</div>
		{:else if video}
			<div class="mb-12">
				<VideoPlayer videoId={video.id} title={video.title} />
			</div>

			<div class="grid grid-cols-1 gap-12 lg:grid-cols-3">
				<div class="lg:col-span-2">
					<header class="mb-8">
						<h1
							class="mb-4 text-2xl leading-tight font-black tracking-tight text-text-primary md:text-3xl"
						>
							{video.title}
						</h1>
						<div class="flex items-center gap-4 text-[13px] text-text-secondary">
							<span class="font-bold tracking-wider text-accent uppercase">{video.channel}</span>
							<span class="text-text-muted opacity-40">•</span>
							<span class="font-medium">{formatViews(video.views)} views</span>
						</div>
					</header>

					{#if video.description}
						<div
							class="rounded-2xl border border-surface-3/10 bg-surface-1/30 p-8 backdrop-blur-sm"
						>
							<div
								class="relative prose prose-sm max-w-none overflow-hidden transition-all duration-500 prose-invert"
								class:max-h-[150px]={!isExpanded}
								class:max-h-[5000px]={isExpanded}
							>
								{@html video.description}

								{#if !isExpanded}
									<div
										class="absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-surface-1/90 via-surface-1/50 to-transparent"
									></div>
								{/if}
							</div>

							<button
								onclick={() => (isExpanded = !isExpanded)}
								class="mt-4 cursor-pointer text-xs font-bold tracking-widest text-accent uppercase transition-colors hover:text-accent-hover"
							>
								{isExpanded ? 'Lihat Sedikit' : 'Lihat Selengkapnya'}
							</button>
						</div>
					{/if}
				</div>

				<div class="space-y-10 lg:col-span-1">
					<h2 class="text-[11px] font-bold tracking-widest text-text-muted uppercase">
						Recommended
					</h2>
					<div class="space-y-8">
						{#each relatedVideos.slice(0, 6) as v}
							<a href="/watch/{v.id}" class="group flex cursor-pointer gap-4">
								<div
									class="relative aspect-video w-36 flex-shrink-0 overflow-hidden rounded-xl bg-surface-1 shadow-lg shadow-black/20"
								>
									<img
										src={v.thumbnail}
										alt={v.title}
										class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
									/>
								</div>
								<div class="flex-1">
									<h4
										class="mb-2 line-clamp-2 text-sm leading-tight font-bold text-text-primary transition-colors group-hover:text-accent"
									>
										{v.title}
									</h4>
									<p class="text-[11px] font-medium text-text-secondary opacity-70">{v.channel}</p>
								</div>
							</a>
						{/each}
					</div>
				</div>
			</div>

			{#if relatedVideos.length > 6}
				<section class="mt-24 border-t border-surface-3/10 pt-16">
					<h2 class="mb-10 text-xl font-black tracking-tighter text-text-primary uppercase">
						More to explore
					</h2>
					<VideoGrid videos={relatedVideos.slice(6)} />
				</section>
			{/if}
		{/if}
	</div>
</div>
