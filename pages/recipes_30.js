import clientPromise from "../lib/mongodb";
import React, { Fragment, useState } from "react";
import styles from "./styles.module.css"; // Import the CSS module
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import {Checkbox} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import {Chip} from "@nextui-org/react";


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
    

        return (

          
          <div className="">


  
                   <div className="flex-wrap justify-center items-bottom flex gap-4 ">
                   <a href="/recipes"> <Chip color="default">Give me random</Chip> </a>
                   <a href="/recipes_30"><Chip color="primary">Less than 30 minutes</Chip> </a> 
                    <Chip color="secondary">Less than 40 minutes</Chip>
                    <Chip color="success">Salad</Chip>
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
          $addFields: {
            prepTimeInt: {
              $convert: {
                input: { $regexFind: { input: "$totalTime", regex: /\d+/ } },
                to: "int",
                onError: 0
              }
            }
          }
        },
        {
          $match: {
            prepTimeInt: { $lt: 30 }
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
        props: { recipes: [] }, // Return an empty array or handle the error as needed
      };
    }
  }