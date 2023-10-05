import clientPromise from "../lib/mongodb";
import {Button} from '@nextui-org/react'
import {Pagination} from "@nextui-org/react";

export default function Movies({ movies }) {
    return (
        <div>
            <Pagination total={10} initialPage={1} />

            <Button>test

            </Button>
            <h1>A random movie from the list of all movies</h1>
            <p>
                <small>(According to Metacritic)</small>
            </p>
            <ul>
                {movies.map((movie) => (
                    <li>
                        <h2>{movie.title}</h2>
                        <h3>{movie.metacritic}</h3>
                        <p>{movie.plot}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("sample_mflix");

        const movies = await db
            .collection("movies")
            .aggregate(
                [ { $sample: { size: 1 } } ]
             )
            .toArray();

        return {
            props: { movies: JSON.parse(JSON.stringify(movies)) },
        };
    } catch (e) {
        console.error(e);
    }
}