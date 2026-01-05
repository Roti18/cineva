<script lang="ts">
	import '../routes/layout.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import PageLoader from '$lib/components/ui/PageLoader.svelte';
	import { page } from '$app/state';
	import { onMount, setContext } from 'svelte';
	import { WifiOff } from '@lucide/svelte';

	let { children } = $props();
	let isDark = $state(true);
	let isOffline = $state(false);

	onMount(() => {
		const savedTheme = localStorage.getItem('theme') || 'dark';
		isDark = savedTheme === 'dark';
		document.documentElement.setAttribute('data-theme', savedTheme);

		isOffline = !navigator.onLine;
		const handleOnline = () => (isOffline = false);
		const handleOffline = () => (isOffline = true);

		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
	});

	function toggleTheme() {
		isDark = !isDark;
		const newTheme = isDark ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', newTheme);
		localStorage.setItem('theme', newTheme);
	}

	setContext('theme', {
		get isDark() {
			return isDark;
		},
		toggleTheme
	});
</script>

<svelte:head>
	<title>Cineva / Explore Trending Videos</title>
	<meta
		name="description"
		content="Explore a vast collection of trending videos and cinematic content powered by Dailymotion."
	/>
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
</svelte:head>

{#if isOffline}
	<div
		class="animate-in slide-in-from-top fixed top-0 left-0 z-[300] flex w-full items-center justify-center gap-2 bg-accent py-2 text-[11px] font-black tracking-widest text-white uppercase italic duration-500"
	>
		<WifiOff size={14} />
		No Internet Connection
	</div>
{/if}

{#if page.status >= 400}
	{@render children()}
{:else}
	<div
		class="flex min-h-screen flex-col bg-bg text-text-primary selection:bg-accent/20 selection:text-accent"
	>
		<Header />
		<main class="transition-theme flex-1">
			{@render children()}
		</main>
		<Footer />
	</div>
{/if}
