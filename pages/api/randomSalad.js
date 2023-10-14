import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("recipes");

    const aggregationPipeline = [
      {
        $match: { isSalad: true }
      },
      { $sample: { size: 1 } }
    ];

    const recipes = await db
      .collection("rec")
      .aggregate(aggregationPipeline)
      .toArray();

    res.status(200).json(recipes);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}