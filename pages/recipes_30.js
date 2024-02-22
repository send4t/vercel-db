import clientPromise from "../lib/mongodb";
import React, { Fragment, useState } from "react";
import {Chip,Tooltip, Divider, Image,Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Textarea} from "@nextui-org/react";
import UploadRecipe from "./recipesUP.js";
import { MdEdit } from 'react-icons/md';
import { useTheme } from 'next-themes';
import Footer from '../components/Footer';


const CustomCheckbox = ({ children }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
 

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={toggleCheckbox}
      />
      {children}
    </label>
  );
};


export default function Recipes({ recipes }) {
  const { theme, setTheme } = useTheme();
  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const {isOpen: isUploadOpen, onOpen: onUploadOpen, onClose: onUploadClose} = useDisclosure();
const {isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose} = useDisclosure();
  
  const [backdrop, setBackdrop] = React.useState('opaque')
  const backdrops = ["opaque", "blur", "transparent"];

  // Define your state variables and corresponding state functions
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [recipe, setRecipe] = useState("");
  const [image, setImage] = useState("");
  const [steps, setSteps] = useState("");
  const [prepTime, setprepTime] = useState("");
  const [totalTime, settotalTime] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [isSalad, setisSalad] = useState(false);



   // Function to open the modal with current recipe data
   const handleEdit = (recipe) => {
    setID(recipe._id); // Assuming recipe has an "_id" property
    setName(recipe.name);
    setSteps(recipe.steps)
    setRecipe(recipe.recipe);
    setprepTime(recipe.prepTime);
    settotalTime(recipe.totalTime);
    setImage(recipe.Image);
    // Set other state variables as needed
    onEditOpen();
  };
  

  const addCheckboxes = (str) =>
    str.split('\n').map((ingredient, index) => (
      <Fragment key={index}>
        <Checkbox>{ingredient}</Checkbox>
        <br />
      </Fragment>
    ));
    
  


    const handleSave = async () => {  
      try {
        const response = await fetch("/api/edit-Recipe", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, name, recipe, prepTime, totalTime, image, steps, isSalad }),
        
        });
    
        if (response.ok) {
          onEditClose();
        } else {
          console.error("Error editing recipe:", response.statusText);
        }
      } catch (error) {
        console.error("Error editing recipe:", error)
       
      }
    };
    


        return (

          <div className="flex flex-col min-h-screen">

          <div className="flex-1">
          <div className="p-4 pt-10 flex  items-center">
            <div className="flex ml-10">
                  <a href="/">Home</a>
                  </div>


                  <div className="flex flex-grow justify-start pl-10 space-x-4">
                   <a href="/recipes"> <Chip color="default">Give me random</Chip> </a>
                 

                    <a href="/recipes_30"> <Chip variant="shadow" classNames={{
                             base: "bg-gradient-to-br from-yellow-500 to-red-500 border-small border-white/50 shadow-pink-500/30",
                             content: "drop-shadow shadow-black text-white",
                      }}>Less than 30 minutes</Chip> </a> 


                     <a href="/recipes_salad"><Chip color="default">Salad</Chip> </a>
               
                   
                 </div>

                 <div className="flex mr-10">
                 <a href="#" onClick={onUploadOpen}>
                    <Chip color="success">Upload</Chip>
                 </a>
                  </div>

         </div>
            


{recipes.map((recipe) => (
<div className="flex flex-col ml-4 md:ml-40 items-center pt-5 ">
  <div className="flex justify-start items-start w-full mb-10">
    <div className="flex min-w-400 h-48 bg-gray-300 flex items-center justify-center ">
          
    <img src={recipe.image} className="w-full h-full object-contain" alt="Recipe" />
        
    </div>
    
    <div className="flex flex-col ml-5 space-y-2">
    <div className="flex items-center">
    <p className="text-lg mb-2 font-bold ">{recipe.name}</p>
    
    <div className="pb-2"
    onMouseOver={e => e.currentTarget.style.transform = "scale(1.3)"}
    onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}>
  <Tooltip content="Edit recipe">
    <button><MdEdit 
        className="ml-2 cursor-pointer" 
        onClick={() => handleEdit(recipe)}
        style={{ transition: "transform 0.35s" }} // Adding transition for smooth effect
    /> </button> 
  </Tooltip> 
 

    </div>
</div>
    <div>
        <p className="text-small  mb-1">Prep time</p>
        <p className="text-small text-lightCyan">{recipe.prepTime}</p>
        
    </div>
    <div className="mt-2">
        <p className="text-small  mb-1">Total time</p>
        <p className="text-small text-lightCyan">{recipe.totalTime}</p>
    </div>
</div>
  </div>
  <div className="flex justify-start w-full">
    <div className="flex flex-col w-1/3 max-w-sm space-y-4 pr-2">
    <p className="text-lg text-tealCyan font-bold">Ingredients:</p>
      <Divider/>
      {addCheckboxes(recipe.recipe)}
      
    </div>
    <div className="flex flex-col w-2/3 max-w-md space-y-4 pl-2">
    <p className="text-lg  text-tealCyan font-bold">Steps:</p>
      <Divider/>
      {addCheckboxes(recipe.steps)}
    </div>
  </div>
 
</div>

))}
</div>

