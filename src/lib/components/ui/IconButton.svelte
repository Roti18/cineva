<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		onclick?: () => void;
		type?: 'button' | 'submit';
		class?: string;
		label: string;
	}

	let { children, onclick, type = 'button', class: className = '', label }: Props = $props();
</script>

<button
	{type}
	{onclick}
	class="flex cursor-pointer items-center justify-center rounded-full p-2 text-text-secondary transition-all duration-200 hover:bg-surface-2 hover:text-text-primary active:scale-95 {className}"
	aria-label={label}
>
	{@render children()}
</button>
