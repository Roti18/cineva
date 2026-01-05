<script lang="ts">
	import { navigating } from '$app/state';

	let visible = $state(false);
	let timeout: number;

	$effect(() => {
		if (navigating.current) {
			// Show loader only if navigation takes more than 300ms (avoids flickering on fast loads)
			timeout = window.setTimeout(() => {
				visible = true;
			}, 300);
		} else {
			visible = false;
			if (timeout) clearTimeout(timeout);
		}
	});
</script>

{#if visible}
	<div
		class="animate-in fade-in fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg/90 backdrop-blur-md duration-500"
	>
		<div class="relative flex flex-col items-center gap-8">
			<!-- Pulsing Logo -->
			<div class="relative">
				<h1 class="animate-pulse text-5xl font-black tracking-tighter text-accent uppercase italic">
					CINEVA
				</h1>
				<!-- Glow underneath -->
				<div
					class="absolute inset-0 -z-10 scale-150 animate-pulse rounded-full bg-accent/20 blur-2xl"
				></div>
			</div>

			<!-- Minimal Progress Bar Container -->
			<div class="h-[2px] w-48 overflow-hidden rounded-full bg-surface-3">
				<div
					class="h-full bg-accent transition-all duration-1000 ease-out"
					style="width: 70%; animation: slide-progress 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;"
				></div>
			</div>

			<p class="text-[10px] font-bold tracking-[0.3em] text-text-muted uppercase opacity-40">
				Setting the stage
			</p>
		</div>
	</div>
{/if}

<style>
	@keyframes slide-progress {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(110%);
		}
	}
</style>
