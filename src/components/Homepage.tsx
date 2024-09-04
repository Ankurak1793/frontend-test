"use client"
import { columns } from "./dataTable/columns";
import { DataTable } from "./dataTable/data-table";
import { useState } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface PokemonDetails {
    name: string;
    image: string;
    types: string;
  }
  
  interface Pokemon {
    name: string;
    url: string;
  }
  
  export default function HomePage() {
    const [offset, setOffset] = useState(0);
    const limit = 5;
  
    // Function to fetch Pokémon list with additional details
    const fetchPokemonList = async (): Promise<PokemonDetails[]> => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon list");
      }
  
      const data = await response.json();
  
      // Fetch details for each Pokémon
      const detailedData = await Promise.all(
        data.results.map(async (pokemon: Pokemon) => {
          console.log("pokemon",pokemon)
          const details = await fetchPokemonDetails(pokemon.url);
          return details;
        })
      );
      return detailedData;
    };
  
    // Function to fetch individual Pokémon details
    const fetchPokemonDetails = async (url: string): Promise<PokemonDetails> => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon details");
      }
      const data = await response.json();
      return {
        name: data.name,
        image: data.sprites.front_default,
        types: data.types.map((typeInfo: any) => typeInfo.type.name).join(", "),
      };
    };
  
    const {
      data: pokemonData,
      error,
      isLoading,
      isFetching,
    }: UseQueryResult<PokemonDetails[], Error> = useQuery({
      queryKey: ["pokemonList", offset],
      queryFn: fetchPokemonList,
      staleTime: 5 * 1000, // Cache for 5 seconds
    });
  
    const handleNextPage = () => {
      setOffset((prevOffset) => prevOffset + limit);
    };
  
    const handlePreviousPage = () => {
      setOffset((prevOffset) => Math.max(0, prevOffset - limit));
    };
  
    return (
      <main className="flex min-h-screen flex-col items-center justify-center m-10 bg-stone-100 border rounded-md">
        {error && <div className="mb-4 text-red-600">{error.message}</div>}
        <DataTable
          columns={columns}
          data={pokemonData || []}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          disablePrev={offset === 0}
          isLoading={isLoading || isFetching}
        />
      </main>
    );
  }