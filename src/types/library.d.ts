interface VideoItem {
	id: string;
	title: string;
	duration: number; // seconds
	created_at: string;
	thumbnail: string;
	url: string;
	youtube_id: string;
}

interface VideoItemUpload {
	title: string;
	created_at: string;
	thumbnail: string;
	url: string;
}
