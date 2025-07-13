import { S3Client } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
	region: 'de-east-1',
	endpoint: 'https://s3.almoloo.com',
	credentials: {
		accessKeyId: process.env.S3_ACCESS_KEY!,
		secretAccessKey: process.env.S3_SECRET_KEY!,
	},
	forcePathStyle: true,
});

export { s3Client };
