import React from 'react';
import Head from 'next/head';
import clientPromise from '../lib/mongodb';
import {Card, CardHeader, CardBody, CardFooter, Image, Button,Spacer} from "@nextui-org/react";
import { useRouter } from 'next/router';

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
  const router = useRouter();
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
          <div className="text-center">
            <h1 className="text-4xl font-bold">
        What can I build for you?
      </h1>
      <p className="mt-3 text-xl">
        Check my projects
      </p>
      
      
    </div>
    <Spacer y={6} />
    <div className="text-center">
            <p>Tamás Vonyigás</p>
            <p><a href="mailto:vonyitomi@gmail.com">vonyitomi@gmail.com</a></p>
            <Spacer y={6} />
          </div>
        </div>
   
        <div className="w-full md:w-1/2 p-0">
    <div className="flex flex-wrap h-full">

      <Card className="w-1/2 h-1/2 " isPressable onPress={() => router.push('/poems')} radius="none">
      <CardHeader className="absolute z-10 bottom-1 flex-col !items-start">
        <p className="text-large text-white/60 uppercase font-bold">Poems</p>
        <h4 className="text-white font-medium text-large">Request random poem</h4>
      </CardHeader>
      <Image
      isFooterBlurred
      radius="none"
      isZoomed
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-cover"
        src="/images/poems.jpg"
      />

    </Card>
    
    <Card className="w-1/2 h-1/2" isPressable onPress={() => router.push('/recipes')}  radius="none">
      <CardHeader className="absolute z-10 bottom-1 flex-col !items-start">
        <p className="text-large text-white/60 uppercase font-bold">Recipes</p>
        <h4 className="text-white font-medium text-large">Our favorite recipes</h4>
      </CardHeader>
      <Image
      radius="none"
      isZoomed
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-cover"
        src="/images/recipes.jpg"
      />
    </Card>
    <Card className="w-1/2 h-1/2" isPressable onPress={() => window.open('https://disperseappexo.vercel.app', '_blank')}  radius="none">
      <CardHeader className="absolute z-10 bottom-1 flex-col !items-start">
        <p className="text-large text-white/60 uppercase font-bold">Disperse Dapp</p>
        <h4 className="text-white font-medium text-large">Disperse SAMA tokens</h4>
      </CardHeader>
      <Image
      radius="none"
      isZoomed
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-cover"
        src="/images/chain.jpg"
      />
    </Card>
    
    <Card className="w-1/2 h-1/2" isPressable onPress={() => window.open('http://www.teremtoero.eu', '_blank')}  radius="none">
      <CardHeader className="absolute z-10 bottom-1 flex-col !items-start">
        <p className="text-large text-black/60 uppercase font-bold">Therapist consultancy</p>
        <h4 className="text-black/90 font-large text-xl">Wordpress site with webshop</h4>
      </CardHeader>
      <Image
      
       isZoomed
        removeWrapper
        alt="Relaxing app background"
        className="z-0 w-full h-full object-cover"
        src="/images/consultancy.jpg"
      />
    </Card>
  
   
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
