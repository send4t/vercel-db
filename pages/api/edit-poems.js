import { MongoClient, ObjectId } from 'mongodb';

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id,author,title, content,tag,tags} = req.body;

    try {
      await client.connect();
      const db = client.db("poems");
      const coll = db.collection("poe");

      const updatedPoem = {};

      // Only add the properties if they are defined
      if (author !== undefined) updatedRecipe.author = author;
      if (title !== undefined) updatedRecipe.title = title;
      if (content !== undefined) updatedRecipe.content = content;
      if (tag !== undefined) updatedRecipe.tag = tag;
      if (tags !== undefined) updatedRecipe.tags = tags;
      

      console.log("Updating recipe with ID:", id);
      console.log("Update details:", updatedRecipe);

      const result = await coll.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedPoem }
      );

      console.log("Update result:", result);

      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Poem updated successfully" });
      } else if (result.matchedCount === 1) {
        res.status(304).json({ message: "No modifications were made as data is identical." });
      } else {
        res.status(404).json({ message: "Poem not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
