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
        <div className={`${styles.poems} ${styles.poemsPage}`}>
             <div  className={styles.button}>
              <a href="/poemsUP">  
            <button >Vers feltöltés</button>
            </a>
            </div>

            <h1 >Egy random vers az ünnepnapokra</h1>
            
            <ul className={styles.poems}>
                {poems.map((poem) => (
                    <lu>
                        <h2>{poem.author}</h2>
                        <h3>{poem.title}</h3>
                        <p>{addLineBreak(poem.content)}</p>
                    </lu>
                ))}
            </ul>
            
                  
            <div  className={styles.button}>
              <a href="/poems">  
            <button >Véletlen vers</button>
            </a>
            </div>

                
           
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