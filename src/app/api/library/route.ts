import { db } from '@/lib/services/db';
import { s3Client } from '@/lib/services/s3';
import { fetchYoutubeInfo } from '@/lib/utils';
import { type NextRequest, NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';

// GET LIBRARY ITEMS
export async function GET(request: NextRequest) {
	// 1. GET USER EMAIL FROM SESSION
	const temp_email = request.cookies.toString() ?? 'amousavig@icloud.com';
	// const userEmail = temp_email;

	// 2. GET USER ID
	const userId = '123';

	// 3. GET THE LIST OF ITEMS AND RETURN
	const collection = db.collection('items');
	const library = (
		await collection.find({ user_id: userId }).toArray()
	).toReversed();

	if (!library) {
		return NextResponse.json([]);
	}

	const formattedLibrary = library.map(
		(item) =>
			({
				id: item._id.toString(),
				title: item.title,
				thumbnail: item.thumbnail,
				duration: item.duration,
				url: item.url,
				created_at: item.created_at,
				youtube_id: item.youtube_id,
			} as VideoItem)
	);

	return NextResponse.json(formattedLibrary as Array<VideoItem>);
}

// ADD VIDEO TO LIBRARY
export async function POST(request: NextRequest) {
	const { youtubeURL } = await request.json();

	// 1. FETCH YOUTUBE INFO
	const videoInfo = fetchYoutubeInfo(youtubeURL);

	// 2. UPLOAD THUMBNAIL TO SERVER
	const uploadThumbnailCommand;
	// 3. UPLOAD AUDIO TO SERVER
	// 4. ADD ITEM TO DATABASE
}

// DELETE VIDEO FROM LIBRARY
export async function DELETE() {}
