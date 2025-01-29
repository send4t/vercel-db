import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const { q } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db("recipes");

    const recipes = await db
      .collection("rec")
      .find({
        $or: [
          { name: { $regex: q, $options: "i" } },
          { recipe: { $regex: q, $options: "i" } },
          { steps: { $regex: q, $options: "i" } },
        ],
      })
      .toArray();

    res.status(200).json(recipes);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}