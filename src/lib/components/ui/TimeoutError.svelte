<script lang="ts">
	import Button from './Button.svelte';

	let {
		status = 408,
		title = 'Sync Timeout',
		message = 'Network response stream exceeded the allocated duration.',
		actionLabel = 'Try Reboot',
		actionHref = '/'
	} = $props();
</script>

<div
	class="transition-theme fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-bg p-8 text-center select-none"
>
	<div class="absolute inset-0">
		<div
			class="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-accent/5 blur-[120px]"
		></div>
		<div
			class="absolute -right-[10%] -bottom-[10%] h-[40%] w-[40%] rounded-full bg-accent/5 blur-[120px]"
		></div>
	</div>

	<div class="relative z-10 space-y-12">
		<div class="space-y-4">
			<h1
				class="text-[clamp(5rem,20vw,12rem)] leading-none font-black tracking-tighter text-text-primary italic opacity-90 transition-all duration-700 hover:scale-105"
			>
				{status}
			</h1>
			<div class="mx-auto h-1 w-24 bg-accent/40 md:w-32"></div>
		</div>

		<div class="space-y-6">
			<div class="space-y-3">
				<h2
					class="text-xl font-black tracking-[0.3em] text-accent uppercase italic transition-colors md:text-3xl"
				>
					{title}
				</h2>
				<p
					class="mx-auto max-w-[280px] text-[10px] leading-relaxed font-bold tracking-[0.2em] text-text-secondary/60 uppercase md:max-w-md md:text-xs"
				>
					{message}
				</p>
			</div>

			<div class="pt-8">
				<Button
					variant="accent"
					size="lg"
					onclick={() => (window.location.href = actionHref)}
					class="min-w-[240px] border-accent/30 bg-accent/5 py-4 text-[10px] font-black tracking-[0.4em] uppercase transition-all duration-500 hover:scale-105 hover:bg-accent hover:text-white"
				>
					{actionLabel}
				</Button>
			</div>
		</div>
	</div>

	<div class="absolute top-12 left-12 hidden md:block">
		<span class="text-[10px] font-black tracking-[1em] text-text-muted/40 uppercase italic">
			Cineva / Connection Protocol {status}
		</span>
	</div>

	<div class="absolute right-12 bottom-12 hidden md:block">
		<span class="text-[10px] font-black tracking-[0.5em] text-text-muted/20 uppercase">
			Service Interrupted: Timeout Detected
		</span>
	</div>
</div>
