import React, { useState } from "react";
import styles from "./styles.module.css"; // Import the CSS module

export default function Home() {
    const [name, setName] = useState("");
    const [recipe, setRecipe] = useState("");
    const [isUploaded, setIsUploaded] = useState(false); // Initialize the state for displaying 'Feltöltve'

    const handleSubmit = async () => {
        if (!name || !name ) {
            alert("Tölts ki minden mezőt!");
            return;
        }
    
        // Call your API here to insert the poem into the database
        const response = await fetch("/api/insert-recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, recipe }),
        });
    
        // Reset form fields after submission
        setName("");
        setRecipe("");
        
    
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
                placeholder="Recept elemei"
                value={recipe}
                onChange={(e) => setRecipe(e.target.value)}
                required
            />
            </div>
            
            <div  className={styles.button}>
                
            <button onClick={handleSubmit}>Beküldöm a receptet</button>
            
            {isUploaded && (
                <div>
                    <p>Feltöltve</p>
                    <p>
                    <small><a href="./poems"> Vissza a receptekhez</a></small>
                    </p>
                </div>
                 )}
                 </div>
        </div>
    );
}
