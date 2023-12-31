import clientPromise from "../lib/mongodb";
import React, { Fragment, useState } from "react";
import {Switch,Card,Chip,Spacer, CardHeader, CardBody, CardFooter, Divider, Image,Modal, ModalContent,Link, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Autocomplete, AutocompleteItem} from "@nextui-org/react";
import UploadPoem from "./poemsUP.js";
import { MdEdit } from 'react-icons/md';
import { useTheme } from 'next-themes';



export default function Poems({ poems,tags }) {

    const { theme, setTheme } = useTheme();
    const toggleDarkMode = () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    };


    
  const {isOpen: isUploadOpen, onOpen: onUploadOpen, onClose: onUploadClose} = useDisclosure();
  const {isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose} = useDisclosure();

  const [backdrop, setBackdrop] = React.useState('opaque')
  const backdrops = ["opaque", "blur", "transparent"];


  const handleSave = async () => {  
    try {
      const response = await fetch("/api/editPoem", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ author, title, poem, tag,tags }),
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


    const addLineBreak = (str) =>
    str.split('\n').map((subStr, index) => (
        <Fragment key={index}>
            {subStr}
            <br />
        </Fragment>
    ));

    const autocompleteTags = tags.map(tag => ({ label: tag, value: tag }));
  
    

    return (
        <div >


{backdrops.map((b) => (
    
      <Modal backdrop={backdrop} isOpen={isUploadOpen} onOpenChange={onUploadClose} placement="top-center">
        <ModalContent>
          <UploadPoem closeModal={onUploadClose} />
        </ModalContent>
      </Modal>
   
))}

<Spacer y={6} />

                <div className="flex-wrap justify-center items-bottom flex gap-4 ">
                   <a href="/poems"> <Chip color="default">Give me random</Chip> </a>
                
                   <Autocomplete
      defaultItems={tags}
      label="Select a Tag"
      
      className="max-w-xs"
    >
      {tags.map((tag) => (
        <AutocompleteItem key={tag} value={tag}>
          {tag}
        </AutocompleteItem>
      ))}
    </Autocomplete>
               
            </div>
           
            {poems.map((poem) => (
            <div className="flex justify-center items-center my-20">
            <Card className="max-w-[500px] flex justify-center items-center ">

            <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
         <div className="flex flex-col">
          <p className="text-md">{poem.author}</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p className="text-sm text-default-500">{poem.title}</p>
      </CardBody>
      
      <CardFooter>
      <p className="text-sm text-default-500">{addLineBreak(poem.content)}</p>
      </CardFooter>
    </Card>
    
  
   

    
    </Card>
    </div>
    ))}



<div className="flex-wrap justify-center items-bottom flex gap-4 ">
<a href="#" onClick={onUploadOpen}>
                    <Chip color="default">Upload</Chip>
                </a>
                </div>
           </div>
        
    );
}

export async function getServerSideProps() {
  try {
      const client = await clientPromise;
      const db = client.db("poems");

      // Existing code to fetch poems
      const poems = await db
          .collection("poe")
          .aggregate([ { $sample: { size: 1 } } ])
          .toArray();

      // New code to fetch unique tags
      const tags = await db
          .collection("poe")
          .aggregate([
              { $unwind: "$tags" }, // Unwind the tags array
              { $group: { _id: "$tags" } }, // Group by tags
              { $project: { _id: 0, tag: "$_id" } } // Project the tags
          ])
          .toArray();

      // Extracting the tags from the aggregation result
      const uniqueTags = tags.map(tagDoc => tagDoc.tag);

      return {
          props: { poems: JSON.parse(JSON.stringify(poems)), tags: uniqueTags },
      };
  } catch (e) {
      console.error(e);
      return { props: { poems: [], tags: [] } };
  }
}


