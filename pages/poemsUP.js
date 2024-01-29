import React, { useState } from "react";
import { Input, Spacer, Button, Textarea, Chip } from "@nextui-org/react";

export default function UploadPoem() {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleAddTag = () => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTag("");
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!author || !title || !content || tags.length === 0) {
      alert("Fill in all fields and add at least one tag");
      return;
    }

    // Call the API here to insert the poem into the database
    const response = await fetch("/api/insert-poems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ author, title, content, tags,tag }),
    });

    // Handle the response from the API call here if necessary

    // Reset form fields after submission
    setAuthor("");
    setTitle("");
    setContent("");
    setTag("");
    setTags([]);

    // Set the state to show 'Uploaded'
    setIsUploaded(true);
  };

  return (
    <div className="flex  flex-col items-center justify-center">
      <div className="w-[400px]">
        <Spacer y={4} />
        <div className="text-center font-bold">Upload a poem</div>
        <Spacer y={4} />

        <Input type="text" value={author} label="Author" onChange={(e) => setAuthor(e.target.value)} required />
        <Spacer y={4} />

        <Input type="text" value={title} label="Title" onChange={(e) => setTitle(e.target.value)} required />
        <Spacer y={4} />

        <Textarea type="text" value={content} label="Content" onChange={(e) => setContent(e.target.value)} required />
        <Spacer y={4} />

        <Input
          type="text"
          value={tag}
          label="Tag (press , to add tag)"
          onChange={(e) => setTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === ",") {
              e.preventDefault();
              handleAddTag();
            }
          }}
        />
        <div style={{ marginTop: '10px' }}>
          {tags.map((t, index) => (
            <Chip 
              key={index} 
              color="primary" 
              style={{ marginRight: '5px' }} 
              onClose={() => handleRemoveTag(index)}
              closable
            >
              {t}
            </Chip>
          ))}
        </div>

        <Spacer y={4} />

        <div className="text-center font-bold">
          <Button color="success" onClick={handleSubmit}>
            Send Poem
          </Button>
        </div>

        <Spacer y={4} />

        {isUploaded && (
          <div className="text-center font-bold">
            <p>Uploaded</p>
          </div>
        )}
      </div>
    </div>
  );
}
