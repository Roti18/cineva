<script lang="ts">
	import { formatDuration, formatViews, type VideoCardData } from '$lib/types';
	import Badge from '../ui/Badge.svelte';

	const { video }: { video: VideoCardData } = $props();
</script>

<a href="/watch/{video.id}" class="group block cursor-pointer">
	<div
		class="relative aspect-video overflow-hidden rounded-2xl bg-surface-1 shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:shadow-black/30"
	>
		<img
			src={video.thumbnail}
			alt={video.title}
			class="cubic-bezier(0.4, 0, 0.2, 1) h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
			loading="lazy"
		/>
		<div class="absolute right-3 bottom-3">
			<Badge class="bg-black/80 px-2 py-1 text-[10px]">{formatDuration(video.duration)}</Badge>
		</div>
		<div
			class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		></div>
	</div>
	<div class="mt-4 px-1">
		<h3
			class="line-clamp-2 text-[15px] leading-snug font-black tracking-tight text-text-primary transition-colors duration-200 group-hover:text-accent"
		>
			{video.title}
		</h3>
		<div class="mt-2 flex items-center gap-2 text-[12px] font-medium text-text-secondary">
			<span class="truncate transition-colors hover:text-text-primary">{video.channel}</span>
			<span class="text-text-muted opacity-40">•</span>
			<span class="whitespace-nowrap">{formatViews(video.views)} views</span>
		</div>
	</div>
</a>
