import clientPromise from "../lib/mongodb";
import React, { Fragment, useState, useEffect } from "react";
import {
  Chip,
  Tooltip,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Textarea,
} from "@nextui-org/react";
import UploadRecipe from "./recipesUP.js";
import { MdEdit } from "react-icons/md";
import { useTheme } from "next-themes";
import Footer from "../components/Footer";

const CustomCheckbox = ({ children }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label>
      <input type="checkbox" checked={isChecked} onChange={toggleCheckbox} />
      {children}
    </label>
  );
};

export default function Recipes({ recipes }) {
  const { theme, setTheme } = useTheme();
  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const { isOpen: isUploadOpen, onOpen: onUploadOpen, onClose: onUploadClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  const [backdrop, setBackdrop] = React.useState("opaque");
  const backdrops = ["opaque", "blur", "transparent"];

  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [recipe, setRecipe] = useState("");
  const [image, setImage] = useState("");
  const [steps, setSteps] = useState("");
  const [prepTime, setprepTime] = useState("");
  const [totalTime, settotalTime] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [isSalad, setisSalad] = useState(false);

  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim()) {
        fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`)
          .then((res) => res.json())
          .then((data) => setSearchResults(data))
          .catch(console.error);
      } else {
        setSearchResults(null);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleEdit = (recipe) => {
    setID(recipe._id);
    setName(recipe.name);
    setSteps(recipe.steps);
    setRecipe(recipe.recipe);
    setprepTime(recipe.prepTime);
    settotalTime(recipe.totalTime);
    setImage(recipe.image);
    onEditOpen();
  };

  const addCheckboxes = (str) =>
    str.split("\n").map((ingredient, index) => (
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
      console.error("Error editing recipe:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div className="flex-1">
        <div className="p-4 pt-10 flex flex-col md:flex-row items-center">
          <div className="flex mb-4 md:mb-0 md:ml-10">
            <a href="/">Home</a>
          </div>

          <div className="flex flex-col md:flex-row flex-grow justify-center md:justify-start md:pl-10 space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-auto">
              <Input
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:max-w-xs"
              />
            </div>
            <div className="flex space-x-4">
              <a href="/recipes">
                <Chip
                  variant="shadow"
                  classNames={{
                    base: "bg-gradient-to-br from-yellow-500 to-red-500 border-small border-white/50 shadow-pink-500/30",
                    content: "drop-shadow shadow-black text-white",
                  }}
                >
                  Give me random
                </Chip>
              </a>
              <a href="/recipes_30">
                <Chip color="default">Less than 30 minutes</Chip>
              </a>
              <a href="/recipes_salad">
                <Chip color="default">Salad</Chip>
              </a>
            </div>
          </div>

          <div className="flex mt-4 md:mt-0 md:mr-10">
            <a href="#" onClick={onUploadOpen}>
              <Chip color="success">Upload</Chip>
            </a>
          </div>
        </div>

        {searchResults ? (
          searchResults.length === 0 ? (
            <p className="p-4">No recipes found matching "{searchTerm}"</p>
          ) : (
            searchResults.map((recipe) => (
              <div key={recipe._id} className="flex flex-col ml-4 md:ml-40 items-center pt-5">
                <div className="flex flex-col md:flex-row justify-start items-start w-full mb-10">
                  <div className="w-full md:w-[400px] h-[250px] overflow-hidden">
                    <img
                      className="w-full h-full object-cover rounded-lg"
                      src={recipe.image}
                      alt="Recipe Image"
                    />
                  </div>

                  <div className="flex flex-col mt-4 md:mt-0 md:ml-5 space-y-2">
                    <div className="flex items-center">
                      <p className="text-lg mb-2 font-bold">{recipe.name}</p>
                      <div
                        className="pb-2"
                        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.3)")}
                        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      >
                        <Tooltip content="Edit recipe">
                          <button>
                            <MdEdit
                              className="ml-2 cursor-pointer"
                              onClick={() => handleEdit(recipe)}
                              style={{ transition: "transform 0.35s" }}
                            />
                          </button>
                        </Tooltip>
                      </div>
                    </div>
                    <div>
                      <p className="text-small mb-1">Prep time</p>
                      <p className="text-small text-lightCyan">{recipe.prepTime}</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-small mb-1">Total time</p>
                      <p className="text-small text-lightCyan">{recipe.totalTime}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-start w-full">
                  <div className="flex flex-col w-full md:w-1/3 max-w-sm space-y-4 pr-2">
                    <p className="text-lg text-tealCyan font-bold">Ingredients:</p>
                    <Divider />
                    {addCheckboxes(recipe.recipe)}
                  </div>
                  <div className="flex flex-col w-full md:w-2/3 max-w-md space-y-4 pl-2">
                    <p className="text-lg text-tealCyan font-bold">Steps:</p>
                    <Divider />
                    {addCheckboxes(recipe.steps)}
                  </div>
                </div>
              </div>
            ))
          )
        ) : (
          recipes.map((recipe) => (
            <div key={recipe._id} className="flex flex-col ml-4 md:ml-40 items-center pt-5">
              {/* Recipe content */}
            </div>
          ))
        )}
      </div>

      <div className="">
        <Footer />
      </div>

      {/* Modals */}
      {backdrops.map((b, index) => (
        <Fragment key={index}>
          <Modal backdrop={backdrop} isOpen={isUploadOpen} onOpenChange={onUploadClose} placement="top-center">
            <ModalContent>
              <UploadRecipe closeModal={onUploadClose} />
            </ModalContent>
          </Modal>
        </Fragment>
      ))}

      <div>
        {recipes.map((recipe) => (
          <div key={recipe._id}>
            <Modal style={{ top: "5%", position: "fixed" }} backdrop={backdrop} isOpen={isEditOpen} onOpenChange={onEditClose} placement="top-center">
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
                  <Button color="success" onClick={handleSave}>
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

    const recipes = await db.collection("rec").aggregate([{ $sample: { size: 1 } }]).toArray();

    return {
      props: { recipes: JSON.parse(JSON.stringify(recipes)) },
    };
  } catch (e) {
    console.error(e);
  }
}