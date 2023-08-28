import clientPromise from "../lib/mongodb";
import React, { Fragment } from "react";
import styles from "./styles.module.css"; // Import the CSS module



export default function Poems({ recipes }) {
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
              <a href="/recipesUP">  
            <button >Recept feltöltés</button>
            </a>
            </div>

            <h1 >Sok finom recept</h1>
            
            <ul className={styles.poems}>
                {recipes.map((recipes) => (
                    <lu>
                        <h2>{recipes.name}</h2>
                        
                        <p>{addLineBreak(recipes.recipe)}</p>
                    </lu>
                ))}
            </ul>
            
                  
            <div  className={styles.button}>
              <a href="/recipes">  
            <button >Véletlen vers</button>
            </a>
            </div>

                
           
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("recipes");

    
        const recipes = await db
            .collection("rec")
            .aggregate(
                [ { $sample: { size: 1 } } ]
             )
            .toArray();

        return {
            props: { recipes: JSON.parse(JSON.stringify(recipes)) },
        };
    } catch (e) {
        console.error(e);
    }
}