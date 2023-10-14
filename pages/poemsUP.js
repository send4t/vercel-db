import React, { useState } from "react";
import styles from "./styles.module.css"; // Import the CSS module
import {Input} from "@nextui-org/react";
import {Spacer} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";

export default function Home() {
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tag, setTag] = useState("");

    const [isUploaded, setIsUploaded] = useState(false); // Initialize the state for displaying 'Uploaded'

    const handleSubmit = async () => {
        if (!author || !title || !content || !tag) {
            alert("Fill in all fields");
            return;
        }
    
        // Call the API here to insert the poem into the database
        const response = await fetch("/api/insert-poems", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ author, title, content,tag }),
        });
    
        // Reset form fields after submission
        setAuthor("");
        setTitle("");
        setContent("");
        setTag("")
    
        // Set the state to show 'Uploaded'
        setIsUploaded(true);
    };
      
    
    
    
    
    return (
        <div className="flex  flex-col items-center justify-center">
            <div className="w-[400px]">
            <div className="text-center	font-bold">Upload a poem</div>
            
            <div className="">
                 <Input type="text"  value={author} label="Author" onChange={(e) => setAuthor(e.target.value)} required />
            </div>

            <Spacer y={4} />
            
            <div className="">
                 <Input type="text"  value={content} label="Title" onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <Spacer y={4} />

            <div className="">
                 <Textarea type="text"  value={content} label="Content" onChange={(e) => setContent(e.target.value)} required />
            </div>

            <Spacer y={4} />

            <div className="">
                 <Input type="text"  value={tag} label="Tag" onChange={(e) => setTag(e.target.value)} required />
            </div>

            <Spacer y={4} />

            <div >
                
            <Button color="primary" onClick={handleSubmit}>
                    Send recipe
            </Button>
            
            {isUploaded && (
                <div>
                    <p>Uploaded</p>
                    <p>
                    <small><a href="./poems"> Back to poems</a></small>
                    </p>
                </div>
                 )}
                 </div>
        </div>
        </div>
    );
}
