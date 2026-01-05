export interface DailymotionVideo {
	id: string;
	title: string;
	description: string;
	thumbnail_480_url: string;
	duration: number;
	views_total: number;
	'owner.screenname': string;
}

export interface DailymotionSearchResponse {
	page: number;
	limit: number;
	explicit: boolean;
	total: number;
	has_more: boolean;
	list: DailymotionVideo[];
}

export interface VideoCardData {
	id: string;
	title: string;
	thumbnail: string;
	duration: number;
	views: number;
	channel: string;
}

export function mapToVideoCard(video: DailymotionVideo): VideoCardData {
	return {
		id: video.id,
		title: video.title,
		thumbnail: video.thumbnail_480_url,
		duration: video.duration,
		views: video.views_total,
		channel: video['owner.screenname']
	};
}

export function formatDuration(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;

	if (hours > 0) {
		return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	}
	return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export function formatViews(views: number): string {
	if (views >= 1_000_000) {
		return `${(views / 1_000_000).toFixed(1)}M views`;
	}
	if (views >= 1_000) {
		return `${(views / 1_000).toFixed(1)}K views`;
	}
	return `${views} views`;
}
