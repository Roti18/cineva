<script lang="ts">
	import { ChevronDown } from '@lucide/svelte';
	import { clickOutside } from '$lib/actions/clickOutside';

	interface Option {
		value: string;
		label: string;
	}

	interface Props {
		name: string;
		value: string;
		options: Option[];
		placeholder?: string;
		class?: string;
	}

	let {
		name,
		value = $bindable(),
		options,
		placeholder = 'Select an option',
		class: className = ''
	}: Props = $props();
	let isOpen = $state(false);

	const selectedLabel = $derived(options.find((o) => o.value === value)?.label || placeholder);

	function selectOption(val: string) {
		value = val;
		isOpen = false;
	}
</script>

<div class="relative w-full {className}" use:clickOutside={() => (isOpen = false)}>
	<input type="hidden" {name} {value} />

	<button
		type="button"
		class="flex w-full cursor-pointer items-center justify-between rounded-xl border border-surface-3 bg-surface-1 px-5 py-3.5 text-sm text-text-primary transition-all duration-500 ease-out outline-none hover:border-accent/20 focus:border-accent/40 focus:bg-surface-2"
		onclick={() => (isOpen = !isOpen)}
	>
		<span class={!value ? 'text-text-muted' : ''}>{selectedLabel}</span>
		<ChevronDown
			size={18}
			class="cubic-bezier(0.23, 1, 0.32, 1) text-text-muted transition-transform duration-700 {isOpen
				? 'rotate-180 text-accent'
				: ''}"
		/>
	</button>

	{#if isOpen}
		<div
			class="animate-in fade-in slide-in-from-top-1 absolute top-full left-0 z-50 mt-2 w-full overflow-hidden rounded-2xl border border-surface-3 bg-surface-1 py-1.5 shadow-2xl shadow-black/40 duration-500 ease-out"
		>
			{#each options as option}
				<button
					type="button"
					class="flex w-full cursor-pointer items-center px-5 py-3 text-left text-sm transition-colors duration-300 {value ===
					option.value
						? 'bg-accent/5 font-bold text-accent'
						: 'text-text-primary hover:bg-surface-0'}"
					onclick={() => selectOption(option.value)}
				>
					{option.label}
				</button>
			{/each}
		</div>
	{/if}
</div>
