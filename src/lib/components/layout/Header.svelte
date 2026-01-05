<script lang="ts">
	import SearchBar from '$lib/components/sections/SearchBar.svelte';
	import IconButton from '../ui/IconButton.svelte';
	import { getContext } from 'svelte';
	import { Moon, Sun, Search, X } from '@lucide/svelte';

	const { minimal = false }: { minimal?: boolean } = $props();
	const theme: any = getContext('theme');
	let isMobileSearchOpen = $state(false);
</script>

<header
	class="sticky top-0 z-50 w-full border-b border-surface-3 bg-bg/80 backdrop-blur-xl transition-all duration-500"
>
	<div class="container mx-auto flex h-18 items-center justify-between gap-4 px-6 md:px-12">
		{#if isMobileSearchOpen}
			<div
				class="animate-in fade-in slide-in-from-right-4 flex flex-1 items-center gap-4 duration-500"
			>
				<SearchBar />
				<IconButton label="Close Search" onclick={() => (isMobileSearchOpen = false)}>
					<X size={20} strokeWidth={2.5} />
				</IconButton>
			</div>
		{:else}
			<div class="flex items-center gap-6">
				<a
					href="/"
					class="group flex cursor-pointer items-center transition-transform hover:scale-105 active:scale-95"
				>
					<span class="text-xl font-black tracking-tighter text-accent uppercase italic"
						>CINEVA</span
					>
				</a>
			</div>

			{#if !minimal}
				<div class="hidden max-w-lg flex-1 md:block">
					<SearchBar />
				</div>

				<div class="flex items-center gap-1 md:gap-2">
					<div class="md:hidden">
						<IconButton label="Open Search" onclick={() => (isMobileSearchOpen = true)}>
							<Search size={18} strokeWidth={2.5} />
						</IconButton>
					</div>

					<IconButton label="Toggle Theme" onclick={() => theme.toggleTheme()}>
						{#if theme.isDark}
							<Moon size={18} strokeWidth={2.5} />
						{:else}
							<Sun size={18} strokeWidth={2.5} />
						{/if}
					</IconButton>
				</div>
			{/if}
		{/if}
	</div>
</header>
