import type { DailymotionSearchResponse, DailymotionVideo } from '$lib/types';

const API_BASE = 'https://api.dailymotion.com';
const DEFAULT_FIELDS = 'id,title,description,thumbnail_480_url,duration,views_total,owner.screenname';
const FETCH_TIMEOUT = 10000;

async function fetchWithTimeout(url: string, options: RequestInit = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

    try {
        if (options.signal) {
            if (options.signal.aborted) {
                controller.abort();
            } else {
                options.signal.addEventListener('abort', () => controller.abort());
            }
        }

        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error: any) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            if (controller.signal.aborted) {
                throw new Error('408: Request Timeout');
            }
        }
        throw error;
    }
}

export async function searchVideos(
    query: string,
    limit: number = 50,
    page: number = 1,
    signal?: AbortSignal
): Promise<DailymotionVideo[]> {
    const params = new URLSearchParams({
        search: query,
        limit: limit.toString(),
        page: page.toString(),
        fields: DEFAULT_FIELDS,
        sort: 'visited',
        family_filter: 'true'
    });

    const response = await fetchWithTimeout(`${API_BASE}/videos?${params}`, { signal });

    if (!response.ok) {
        throw new Error(`Failed to search videos: ${response.statusText}`);
    }

    const data: DailymotionSearchResponse = await response.json();
    return data.list;
}

export async function getTrendingVideos(
    limit: number = 50,
    page: number = 1
): Promise<DailymotionVideo[]> {
    const params = new URLSearchParams({
        sort: 'trending',
        limit: limit.toString(),
        page: page.toString(),
        fields: DEFAULT_FIELDS,
        family_filter: 'true'
    });

    const response = await fetchWithTimeout(`${API_BASE}/videos?${params}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch trending videos: ${response.statusText}`);
    }

    const data: DailymotionSearchResponse = await response.json();
    return data.list;
}

export async function getVideoById(id: string): Promise<DailymotionVideo | null> {
    const params = new URLSearchParams({
        fields: DEFAULT_FIELDS
    });

    const response = await fetchWithTimeout(`${API_BASE}/video/${id}?${params}`);

    if (!response.ok) {
        if (response.status === 404) {
            return null;
        }
        throw new Error(`Failed to fetch video: ${response.statusText}`);
    }

    return await response.json();
}

export function getEmbedUrl(videoId: string): string {
    return `https://www.dailymotion.com/embed/video/${videoId}?autoplay=0&ui-logo=0&ui-start-screen-info=0&fullscreen-enable=1`;
}
