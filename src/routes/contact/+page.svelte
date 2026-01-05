<script lang="ts">
	import { Check, Mail, Instagram, Loader2, AlertCircle } from '@lucide/svelte';
	import { enhance } from '$app/forms';
	import { PUBLIC_CONTACT_EMAIL } from '$env/static/public';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Select from '$lib/components/ui/Select.svelte';

	let { form } = $props();
	let loading = $state(false);
	let submitted = $derived(form?.success);

	let topic = $state('General Support');

	$effect(() => {
		if (form?.topic) {
			topic = form.topic;
		}
	});

	const topicOptions = [
		{ value: 'General Support', label: 'General Support' },
		{ value: 'Bug Report', label: 'Bug Report' },
		{ value: 'Feedback', label: 'Feedback' },
		{ value: 'Content Removal', label: 'Content Removal' }
	];
</script>

<svelte:head>
	<title>Reach out / Contact Cineva</title>
</svelte:head>

<div class="py-16 md:py-24">
	<div class="container mx-auto max-w-3xl px-6">
		<header class="mb-16 text-center">
			<p class="mb-3 text-[11px] font-bold tracking-widest text-accent uppercase">Contact</p>
			<h1 class="mb-4 text-4xl font-extrabold tracking-tighter text-text-primary md:text-5xl">
				Let's talk.
			</h1>
			<p class="text-lg font-medium text-text-secondary opacity-60">
				Have feedback or questions? We'd love to hear from you.
			</p>
		</header>

		{#if form?.error && !form?.errors}
			<div
				class="animate-in fade-in mb-8 flex items-center gap-4 rounded-2xl border border-accent/10 bg-accent/5 p-6 text-accent duration-700"
			>
				<AlertCircle size={20} />
				<div class="flex-1">
					<p class="text-sm font-bold opacity-90">
						{form.message || 'Something went wrong. Please try again.'}
					</p>
				</div>
			</div>
		{/if}

		{#if submitted}
			<Card
				class="animate-in fade-in zoom-in flex flex-col items-center border-accent/10 bg-accent/5 p-12 text-center duration-1000"
			>
				<div
					class="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white shadow-xl shadow-accent/20"
				>
					<Check size={32} />
				</div>
				<h2 class="mb-3 text-2xl font-bold text-text-primary">Message Sent!</h2>
				<p class="mx-auto mb-8 max-w-sm leading-relaxed text-text-secondary opacity-80">
					Thanks for reaching out! Your message was delivered automatically to my inbox. I'll get
					back to you soon.
				</p>
				<a
					href="/contact"
					class="text-xs font-black tracking-widest text-accent uppercase transition-colors duration-500 hover:text-accent-hover"
					>Send another message</a
				>
			</Card>
		{:else}
			<form
				method="POST"
				use:enhance={() => {
					loading = true;
					return async ({ update }) => {
						await update();
						loading = false;
					};
				}}
				class="space-y-10"
				novalidate
			>
				<div class="grid grid-cols-1 gap-10 md:grid-cols-2">
					<div class="space-y-3">
						<label
							for="name"
							class="px-1 text-[11px] font-bold tracking-[0.15em] text-text-muted uppercase"
							>Name</label
						>
						<Input
							id="name"
							name="name"
							placeholder="Your Name"
							value={form?.name ?? ''}
							class="transition-all duration-500 {form?.errors?.name
								? 'border-accent/30 bg-accent/[0.02]'
								: ''}"
						/>
						{#if form?.errors?.name}
							<p
								class="animate-in fade-in px-1 text-[10px] font-bold tracking-wider text-accent uppercase italic duration-500"
							>
								{form.errors.name}
							</p>
						{/if}
					</div>
					<div class="space-y-3">
						<label
							for="email"
							class="px-1 text-[11px] font-bold tracking-[0.15em] text-text-muted uppercase"
							>Email</label
						>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="email@example.com"
							value={form?.email ?? ''}
							class="transition-all duration-500 {form?.errors?.email
								? 'border-accent/30 bg-accent/[0.02]'
								: ''}"
						/>
						{#if form?.errors?.email}
							<p
								class="animate-in fade-in px-1 text-[10px] font-bold tracking-wider text-accent uppercase italic duration-500"
							>
								{form.errors.email}
							</p>
						{/if}
					</div>
				</div>

				<div class="space-y-3">
					<label
						for="topic"
						class="px-1 text-[11px] font-bold tracking-[0.15em] text-text-muted uppercase"
						>Topic</label
					>
					<Select name="topic" options={topicOptions} bind:value={topic} />
				</div>

				<div class="space-y-3">
					<label
						for="message"
						class="px-1 text-[11px] font-bold tracking-[0.15em] text-text-muted uppercase"
						>Message</label
					>
					<textarea
						id="message"
						name="message"
						rows="6"
						placeholder="What's on your mind?"
						class="w-full resize-none rounded-2xl border border-surface-3 bg-surface-1 px-5 py-4 text-sm text-text-primary transition-all duration-500 outline-none placeholder:text-text-muted focus:border-accent/30 focus:bg-surface-2 {form
							?.errors?.message
							? 'border-accent/30 bg-accent/[0.02]'
							: ''}">{form?.message ?? ''}</textarea
					>
					{#if form?.errors?.message}
						<p
							class="animate-in fade-in px-1 text-[10px] font-bold tracking-wider text-accent uppercase italic duration-500"
						>
							{form.errors.message}
						</p>
					{/if}
				</div>

				<Button
					type="submit"
					variant="accent"
					size="lg"
					class="w-full py-4 text-[13px] font-black tracking-[0.2em] uppercase transition-all duration-700 ease-out active:scale-[0.98]"
					disabled={loading}
				>
					{#if loading}
						<Loader2 class="mr-3 animate-spin" size={18} /> Sending...
					{:else}
						Send Message
					{/if}
				</Button>
			</form>
		{/if}

		<div class="mt-20 grid grid-cols-1 gap-6 md:grid-cols-2">
			<a href="mailto:{PUBLIC_CONTACT_EMAIL}" class="group block">
				<Card
					class="flex items-center gap-6 border-transparent bg-surface-1/30 p-8 transition-colors duration-700 hover:bg-surface-2"
				>
					<div
						class="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-3 text-accent transition-all duration-700 group-hover:bg-accent group-hover:text-white"
					>
						<Mail size={22} />
					</div>
					<div>
						<p class="mb-1 text-[10px] font-bold tracking-[0.2em] text-text-muted uppercase">
							Email
						</p>
						<p class="text-[14px] font-bold tracking-tight text-text-primary">
							{PUBLIC_CONTACT_EMAIL}
						</p>
					</div>
				</Card>
			</a>
			<a href="https://instagram.com/roti.enc" target="_blank" class="group block">
				<Card
					class="flex items-center gap-6 border-transparent bg-surface-1/30 p-8 transition-colors duration-700 hover:bg-surface-2"
				>
					<div
						class="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-3 text-accent transition-all duration-700 group-hover:bg-accent group-hover:text-white"
					>
						<Instagram size={22} />
					</div>
					<div>
						<p class="mb-1 text-[10px] font-bold tracking-[0.2em] text-text-muted uppercase">
							Social
						</p>
						<p class="text-[14px] font-bold tracking-tight text-text-primary">@roti.enc</p>
					</div>
				</Card>
			</a>
		</div>
	</div>
</div>
