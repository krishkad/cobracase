import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

// Extend the NodeJS global type to include mongoose property
declare global {
    namespace NodeJS {
        interface Global {
            mongoose: MongooseConnection;
        }
    }
}

let globalMongoose = global as typeof global & { mongoose: MongooseConnection };

// Check if the mongoose connection is already cached in global
if (!globalMongoose.mongoose) {
    globalMongoose.mongoose = {
        conn: null,
        promise: null
    };
}

export const ConnectToDatabase = async (): Promise<Mongoose> => {
    if (globalMongoose.mongoose.conn) return globalMongoose.mongoose.conn;
    
    if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');
    
    globalMongoose.mongoose.promise = globalMongoose.mongoose.promise || mongoose.connect(MONGODB_URL, {
        dbName: "HotelBooking",
        bufferCommands: false
    });
    
    globalMongoose.mongoose.conn = await globalMongoose.mongoose.promise;
    
    return globalMongoose.mongoose.conn;
};
