import "server-only";

import { MongoClient } from "mongodb";

declare global {
  var _northBridgeMongoClientPromise: Promise<MongoClient> | undefined;
}

export async function getMongoClient(): Promise<MongoClient> {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI is not configured.");

  if (!globalThis._northBridgeMongoClientPromise) {
    const client = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      waitQueueTimeoutMS: 5000,
    });

    const clientPromise = client.connect().catch((error: unknown) => {
      if (globalThis._northBridgeMongoClientPromise === clientPromise) {
        globalThis._northBridgeMongoClientPromise = undefined;
      }
      throw error;
    });

    globalThis._northBridgeMongoClientPromise = clientPromise;
  }

  return globalThis._northBridgeMongoClientPromise;
}
