<script lang="ts">
	interface Props {
		id?: string;
		name?: string;
		type?: string;
		placeholder?: string;
		value?: string;
		oninput?: (e: Event) => void;
		required?: boolean;
		class?: string;
	}

	let {
		id,
		name,
		type = 'text',
		placeholder,
		value = $bindable(),
		oninput,
		required = false,
		class: className = ''
	}: Props = $props();
</script>

<input
	{id}
	{name}
	{type}
	{placeholder}
	{required}
	bind:value
	{oninput}
	class="w-full cursor-text rounded-lg border border-surface-3 bg-surface-1 px-4 py-2.5 text-sm text-text-primary transition-all duration-200 outline-none placeholder:text-text-muted focus:border-accent/50 focus:bg-surface-2 {className}"
/>
