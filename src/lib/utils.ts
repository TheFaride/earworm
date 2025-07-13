import { ytmp3 } from 'ruhend-scraper';

export function createFeedUrl(feedId: string) {
	return `${process.env.NEXT_PUBLIC_URL}/feed/${feedId}`;
}

export async function fetchYoutubeInfo(url: string) {
	const { title, audio, duration, thumbnail } = await ytmp3(url);

	return {
		audio,
		title,
		duration,
		thumbnail,
	};
}
