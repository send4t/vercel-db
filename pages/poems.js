import clientPromise from "../lib/mongodb";

export default function Poems({ poems }) {
    return (
        <div>
            <h1>A random poem from the list of all poems</h1>
            <p>
                <small><a href="/poemsUp" class="button">Vers feltöltés</a>  </small>
            </p>
            <ul>
                {poems.map((poem) => (
                    <li>
                        <h2>{poem.author}</h2>
                        <h3>{poem.title}</h3>
                        <p>{poem.content}</p>
                    </li>
                ))}
            </ul>
            <p>
                <small><a href="./poems">Véletlen vers</a></small>
            </p>
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("poems");

        const poems = await db
            .collection("poe")
            .aggregate(
                [ { $sample: { size: 1 } } ]
             )
            .toArray();

        return {
            props: { poems: JSON.parse(JSON.stringify(poems)) },
        };
    } catch (e) {
        console.error(e);
    }
}