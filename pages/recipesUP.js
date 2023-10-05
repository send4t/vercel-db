import React, { useState } from "react";
import styles from "./styles.module.css"; // Import the CSS module
import { textSpanIntersectsWithTextSpan } from "typescript";

export default function Home() {
    const [name, setName] = useState("");
    const [recipe, setRecipe] = useState("");
    const [image, setImage] = useState("");
    const [steps, setSteps] = useState("");
    const [prepTime, setprepTime] = useState("");
    const [totalTime, settotalTime] = useState("");
    const [isUploaded, setIsUploaded] = useState(false); // Initialize the state for displaying 'Feltöltve'

    const handleSubmit = async () => {
        if (!name || !name || !image ||!prepTime || !steps || !totalTime ) {
            alert("Tölts ki minden mezőt!");
            return;
        }
    
        // Call your API here to insert the poem into the database
        const response = await fetch("/api/insert-recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, recipe, image, steps, prepTime, totalTime}),
        });
    
        // Reset form fields after submission
        setName("");
        setRecipe("");
        setImage("");
        setSteps("");
        setprepTime("")
        settotalTime("")
        
    
        // Set the state to show 'Feltöltve'
        setIsUploaded(true);
    };
      
    
    
    
    
    return (
        <div>
            <div className={styles.title}><h1>Recept feltöltése</h1></div>
            <div className={styles.inputfield}>
            <input
                type="text"
                placeholder="Recept neve"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
              </div>

              <div className={styles.inputfield}>
            <input
                type="text"
                placeholder="Előkészítési idő"
                value={prepTime}
                onChange={(e) => setprepTime(e.target.value)}
                required
            />
              </div>

              <div className={styles.inputfield}>
            <input
                type="text"
                placeholder="Teljes főzési idő"
                value={totalTime}
                onChange={(e) => settotalTime(e.target.value)}
                required
            />
              </div>



            <div className={styles.inputfield}>
            <textarea
                placeholder="Recept hozzávalói"
                value={recipe}
                onChange={(e) => setRecipe(e.target.value)}
                required
            />
            </div>

            <div className={styles.inputfield}>
            <textarea
                placeholder="Recept lépései"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                required
            />
            </div>


            <div className={styles.inputfield}>
            <input
                type="text"
                placeholder="Kép linkje"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
            />
            </div>



            
            <div  className={styles.button}>
                
            <button onClick={handleSubmit}>Beküldöm a receptet</button>
            
            {isUploaded && (
                <div>
                    <p>Feltöltve</p>
                    <p>
                    <small><a href="./recipes"> Vissza a receptekhez</a></small>
                    </p>
                </div>
                 )}
                 </div>
        </div>
    );
}
