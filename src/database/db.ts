import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

// Create a variable to hold the cached connection
const cached: MongooseConnection = {
    conn: null,
    promise: null,
};

export const ConnectToDatabase = async (): Promise<Mongoose> => {
    if (cached.conn) return cached.conn;

    if (!MONGODB_URL) throw new Error("Missing MONGODB_URL");

    // Create a new connection promise if it doesn't exist
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URL, {
            dbName: "Cobracase", // Change this to your actual database name
            bufferCommands: false,
            // No need for useNewUrlParser and useUnifiedTopology
        });
    }

    // Wait for the promise to resolve
    cached.conn = await cached.promise;
    return cached.conn;
};