const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri = process.env.MONGODB_URI

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    // database and collection code goes here
    const db = client.db("poems");
    const coll = db.collection("poe");

    // insert code goes here
    const docs = [
      {author: "Petofi Sandor", title: "Anyam Tyukja", content: "hol van az alja"},
      {author: "Petofi Sandor", title: "Anyam Tyukja", content: "hol van az alja"},
      {author: "Petofi Sandor", title: "Anyam Tyukja", content: "hol van az alja"
    }
    ];

    const result = await coll.insertMany(docs);

    // display the results of your operation
    console.log(result.insertedIds);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
