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
        <div className={styles.firstBox}>
            <div className={styles.secondBox}>
                <div className={styles.thirdBox}>
                    <img className={styles.picture} src="https://via.placeholder.com/227x250" />
                </div>
                <div className={styles.column}>
                    <div className={styles.ttext}>Recept neve</div>
                    <div className={styles.tttext}>Recept neve</div>
                </div>
            </div>
            <div className={styles.tttext}>Recept hozzavalok</div>
            <div className={styles.tttext}>recept lépések</div>
        </div>
        <div className={styles.finalBox}></div>
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
