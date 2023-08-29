import { MongoClient } from 'mongodb';

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  const { name,duration, recipe, image,steps} = req.body; // Extract data from the request body

  try {
    await client.connect();
    const db = client.db('recipes');
    const coll = db.collection('rec');

    const newRecipe = {
      name: name,
      duration:duration,
      recipe: recipe,
      image:image,
      steps:steps
     
    };

    const result = await coll.insertOne(newRecipe); // Insert the new poem

    res.status(201).json({ insertedId: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  } finally {
    await client.close();
  }
}
