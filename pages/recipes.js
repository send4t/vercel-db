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
        <div className={styles.recipes}>
            <div className={styles.button}>
                <a href="/recipesUP">
                    <button>Recept feltöltés</button>
                </a>
            </div>

            <h1>Sok finom recept</h1>

            <ul className={styles.rec}>
                {recipes.map((recipe) => (
                    <li key={recipe._id}>
                        <h2>{recipe.name}</h2>
                        <Image
                            alt="The guitarist in the concert."
                            src={recipe.image}
                            width={250}
                            height={250}
                        />
                        <p>elkészítési idő {recipe.duration}</p>

                        <div className={styles.rec}>
                            <h3>Ingredients:</h3>
                            {addCheckboxes(recipe.recipe)}
                        </div>
                        <div className={styles.rec}>
                            <h3>Steps:</h3>
                            {addCheckboxes(recipe.steps)}
                        </div>
                    </li>
                ))}
            </ul>

            <div className={styles.button}>
                <a href="/recipes">
                    <button>Véletlen recept</button>
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