<div className="">
             <Footer />
        
                      </div > 
  
    


{backdrops.map((b, index) => (
    <Fragment key={index}>
      <Modal backdrop={backdrop} isOpen={isUploadOpen} onOpenChange={onUploadClose} placement="top-center">
        <ModalContent>
          <UploadRecipe closeModal={onUploadClose} />
        </ModalContent>
      </Modal>
    </Fragment>
))}


  
                  
          <div >
          {recipes.map((recipe) => (
           <div key={recipe._id}>
                     
     
      <Modal   style={{ top: '5%', position: 'fixed' }}   backdrop={backdrop} isOpen={isEditOpen} onOpenChange={onEditClose} placement="top-center">
        <ModalContent>
          <ModalHeader>Edit Recipe</ModalHeader>
          <ModalBody>                 
                  <Input type="text" label="ID" defaultValue={recipe._id} onChange={(e) => setID(e.target.value)} />      
                  <Input type="text" label="Name" defaultValue={recipe.name} onChange={(e) => setName(e.target.value)} />
                  <Input type="text" label="Preptime (minutes)" defaultValue={recipe.prepTime} onChange={(e) => setprepTime(e.target.value)} />
                  <Input type="text" label="Totaltime (minutes)" defaultValue={recipe.totalTime} onChange={(e) => settotalTime(e.target.value)} />
                  <Input type="text" label="Image" defaultValue={recipe.image} onChange={(e) => setImage(e.target.value)} />
                  <Textarea type="text" label="Ingredients" defaultValue={recipe.recipe} onChange={(e) => setRecipe(e.target.value)} />
                  <Textarea type="text" label="Steps" defaultValue={recipe.steps} onChange={(e) => setSteps(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onEditClose}>Cancel</Button>
            <Button
              color="secondary"
              onClick={handleSave}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
     
            
              </div>  
              ))}
          </div>
          </div>
          
      );
  }
  
  

  export async function getServerSideProps() {
    try {
      const client = await clientPromise;
      const db = client.db("recipes");
  
      const aggregationPipeline = [
        {
          $addFields: {
            totalTimeMatch: {
              $regexFind: {
                input: "$totalTime",
                regex: /\d+/
              }
            }
          }
        },
        {
          $addFields: {
            totalTimeInt: {
              $cond: {
                if: { $ne: ["$totalTimeMatch", null] },
                then: { $toInt: "$totalTimeMatch.match" },
                else: 0
              }
            }
          }
        },
        {
          $match: {
            totalTimeInt: { $lt: 30 }
          }
        },
        { $sample: { size: 1 } }
      ];
      
      
      
      const recipes = await db
        .collection("rec")
        .aggregate(aggregationPipeline)
        .toArray();
  
      return {
        props: { recipes: JSON.parse(JSON.stringify(recipes)) },
      };
    } catch (e) {
      console.error(e);
      return {
        props: { recipes: [] },
      };
    }
  }
  