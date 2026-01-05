<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		class?: string;
		variant?: 'dark' | 'accent' | 'surface';
	}

	let { children, class: className = '', variant = 'dark' }: Props = $props();

	const variants = {
		dark: 'bg-black/70 text-white',
		accent: 'bg-accent/20 text-accent border border-accent/20',
		surface: 'bg-surface-2 text-text-primary border border-surface-3'
	};
</script>

<span
	class="inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold tracking-[0.1em] uppercase backdrop-blur-md transition-colors {variants[
		variant
	]} {className}"
>
	{@render children()}
</span>
