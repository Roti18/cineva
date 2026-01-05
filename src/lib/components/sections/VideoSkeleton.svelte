<script lang="ts">
	import Skeleton from '../ui/Skeleton.svelte';

	const { count = 10 }: { count?: number } = $props();
</script>

<div class="grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
	{#each Array(count) as _, i (i)}
		<div class="space-y-4">
			<Skeleton class="aspect-video rounded-xl" />
			<div class="space-y-2 px-1">
				<Skeleton class="h-4 w-11/12" />
				<Skeleton class="h-3 w-2/3" />
			</div>
		</div>
	{/each}
</div>
