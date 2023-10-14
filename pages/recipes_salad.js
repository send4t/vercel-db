import clientPromise from "../lib/mongodb";
import React, { Fragment, useState } from "react";
import styles from "./styles.module.css"; // Import the CSS module
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import {Checkbox} from "@nextui-org/react";
import {Chip} from "@nextui-org/react";
import {Spacer} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import UploadRecipe from "./recipesUP.js";


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
  const addCheckboxes = (str) =>
    str.split('\n').map((ingredient, index) => (
      <Fragment key={index}>
        <Checkbox>{ingredient}</Checkbox>
        <br />
      </Fragment>
    ));

    const {isOpen, onOpen, onClose} = useDisclosure();
  const [backdrop, setBackdrop] = React.useState('opaque')
  const backdrops = ["opaque", "blur", "transparent"];

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop)
    onOpen();
  }
    

        return (

            <div className="">

{backdrops.map((b) => (
    <>
      <Modal backdrop={backdrop} isOpen={isOpen} onOpenChange={onClose} placement="top-center">
        <ModalContent>
          <UploadRecipe closeModal={onClose} />
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

<a href="#" onClick={onOpen}>
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
         
        </div>
      
      </CardHeader>
    </Card>
    </div>
    
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
  
      const aggregationPipeline = [
        {
          $match: {
            isSalad: true // Filter based on the isSalad field
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
  