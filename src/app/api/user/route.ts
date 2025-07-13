import { db } from '@/lib/services/db';
import { createFeedUrl } from '@/lib/utils';
import { NextResponse, type NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: NextRequest) {
	// 1. GET USER EMAIL FROM SESSION
	const temp_email = request.cookies.toString() ?? 'amousavig@icloud.com';
	const userEmail = temp_email;
	// 2. CHECK AND RETURN IF USER EXISTS
	const collection = await db.collection('users');
	const user = await collection.findOne({ email: userEmail });

	if (user) {
		return NextResponse.json({
			id: user._id.toString(),
			email: user.email,
			url: createFeedUrl(user.feed_id),
		} as User);
	} else {
		// 3. CREATE USER AND RETURN INFO
		const uuid = uuidv4();
		const newUser = await collection.insertOne({
			email: userEmail,
			feed_id: uuid,
		});
		return NextResponse.json({
			id: newUser.insertedId.toString(),
			email: userEmail,
			url: createFeedUrl(uuid),
		} as User);
	}
}
