import { MongoClient } from 'mongodb';

const url = process.env.MONGODB_URI
const client = new MongoClient(url);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  try {
    await client.connect();
    const db = client.db('poems');
    const coll = db.collection('poe');

    const docs = [
      { author: 'Petofi Sandor', title: 'Anyam Tyukja', content: 'hol van az alja' },
      { author: 'Petofi Sandor', title: 'Anyam Tyukja', content: 'hol van az alja' },
      { author: 'Petofi Sandor', title: 'Anyam Tyukja', content: 'hol van az alja' }
    ];

    const result = await coll.insertMany(docs);

    res.status(201).json({ insertedIds: result.insertedIds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  } finally {
    await client.close();
  }
}
