import React, { useState } from "react";

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
            <h1>Insert Poem</h1>
            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit Poem</button>
        </div>
    );
}
