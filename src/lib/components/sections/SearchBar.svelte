<script lang="ts">
	import { goto } from '$app/navigation';
	import { Search, X } from '@lucide/svelte';

	let query = $state('');
	let debounceTimer: ReturnType<typeof setTimeout>;

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		query = target.value;

		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			if (query.trim()) {
				goto(`/search?q=${encodeURIComponent(query.trim())}`, {
					replaceState: true,
					noScroll: true
				});
			}
		}, 400);
	}

	function handleSubmit(event: Event) {
		event.preventDefault();
		clearTimeout(debounceTimer);
		if (query.trim()) {
			goto(`/search?q=${encodeURIComponent(query.trim())}`);
		}
	}

	function clearSearch() {
		query = '';
		goto('/', { replaceState: true });
	}
</script>

<form class="group relative w-full" onsubmit={handleSubmit}>
	<div
		class="absolute top-1/2 left-4 -translate-y-1/2 text-text-muted transition-colors group-focus-within:text-accent"
	>
		<Search size={18} strokeWidth={2.5} />
	</div>

	<input
		type="search"
		placeholder="Search for movies, genres, or creators..."
		bind:value={query}
		oninput={handleInput}
		class="w-full cursor-text rounded-full border border-surface-3 bg-surface-1/40 py-3 pr-12 pl-12 text-sm text-text-primary transition-all duration-300 outline-none placeholder:text-text-muted/60 focus:border-accent/40 focus:bg-surface-2/80 focus:ring-8 focus:ring-accent/5"
	/>

	{#if query}
		<button
			type="button"
			onclick={clearSearch}
			class="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-full p-1.5 text-text-muted transition-colors hover:bg-surface-3 hover:text-text-primary"
			aria-label="Clear search"
		>
			<X size={16} strokeWidth={2.5} />
		</button>
	{/if}
</form>
