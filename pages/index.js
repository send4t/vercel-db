import React from 'react';
import Head from 'next/head';
import clientPromise from '../lib/mongodb';
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";

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
  return (
    <div className=" ">
      <Head>
        <title>Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>



      <main>

     
      <div className="min-h-screen flex flex-col items-center justify-center">
  <Head>
    <title>Portfolio</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>

  <main className="flex flex-col md:flex-row w-full justify-center items-stretch">
        <div className="w-full md:w-1/2 flex flex-col justify-between p-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold">
        What can I build for you?
      </h1>
      <p className="mt-3 text-xl">
        Check my projects
      </p>
    </div>
    <div className="text-center">
            <p>Tamás Vonyigás</p>
            <p><a href="mailto:vonyitomi@gmail.com">vonyitomi@gmail.com</a></p>
          </div>
        </div>
   
    <div className="w-full md:w-1/2 flex flex-wrap justify-center items-start gap-4 p-4">
      <a href="/poems" className="p-4 border rounded-lg text-left hover:bg-gray-100">
        <h3 className="text-2xl font-bold">Poems &rarr;</h3>
        <p className="mt-2 text-lg">Request a poem for yourself</p>
      </a>

      <a href="/recipes" className="p-4 border rounded-lg text-left hover:bg-gray-100">
        <h3 className="text-2xl font-bold">Recipes &rarr;</h3>
        <p className="mt-2 text-lg">Our favorite recipes</p>
      </a>

      <a href="https://disperseappexo.vercel.app" className="p-4 border rounded-lg text-left hover:bg-gray-100">
        <h3 className="text-2xl font-bold">Disperse App &rarr;</h3>
        <p className="mt-2 text-lg">Distribute SAMA and ERC20 tokens</p>
      </a>

      <a href="https://teremtoero.eu" target="_blank" rel="noopener noreferrer" className="p-4 border rounded-lg text-left hover:bg-gray-100">
        <h3 className="text-2xl font-bold">Therapist consultancy &rarr;</h3>
        <p className="mt-2 text-lg">
          Wordpress consultancy site with webshop
        </p>
      </a>
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
