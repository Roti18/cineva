<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		class?: string;
		hover?: boolean;
	}

	let { children, class: className = '', hover = false }: Props = $props();
</script>

<div
	class="overflow-hidden rounded-xl border border-surface-3 bg-surface-1 {hover
		? 'transition-all duration-300 hover:translate-y-[-2px] hover:border-text-muted hover:shadow-lg hover:shadow-black/20'
		: ''} {className}"
>
	{@render children()}
</div>
