<script lang="ts">
	import Button from './Button.svelte';

	let {
		status = 500,
		title = '',
		message = '',
		showAction = true,
		actionLabel = 'Go Back',
		actionHref = '/'
	} = $props();

	const defaultTitles: Record<number, string> = {
		401: 'Unauthorized',
		403: 'Forbidden',
		404: 'Not Found',
		500: 'Server Error'
	};

	const defaultMessages: Record<number, string> = {
		401: 'Authentication is required to access this page.',
		403: 'You lack the necessary permissions for this resource.',
		404: 'The requested path does not exist in our records.',
		500: 'An internal exception has occurred on our servers.'
	};

	const displayTitle = $derived(title || defaultTitles[status] || 'Unknown');
	const displayMessage = $derived(message || defaultMessages[status] || 'Critical system failure.');
</script>

<div class="fixed inset-0 z-[999] flex items-center justify-center bg-bg p-6 md:p-12">
	<div class="relative flex items-center gap-6 md:gap-16">
		<div class="hidden shrink-0 items-center justify-center md:flex">
			<span
				class="rotate-180 text-[10px] font-black tracking-[1.5em] text-accent uppercase italic opacity-40 [writing-mode:vertical-lr]"
			>
				CRITICAL SYSTEM NOTIFICATION
			</span>
		</div>

		<div class="flex flex-col items-start gap-4 md:gap-8">
			<div class="relative">
				<h1
					class="text-[140px] leading-[0.75] font-black tracking-tighter text-text-primary italic md:text-[280px]"
				>
					{status}
				</h1>
				<div class="absolute -bottom-2 left-1 h-1.5 w-20 bg-accent md:-bottom-4 md:w-40"></div>
			</div>

			<div class="max-w-lg space-y-6 md:space-y-8">
				<div class="space-y-2">
					<h2
						class="text-xl font-black tracking-[0.2em] text-accent/30 uppercase italic md:text-2xl"
					>
						{displayTitle}
					</h2>
					<p
						class="max-w-xs text-[10px] leading-relaxed font-bold tracking-[0.2em] text-text-secondary/10 uppercase"
					>
						{displayMessage}
					</p>
				</div>

				{#if showAction}
					<div class="pt-2">
						<Button
							variant="ghost"
							size="md"
							onclick={() => (window.location.href = actionHref)}
							class="min-w-[200px] border border-surface-3 bg-transparent px-10 py-5 text-[10px] font-black tracking-[0.4em] text-text-secondary uppercase transition-all duration-300 hover:border-accent hover:text-accent"
						>
							{actionLabel}
						</Button>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<div
		class="pointer-events-none absolute top-10 right-10 h-32 w-32 border-t border-r border-text-muted/10"
	></div>
	<div
		class="pointer-events-none absolute bottom-10 left-10 h-32 w-32 border-b border-l border-text-muted/10"
	></div>
</div>
