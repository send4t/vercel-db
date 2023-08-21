import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
   try {
       const client = await clientPromise;
       const db = client.db("sample_mflix");

       const movies = await db
                .aggregate([
            {
             $sample: {
                size: 1
                 }
              }
            ])
           .toArray();

       res.json(movies);
   } catch (e) {
       console.error(e);
   }
};