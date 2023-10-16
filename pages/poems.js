import clientPromise from "../lib/mongodb";
import React, { Fragment, useState } from "react";
import {Switch,Card,Chip,Spacer, CardHeader, CardBody, CardFooter, Divider, Image,Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Textarea} from "@nextui-org/react";
import UploadPoem from "./poemsUP.js";
import { MdEdit } from 'react-icons/md';
import { useTheme } from 'next-themes';


export default function Poems({ poems }) {

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
        body: JSON.stringify({ author, title, poem, tag }),
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

    return (
        <div >

{backdrops.map((b) => (
    <>
      <Modal backdrop={backdrop} isOpen={isUploadOpen} onOpenChange={onUploadClose} placement="top-center">
        <ModalContent>
          <UploadPoem closeModal={onUploadClose} />
        </ModalContent>
      </Modal>
    </>
))}

<Spacer y={6} />

                <div className="flex-wrap justify-center items-bottom flex gap-4 ">
                   <a href="/"> <Chip color="default">Give me random</Chip> </a>
                
                <a href="#" onClick={onUploadOpen}>
                    <Chip color="default">Upload</Chip>
                </a>
            </div>
           

            <h1 >Egy random vers az ünnepnapokra</h1>
            
            <ul >
                {poems.map((poem) => (
                    <lu>
                        <h2>{poem.author}</h2>
                        <h3>{poem.title}</h3>
                        <p>{addLineBreak(poem.content)}</p>
                    </lu>
                ))}
            </ul>
            
                  
            <div  >
              <a href="/poems">  
            <button >Véletlen vers</button>
            </a>
            </div>

                
           
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("poems");

    
        const poems = await db
            .collection("poe")
            .aggregate(
                [ { $sample: { size: 1 } } ]
             )
            .toArray();

        return {
            props: { poems: JSON.parse(JSON.stringify(poems)) },
        };
    } catch (e) {
        console.error(e);
    }
}