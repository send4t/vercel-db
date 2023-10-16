import React, { useState } from "react";
import styles from "./styles.module.css"; // Import the CSS module
import {Input} from "@nextui-org/react";
import {Spacer} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";

export default function UploadRecipe({ closeModal }) {

    const [name, setName] = useState("");
    const [recipe, setRecipe] = useState("");
    const [image, setImage] = useState("");
    const [steps, setSteps] = useState("");
    const [prepTime, setprepTime] = useState("");
    const [totalTime, settotalTime] = useState("");
    const [isUploaded, setIsUploaded] = useState(false); // Initialize the state for displaying 'Feltöltve'
    const [isSalad, setisSalad] = useState(false);

    const handleSubmit = async () => {
        if (!name || !name || !image ||!prepTime || !steps || !totalTime ) {
            alert("Please fill in all fields");
            return;
        }
    
        // Call your API here to insert the poem into the database
        const response = await fetch("/api/insert-recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, recipe, image, steps, prepTime, totalTime,isSalad}),
        });
    
        // Reset form fields after submission
        setName("");
        setRecipe("");
        setImage("");
        setSteps("");
        setprepTime("")
        settotalTime("")
        setisSalad(false);
        


        // Set the state to show 'Uploaded'
        setIsUploaded(true);
        closeModal();
    };
   
  
    
    return (



<div className="flex  flex-col items-center justify-center ">
        <div className="w-[400px]">
        <Spacer y={4} />
<div className="text-center	font-bold">Upload recipe</div>
<Spacer y={3} />
<div className="">
      <Input type="text"  value={name} label="Recipe name" onChange={(e) => setName(e.target.value)} required />
    </div>
    <Spacer y={4} />
    <div className="">
      <Input type="text"  value={prepTime} label="Prep time (minutes)" onChange={(e) => setprepTime(e.target.value)} required />
    </div>
    <Spacer y={4} />
    <div className="">
      <Input type="text"  value={totalTime} label="Total time (minutes)" onChange={(e) => settotalTime(e.target.value)} required />
    </div>
    <Spacer y={4} />
  
    <div className="">
      <Textarea type="text"  value={recipe} label="Ingredients" onChange={(e) => setRecipe(e.target.value)} required />
    </div>
    <Spacer y={4} />
    <div className="">
      <Textarea type="text"  value={steps} label="Steps" onChange={(e) => setSteps(e.target.value)} required />
    </div>
    <Spacer y={4} />

<div className="">
      <Input type="text"  value={image} label="Image link" onChange={(e) => setImage(e.target.value)} required />
    </div>
    <Spacer y={4} />

    </div>          


    <div className="">
        <div className="flex items-center">
          <span className="font-normal italic">Is it a salad?</span>
          <Spacer x={8}/>
          <label className="switch">
            <input
              type="checkbox"
              checked={isSalad}
              onChange={() => setisSalad(!isSalad)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <Spacer y={4} />


            
            <div  >
            <Button color="primary" onClick={handleSubmit}>
                    Send recipe
            </Button>
            <Spacer y={4} />
                       
            {isUploaded && (
                <div>
                    <p>Uploaded</p>
                    <p>
                    <a href="/recipes"><Button href="/recipes">
                    Back to recipes
                     </Button>
                     </a> 
                    </p>
                </div>
                 )}
                 </div>
        </div>
    );
}
