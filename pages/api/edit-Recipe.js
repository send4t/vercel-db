import { MongoClient, ObjectId } from 'mongodb';

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id, name, recipe, prepTime, totalTime, image, steps, isSalad } = req.body;

    try {
      await client.connect();
      const db = client.db("recipes");
      const coll = db.collection("rec");

      const updatedRecipe = {};

      // Only add the properties if they are defined
      if (image !== undefined) updatedRecipe.image = image;
      if (steps !== undefined) updatedRecipe.steps = steps;
      if (isSalad !== undefined) updatedRecipe.isSalad = isSalad;
      if (name !== undefined) updatedRecipe.name = name;
      if (recipe !== undefined) updatedRecipe.recipe = recipe;
      if (prepTime !== undefined) updatedRecipe.prepTime = prepTime;
      if (totalTime !== undefined) updatedRecipe.totalTime = totalTime;

      console.log("Updating recipe with ID:", id);
      console.log("Update details:", updatedRecipe);

      const result = await coll.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedRecipe }
      );

      console.log("Update result:", result);

      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Recipe updated successfully" });
      } else if (result.matchedCount === 1) {
        res.status(304).json({ message: "No modifications were made as data is identical." });
      } else {
        res.status(404).json({ message: "Recipe not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
