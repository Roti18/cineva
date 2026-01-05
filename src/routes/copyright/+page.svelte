<script lang="ts">
	import { ExternalLink } from '@lucide/svelte';
	import { PUBLIC_CONTACT_EMAIL } from '$env/static/public';
</script>

<svelte:head>
	<title>Copyright / Cineva</title>
</svelte:head>

<div class="py-16 md:py-24">
	<div class="container mx-auto max-w-3xl px-4 md:px-6">
		<header class="mb-16">
			<p class="mb-3 text-[11px] font-bold tracking-widest text-accent uppercase">Legal</p>
			<h1 class="mb-2 text-4xl font-extrabold tracking-tighter text-text-primary">
				Copyright & DMCA
			</h1>
			<p class="text-xs leading-relaxed text-text-muted">
				Protecting creators and intellectual property.
			</p>
		</header>

		<div class="space-y-12">
			<section>
				<h2 class="mb-5 text-lg font-bold text-text-primary">1. Attribution</h2>
				<p class="text-[15px] leading-loose text-text-secondary">
					Cineva acts as an interface for content hosted on Dailymotion. We do not claim rights to
					any videos, thumbnails, or metadata displayed here. Everything is property of its
					respective creators.
				</p>
			</section>

			<section>
				<h2 class="mb-5 text-lg font-bold text-text-primary">2. Reporting Infringement</h2>
				<p class="mb-6 text-[15px] leading-loose text-text-secondary">
					Because we don't host the content, we cannot delete the source files. If you find
					infringing content, the fastest way to handle it is via Dailymotion's reporting center.
				</p>
				<a
					href="https://www.dailymotion.com/legal/copyright"
					target="_blank"
					class="inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline"
				>
					Dailymotion Copyright Center <ExternalLink size={14} />
				</a>
			</section>

			<section>
				<h2 class="mb-5 text-lg font-bold text-text-primary">3. Our Stance</h2>
				<p class="text-[15px] leading-loose text-text-secondary">
					Cineva strictly follows the DMCA. If we receive a valid notice regarding content
					confirmation, we will disable its visibility on our interface. Contact us at <span
						class="font-bold text-text-primary underline decoration-accent/30"
						>{PUBLIC_CONTACT_EMAIL}</span
					>.
				</p>
			</section>
		</div>
	</div>
</div>
