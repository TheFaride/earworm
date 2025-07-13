declare module 'ruhend-scraper' {
	export function ytmp3(url: string): {
		title: string;
		audio: string;
		author: string;
		description: string;
		duration;
		views;
		upload;
		thumbnail: string;
	};
}
