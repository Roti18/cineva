<script lang="ts">
	import { Github, Instagram, Facebook } from '@lucide/svelte';
	const currentYear = new Date().getFullYear();
</script>

<footer class="mt-auto bg-surface-0/30 py-20">
	<div class="container mx-auto px-6 md:px-12">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-4 lg:grid-cols-5">
			<div class="col-span-1 md:col-span-2 lg:col-span-3">
				<h2 class="mb-5 text-2xl font-black tracking-tighter text-accent uppercase italic">
					CINEVA
				</h2>
				<p class="max-w-sm text-[15px] leading-relaxed text-text-secondary opacity-60">
					Explore a vast collection of videos and trending content from around the world. Cineva is
					your cinematic discovery platform powered by the Dailymotion API.
				</p>

				<div class="mt-8 flex items-center gap-6">
					<a
						href="https://instagram.com/roti.enc"
						target="_blank"
						class="cursor-pointer text-text-secondary opacity-60 transition-all hover:scale-110 hover:text-accent hover:opacity-100"
						aria-label="Instagram"
					>
						<Instagram size={20} />
					</a>
					<a
						href="https://facebook.com/profile.php?id=61568527453041"
						target="_blank"
						class="cursor-pointer text-text-secondary opacity-60 transition-all hover:scale-110 hover:text-accent hover:opacity-100"
						aria-label="Facebook"
					>
						<Facebook size={20} />
					</a>
					<a
						href="https://github.com/Roti18"
						target="_blank"
						class="cursor-pointer text-text-secondary opacity-60 transition-all hover:scale-110 hover:text-accent hover:opacity-100"
						aria-label="Github"
					>
						<Github size={20} />
					</a>
				</div>
			</div>

			<div>
				<h3
					class="mb-6 text-[11px] font-bold tracking-[0.2em] text-text-primary uppercase opacity-40"
				>
					Product
				</h3>
				<ul class="space-y-4">
					<li>
						<a
							href="/"
							class="cursor-pointer text-sm text-text-secondary opacity-60 transition-colors hover:text-accent hover:opacity-100"
							>Browse</a
						>
					</li>
					<li>
						<a
							href="/faq"
							class="cursor-pointer text-sm text-text-secondary opacity-60 transition-colors hover:text-accent hover:opacity-100"
							>FAQ</a
						>
					</li>
					<li>
						<a
							href="/contact"
							class="cursor-pointer text-sm text-text-secondary opacity-60 transition-colors hover:text-accent hover:opacity-100"
							>Contact</a
						>
					</li>
				</ul>
			</div>

			<div>
				<h3
					class="mb-6 text-[11px] font-bold tracking-[0.2em] text-text-primary uppercase opacity-40"
				>
					Legal
				</h3>
				<ul class="space-y-4">
					<li>
						<a
							href="/terms"
							class="cursor-pointer text-sm text-text-secondary opacity-60 transition-colors hover:text-accent hover:opacity-100"
							>Terms</a
						>
					</li>
					<li>
						<a
							href="/privacy"
							class="cursor-pointer text-sm text-text-secondary opacity-60 transition-colors hover:text-accent hover:opacity-100"
							>Privacy</a
						>
					</li>
					<li>
						<a
							href="/copyright"
							class="cursor-pointer text-sm text-text-secondary opacity-60 transition-colors hover:text-accent hover:opacity-100"
							>Copyright</a
						>
					</li>
				</ul>
			</div>
		</div>

		<div
			class="mt-20 flex flex-col items-center justify-between gap-6 border-t border-surface-3/10 pt-10 md:flex-row"
		>
			<p
				class="text-[10px] font-medium tracking-[0.2em] text-text-secondary uppercase opacity-40 md:text-xs"
			>
				&copy; {currentYear} Cineva. All rights reserved.
			</p>
			<p
				class="text-[10px] font-medium tracking-[0.2em] text-text-secondary uppercase opacity-40 md:text-xs"
			>
				Powered by Dailymotion API
			</p>
		</div>
	</div>
</footer>
