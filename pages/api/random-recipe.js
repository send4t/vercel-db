import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("recipes");

    const randomRecipe = await db.collection("rec").aggregate([{ $sample: { size: 1 } }]).toArray();

    res.status(200).json(randomRecipe);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}