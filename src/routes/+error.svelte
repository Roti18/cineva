<script lang="ts">
	import { page } from '$app/state';
	import Button from '$lib/components/ui/Button.svelte';
	import { onMount, onDestroy } from 'svelte';

	const error = $derived(page.error);
	const status = $derived(page.status);

	let message = $derived(
		status === 404
			? 'Halaman ini hilang di telan bumi, Bang. Coba cek URL-nya lagi ya!'
			: error?.message?.includes('TIMEOUT') || error?.message?.includes('fetch')
				? 'Koneksi internet Abang lagi bermasalah atau lemot banget nih.'
				: error?.message || 'Ada error teknis ghaib di server kita.'
	);

	onMount(() => {
		document.body.style.overflow = 'hidden';
	});

	onDestroy(() => {
		document.body.style.overflow = '';
	});
</script>

<svelte:head>
	<title>{status} Error | Cineva</title>
</svelte:head>

<div class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg p-8 text-center">
	<div class="animate-in fade-in zoom-in relative max-w-lg space-y-2 duration-1000 ease-out">
		<div class="absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none">
			<h1
				class="text-[180px] leading-none font-black tracking-tighter text-accent/[0.03] md:text-[280px]"
			>
				{status}
			</h1>
		</div>

		<div class="space-y-6">
			<div class="space-y-2">
				<h2
					class="text-3xl font-black tracking-tight text-text-primary uppercase italic md:text-5xl"
				>
					{status === 404 ? 'Lost in space' : 'System Failure'}
				</h2>
				<p class="text-lg leading-relaxed font-medium text-text-secondary opacity-40">
					{message}
				</p>
			</div>

			<div class="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row">
				<Button
					variant="accent"
					size="lg"
					onclick={() => (window.location.href = '/')}
					class="w-full px-12 py-4 font-black tracking-[0.2em] uppercase italic transition-all duration-700 hover:scale-105 sm:w-auto"
				>
					Back Home
				</Button>
				<Button
					variant="surface"
					size="lg"
					onclick={() => window.location.reload()}
					class="w-full px-12 py-4 font-black tracking-[0.2em] uppercase transition-all duration-700 hover:bg-surface-2 sm:w-auto"
				>
					Retry
				</Button>
			</div>
		</div>
	</div>

	<div
		class="absolute top-1/2 left-1/2 -z-20 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.02] blur-[150px]"
	></div>
</div>
