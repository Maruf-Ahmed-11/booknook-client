// scripts/clear-demo-books.mjs
// Run this script from your terminal: node scripts/clear-demo-books.mjs

import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error("❌ MONGODB_URI not found in .env file.");
    process.exit(1);
}

async function cleanDatabase() {
    const client = new MongoClient(uri);

    try {
        console.log("Connecting to MongoDB Atlas...");
        await client.connect();
        const db = client.db("booknook");

        const booksCollection = db.collection("books");
        const borrowsCollection = db.collection("borrows");

        // 1. Check existing books
        const count = await booksCollection.countDocuments();
        console.log(`Found ${count} book(s) in the 'books' collection.`);

        if (count === 0) {
            console.log("The library is already clean and empty!");
            return;
        }

        // 2. Remove all test books
        const deleteBooksResult = await booksCollection.deleteMany({});
        console.log(`✅ Successfully deleted ${deleteBooksResult.deletedCount} demo book(s) from 'books'.`);

        // 3. Remove all test borrow records to keep data clean
        const deleteBorrowsResult = await borrowsCollection.deleteMany({});
        console.log(`✅ Successfully deleted ${deleteBorrowsResult.deletedCount} test borrow record(s) from 'borrows'.`);

        console.log("\n🎉 Fresh start complete! User accounts and authentication sessions are 100% preserved.");
    } catch (err) {
        console.error("❌ Error while cleaning database:", err);
    } finally {
        await client.close();
        console.log("Disconnected from MongoDB.");
    }
}

cleanDatabase();

