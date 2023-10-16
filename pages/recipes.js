import clientPromise from "../lib/mongodb";
import React, { Fragment, useState } from "react";
import styles from "./styles.module.css"; // Import the CSS module
import {Card, CardHeader, CardBody, CardFooter, Divider, Image} from "@nextui-org/react";
import {Chip} from "@nextui-org/react";
import {Spacer} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link,Textarea} from "@nextui-org/react";
import UploadRecipe from "./recipesUP.js";
import {Switch} from "@nextui-org/react";
import {MoonIcon} from "./MoonIcon";
import {SunIcon} from "./SunIcon";
import { MdEdit } from 'react-icons/md';


const CustomCheckbox = ({ children }) => {
  const [isChecked, setIsChecked] = useState(false);

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


export default function Poems({ recipes }) {
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

  const handleOpen = (backdrop) => {

    setBackdrop(backdrop)
    onOpen();
  }

   // Function to open the modal with current recipe data
   const handleEdit = (recipe) => {
    setID(recipe._id); // Assuming recipe has an "_id" property
    setName(recipe.name);
    setRecipe(recipe.recipe);
    setprepTime(recipe.prepTime);
    settotalTime(recipe.totalTime);
    // Set other state variables as needed
    console.log(recipe)
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
          body: JSON.stringify({ id, name, recipe, prepTime, totalTime,image,steps,isSalad }),
        });
    
        if (response.ok) {
          onClose();
        } else {
          console.error("Error editing recipe:", response.statusText);
        }
      } catch (error) {
        console.error("Error editing recipe:", error);
      }
    };
    


        return (
          <div className="">

      <Switch
       defaultSelected
        size="lg"
        color="secondary"
       thumbIcon={({ isSelected, className }) =>
         isSelected ? (
            <SunIcon className={className} />
         ) : (
          <MoonIcon className={className} />
            )
         }
       >
      Dark mode
       </Switch>

{backdrops.map((b) => (
    <>
      <Modal backdrop={backdrop} isOpen={isUploadOpen} onOpenChange={onUploadClose} placement="top-center">
        <ModalContent>
          <UploadRecipe closeModal={onUploadClose} />
        </ModalContent>
      </Modal>
    </>
))}



<Spacer y={4} />
  
                   <div className="flex-wrap justify-center items-bottom flex gap-4 ">
                   <a href="/recipes"> <Chip color="default">Give me random</Chip> </a>
                   <a href="/recipes_30"><Chip variant="shadow"
      classNames={{
        base: "bg-gradient-to-br from-yellow-500 to-red-500 border-small border-white/50 shadow-pink-500/30",
        content: "drop-shadow shadow-black text-white",
      }}>Less than 30 minutes</Chip> </a> 
                    
                    <Chip variant="shadow"
      classNames={{
        base: "bg-gradient-to-br from-blue-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
        content: "drop-shadow shadow-black text-white",
      }}>Less than 40 minutes</Chip>
                    

                    <a href="/recipes_salad">
                    <Chip variant="shadow"
      classNames={{
        base: "bg-gradient-to-br from-green-500 to-yellow-500 border-small border-white/50 shadow-pink-500/30",
        content: "drop-shadow shadow-black text-white",
      }}>Salad</Chip></a>

<a href="#" onClick={onUploadOpen}>
  <Chip color="default">Upload</Chip>
</a>
                    </div> 
          <div >
           <div>
            
          {recipes.map((recipe) => (
            
              <lu key={recipe._id}>

<div className="flex justify-center items-center my-20">
          <Card className="max-w-[500px] flex justify-center items-center ">
      <CardHeader className="flex gap-3">
        <Image
        isZoomed
          alt="nextui logo"
          height={240}
          radius="sm"
          src={recipe.image}
          width={240}
        />
        <div className="flex flex-col">
          <p className="text-md mb-5">{recipe.name}</p>
          <p className="text-small text-default-500">Prep time</p>
          <p className="text-small text-default-500">{recipe.prepTime}</p>
          <p className="text-small text-default-500 mt-5">Total time</p>
          <p className="text-small text-default-500">{recipe.totalTime}</p>
          <MdEdit
            className="absolute bottom-2 right-2 cursor-pointer"
            onClick={() => handleEdit(recipe)}
          />
        </div>
      </CardHeader>
    </Card>
    </div>

    <Modal backdrop={backdrop} isOpen={isEditOpen} onOpenChange={onEditClose}>
        <ModalContent>
          <ModalHeader>Edit Recipe</ModalHeader>
          <ModalBody>                 
                  Name:
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

    <div className="flex space-x-10 flex-wrap justify-center items-top my-10 ">
    <Card className="max-w-[400px] ">
      
      <CardBody>
      <p className="text-lg mb-3">Ingredients:</p>
      <Divider/>
      {addCheckboxes(recipe.recipe)}
      </CardBody>
      <Divider/>
     
    </Card>
    <Card className="max-w-[400px] ">
      
      <CardBody>
      <p className="text-lg mb-3">Steps:</p>
      <Divider/>
      {addCheckboxes(recipe.steps)}
      </CardBody>
      <Divider/>
     
    </Card>

    </div>



              </lu>
              ))}
              </div>  
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
