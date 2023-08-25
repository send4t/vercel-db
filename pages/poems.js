import clientPromise from "../lib/mongodb";
import React, { Fragment } from "react";
import styles from "./styles.module.css"; // Import the CSS module


export default function Poems({ poems }) {
    const addLineBreak = (str) =>
    str.split('\n').map((subStr, index) => (
        <Fragment key={index}>
            {subStr}
            <br />
        </Fragment>
    ));

    return (
        <div className={styles.poems}>
            <small><a href="./poemsUP">Feltöltés</a></small>

            <h1>Egy random vers az ünnepnapokra</h1>
            
            <ul>
                {poems.map((poem) => (
                    <lu>
                        <h2>{poem.author}</h2>
                        <h3>{poem.title}</h3>
                        <p>{addLineBreak(poem.content)}</p>
                    </lu>
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