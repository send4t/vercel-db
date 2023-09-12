import clientPromise from "../lib/mongodb";
import React, { Fragment } from "react";
import styles from "./styles.module.css"; // Import the CSS module
import Image from 'next/image'

export default function Poems({ recipes }) {
    const addCheckboxes = (str) =>
        str.split('\n').map((ingredient, index) => (
            <Fragment key={index}>
                <input type="checkbox" id={`ingredient-${index}`} />
                <label htmlFor={`ingredient-${index}`}>{ingredient}</label>
                <br />
            </Fragment>
        ));

    return (

        <div className={styles.container}>
              <h1 className={[styles.ttext, styles.h1].join(" ") }>Sok finom recept</h1>
        <div className={styles.firstBox}>
         <div>
        {recipes.map((recipe) => (
            <lu key={recipe._id}>
              

            <div className={styles.secondBox}>
                <div className={styles.thirdBox}>
                    <img className={styles.picture} src={recipe.image} />

                    
                </div>
                <div className={styles.column}>
                    <div className={styles.ttext}>{recipe.name}</div>
                    <div className={styles.prepTime}>Elkészítési idő {recipe.duration}</div>
                </div>
            </div>
            <div className={styles.tttext}>
                                <h3>Ingredients:</h3>
                            {addCheckboxes(recipe.recipe)}
            </div>

            <div className={[styles.tttext, styles.test].join(" ") }>
                <h3>Steps:</h3>
                            {addCheckboxes(recipe.steps)}
                </div>
            </lu>
            ))}
            </div>  
        </div>
        <div className={styles.finalBox}></div>
        
        
        <div className={styles.button}>
                <a href="/recipes">
                    <button>Véletlen recept</button>
                </a>
            </div>


            <div className={styles.button}>
              <a href="/recipesUP">
                  <button>Recept feltöltés</button>
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
            .aggregate([{ $sample: { size: 1 } }])
            .toArray();

        return {
            props: { recipes: JSON.parse(JSON.stringify(recipes)) },
        };
    } catch (e) {
        console.error(e);
    }
}
