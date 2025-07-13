import { Db, MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.DB_URI!;
const options = {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;
let db: Db;

if (process.env.NODE_ENV === 'development') {
	const globalWithMongo = global as typeof globalThis & {
		_mongoClient?: MongoClient;
	};

	if (!globalWithMongo._mongoClient) {
		globalWithMongo._mongoClient = new MongoClient(uri, options);
	}
	client = globalWithMongo._mongoClient;
	clientPromise = client.connect();
	db = client.db('earworm');
} else {
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
	db = client.db('earworm');
}

export { client, clientPromise, db };
