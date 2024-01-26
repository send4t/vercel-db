import { MongoClient } from 'mongodb';

const url = process.env.MONGODB_URI;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

if (!db) {
  db = client.connect().then((client) => client.db('poems'));
}

export default async function handler(req, res) {
  const tag = req.query.tag;

  try {
    const database = await db;
    const poem = await database
      .collection("poe")
      .aggregate([
        { $match: { tags: tag } },
        { $sample: { size: 1 } }
      ])
      .toArray();

    if (poem.length === 0) {
      res.status(404).json({ error: "No poem found for the given tag" });
      return;
    }

    res.status(200).json(poem[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
