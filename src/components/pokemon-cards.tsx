import { PokemonSearchResults } from "@/interfaces/pokemon";
import Image from "next/image";

export default function PokemonCards({ pokemonCards }: { pokemonCards: PokemonSearchResults[] }) {
    return pokemonCards.map(pokemon => (
        <div className="card card-compact w-full bg-base-100 shadow-xl" key={pokemon.id}>
            <figure>
                <Image
                    className="card-side"
                    src={pokemon.image}
                    width={100}
                    height={100}
                    alt={pokemon.name}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title capitalize self-center">{pokemon.name}</h2>
                <p>Weight: {pokemon.weight.toLocaleString()}, Height: {pokemon.height}</p>
                <p>Color: {pokemon.color.name}</p>
                {pokemon.habitat && <p>Habitat: {pokemon.habitat.name}</p>}
                {pokemon.types.length > 0 && (<p>Type(s): {pokemon.types.map(type => type.name).join(', ')}</p>)}
            </div>
        </div>
    ))

}