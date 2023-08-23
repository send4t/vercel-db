import React, { useState } from "react";
import styles from "./styles.module.css"; // Import the CSS module

export default function Home() {
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async () => {
        // Call your API here to insert the poem into the database
        const response = await fetch("/api/insert-poems", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ author, title, content }),
        });

        // Reset form fields after submission
        setAuthor("");
        setTitle("");
        setContent("");
    };

    return (
        <div>
            <h1>Vers feltöltés</h1>
            <div className={styles.inputfield}>
            <input
                type="text"
                placeholder="Szerző"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
            />
              </div>
            <div className={styles.inputfield}>
            <input
                type="text"
                placeholder="Cím"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            </div>
            <div className={styles.formgroup}>
            <textarea
                placeholder="Vers szövege"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            </div>
            <button onClick={handleSubmit} className={styles.button}>Beküldöm a verset</button>
        </div>
    );
}
