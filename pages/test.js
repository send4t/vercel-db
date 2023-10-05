import React from "react";
import {Button} from "@nextui-org/react";
import { tv } from 'tailwind-variants';
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";



export default function App() {

  const button = tv({
    base: "font-medium bg-blue-500 text-white rounded-full active:opacity-80",
    variants: {
      color: {
        primary: "bg-blue-500 text-white",
        secondary: "bg-purple-500 text-white",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "px-4 py-3 text-lg",
      },
    },
    compoundVariants: [
      {
        size: ["sm", "md"],
        class: "px-3 py-1",
      },
    ],
    defaultVariants: {
      size: "md",
      color: "primary",
    }
  });

  return (
   <div>



<button className={button({ size: 'sm', color: 'secondary' })}>Click me</button>

      <button className="styles.body">test</button>
    <Button color="primary">
      Button
    </Button>

    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Daily Mix</p>
        <small className="text-default-500">12 Tracks</small>
        <h4 className="font-bold text-large">Frontend Radio</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="/images/hero-card-complete.jpeg"
          width={270}
        />
      </CardBody>
    </Card>
</div>


    
  );
}
