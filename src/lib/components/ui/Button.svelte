<script lang="ts">
	import type { Snippet } from 'svelte';

	type VariantName = 'ghost' | 'outline' | 'surface' | 'accent';
	type SizeName = 'sm' | 'md' | 'lg';

	interface Props {
		children: Snippet;
		onclick?: () => void;
		type?: 'button' | 'submit' | 'reset';
		variant?: VariantName;
		size?: SizeName;
		class?: string;
		disabled?: boolean;
	}

	let {
		children,
		onclick,
		type = 'button',
		variant = 'surface',
		size = 'md',
		class: className = '',
		disabled = false
	}: Props = $props();

	const variants: Record<VariantName, string> = {
		ghost: 'hover:bg-surface-1 text-text-secondary hover:text-text-primary',
		outline:
			'border border-surface-3 hover:border-text-secondary text-text-secondary hover:text-text-primary',
		surface: 'bg-surface-1 border border-surface-3 hover:bg-surface-2 text-text-primary',
		accent: 'bg-accent/10 text-accent hover:bg-accent/20 border border-accent/20'
	};

	const sizes: Record<SizeName, string> = {
		sm: 'px-3 py-1.5 text-xs',
		md: 'px-5 py-2.5 text-sm',
		lg: 'px-8 py-3.5 text-base'
	};
</script>

<button
	{type}
	{onclick}
	{disabled}
	class="inline-flex cursor-pointer items-center justify-center rounded-lg font-medium transition-all duration-200 active:scale-98 disabled:pointer-events-none disabled:opacity-50 {variants[
		variant
	]} {sizes[size]} {className}"
>
	{@render children()}
</button>
