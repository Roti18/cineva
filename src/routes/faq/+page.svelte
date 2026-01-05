<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';

	const faqs = [
		{
			q: 'What is Cineva?',
			a: 'Cineva is a lightweight streaming interface that aggregates high-quality public content from Dailymotion. We focus on a premium, minimal viewing experience without the clutter.'
		},
		{
			q: 'Is Cineva free?',
			a: "Absolutely. Cineva is completely free to use. We don't host any files ourselves; all video content is served directly from Dailymotion's servers."
		},
		{
			q: 'Where does the content come from?',
			a: 'Every video on Cineva is hosted by Dailymotion. We use their official Data API to help you discover content and their embedded player for streaming.'
		},
		{
			q: 'How do I search for videos?',
			a: "Use the search bar at the top of any page. It queries Dailymotion's real-time index to find exactly what you're looking for."
		},
		{
			q: 'Can I use it on my phone?',
			a: "Cineva is fully responsive and built with a mobile-first approach. You can even 'Add to Home Screen' for an app-like experience."
		},
		{
			q: 'How do I report an issue?',
			a: 'Head over to our Contact page if you encounter any technical glitches. For content-specific concerns, remember that the videos are hosted on Dailymotion.'
		}
	];
</script>

<svelte:head>
	<title>FAQ / Help Center</title>
</svelte:head>

<div class="py-16 md:py-24">
	<div class="container mx-auto max-w-4xl px-4 md:px-6">
		<header class="mb-16 text-center">
			<p class="mb-3 text-[11px] font-bold tracking-widest text-accent uppercase">Support</p>
			<h1 class="mb-4 text-4xl font-extrabold tracking-tighter text-text-primary md:text-5xl">
				FAQ
			</h1>
			<p class="text-lg text-text-secondary">Quick answers to common questions about Cineva.</p>
		</header>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			{#each faqs as faq}
				<Card
					class="border-transparent bg-surface-1/40 p-8 transition-colors hover:bg-surface-1/60"
				>
					<h3 class="mb-3 text-[15px] leading-snug font-bold text-text-primary">{faq.q}</h3>
					<p class="text-sm leading-relaxed text-text-secondary">{faq.a}</p>
				</Card>
			{/each}
		</div>

		<footer class="mt-20 text-center">
			<Card class="mx-auto max-w-2xl border-accent/10 bg-accent/5 p-10">
				<p class="mb-6 text-text-secondary italic">Still have a specific question in mind?</p>
				<a
					href="/contact"
					class="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-bold tracking-wide text-white shadow-xl shadow-accent/20 transition-all hover:scale-105 hover:bg-accent-hover active:scale-95"
				>
					Contact support
				</a>
			</Card>
		</footer>
	</div>
</div>
