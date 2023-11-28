import React from 'react';
import Head from 'next/head';
import clientPromise from '../lib/mongodb';
import {Card, CardHeader, CardBody, CardFooter, Image, Button,Switch} from "@nextui-org/react";
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTheme } from 'next-themes';


export const getServerSideProps = async () => {
  try {
    await clientPromise;
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({ isConnected }) {
  const { theme, setTheme } = useTheme();
  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const router = useRouter();
 
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };
  
  const handleMouseOut = () => {
    setIsHovered(false);
  };


  function HoverableCard({ src, title, subtitle, onPress }) {
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <Card 
        className="w-1/2 h-1/2" 
        isPressable 
        isHoverable 
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        onPress={onPress} 
        radius="none"
      >
        <CardHeader className="absolute z-10 bottom-1 flex-col !items-start">
          <p className="text-large text-white/60 uppercase font-bold">{title}</p>
          <h4 className="text-white font-medium text-large">{subtitle}</h4>
        </CardHeader>
        <Image
          isFooterBlurred
          radius="none"
          removeWrapper
          alt="Card background"
          className={`z-0 w-full h-full object-cover ${isHovered ? '' : 'grayscale'}`}
          src={src}
        />
      </Card>
    );
  }



  return ( 

 
    
    <div className=" ">
      
     
      <Head>
        <title>Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

     

      <main>
      
     
      <div className="min-h-screen flex flex-col items-center ">
  <Head>
    <title>Portfolio</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>

  <main className="flex flex-col md:flex-row w-full h-screen">
  <div className="w-full md:w-1/2 flex flex-col justify-between p-4">
  
    <div className="flex justify-between items-center">
    
      <h1 className="text-2xl font-bold">Tamás<br/> Vonyigás</h1>

      <Switch
          defaultSelected={theme === 'dark'}
          size="lg"
          color="secondary"
          onChange={toggleDarkMode}
          thumbIcon={({ isSelected, className }) =>
            isSelected ? (
             null
            ) : (
             null
            )
          }
        >
          Dark mode
        </Switch>
    </div>

    
    <div className="flex-1 flex items-center justify-center">
      <div className="text-left max-w-xl">
        <h1 className="text-4xl font-bold font-display dark:text-gray-600  md:text-5xl">
          Welcome to My Portfolio
        </h1>
        <p className="text-xl mt-3">
          I am a developer with a passion for creating beautiful and functional web applications. Take a look around to see what I can do!
        </p>
      </div>
    </div>

    
    
    <div className="text-left">
      <p>Email: <a href="mailto:vonyitomi@gmail.com" className="text-blue-500">vonyitomi@gmail.com</a></p>
    </div>
  </div>
        <div className="w-full md:w-1/2 p-0">
    <div className="flex flex-wrap h-full">

    <HoverableCard 
          src="/images/poems.jpg"
          title="Poems"
          subtitle="Request a poem"
          onPress={() => router.push('/poems')}
        />


    <HoverableCard 
          src="/images/recipes.jpg"
          title="Recipes"
          subtitle="Our favorite recipes"
          onPress={() => router.push('/recipes')}
        />
    
    <HoverableCard 
          src="/images/chain.jpg"
          title="WEB3 dApp"
          subtitle="Disperse tokens"
          onPress={() => window.open('https://disperseappexo.vercel.app','_blank')}
        />
       
       <HoverableCard 
          src="/images/consultancy.jpg"
          title="Therapist"
          subtitle="WP site + webshop"
          onPress={() => window.open('http://www.teremtoero.eu', '_blank')}
        />
       


   
  </div>
     
    </div>
  </main>
</div> 

      </main>

      <footer>
        <p></p>
      </footer>

      
    </div>
  )
}
