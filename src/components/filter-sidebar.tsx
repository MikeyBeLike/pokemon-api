"use client"

import { POKEMON_API_BASE_URL } from "@/config/api";
import { extractPokemonIdFromUrl } from "@/helpers/string";
import { useDebounce } from "@/hooks/use-debounce";
import { useMounted } from '@/hooks/use-mounted';
import { NamedPokemonApiResource } from "@/interfaces/pokemon-api";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface PokemonFilterApiResponse {
    results: NamedPokemonApiResource[]
}

interface PokemonFilter {
    id: number
    name: string
}

async function getPokemonColors() {
    const res = await fetch(POKEMON_API_BASE_URL + '/pokemon-color', { next: { revalidate: 3600 } })
    return res.json()
}

async function getPokemonHabitat() {
    const res = await fetch(POKEMON_API_BASE_URL + '/pokemon-habitat', { next: { revalidate: 3600 } })
    return res.json()
}

function mapResultsToFilter(result: NamedPokemonApiResource): PokemonFilter {
    return {
        id: Number(extractPokemonIdFromUrl(result.url)),
        name: result.name
    }
}

export default function FilterSidebar() {
    const [searchValue, setSearchValue] = useState('')

    const [sortMethod, setSelectedSortMethod] = useState('')

    const [selectedColorId, setSelectedColorId] = useState(0)
    const [pokemonColors, setPokemonColors] = useState<PokemonFilter[]>()

    const [selectedHabitatId, setSelectedHabitatId] = useState<number>(0)
    const [pokemonHabitats, setPokemonHabitats] = useState<PokemonFilter[]>()

    const debouncedSearchTerm = useDebounce(searchValue);
    const router = useRouter()
    const mounted = useMounted()

    const defaultSearchValue = useSearchParams().get('searchValue') || ''

    useEffect(() => {
        const fetchData = async () => {
            const pokemonColorsData = await getPokemonColors()
            const pokemonHabitatData = await getPokemonHabitat()

            const [pokemonColorsResponse, pokemonHabitatResponse] = await Promise.all<PokemonFilterApiResponse[]>([pokemonColorsData, pokemonHabitatData])

            setPokemonColors(pokemonColorsResponse.results.map(c => mapResultsToFilter(c)))
            setPokemonHabitats(pokemonHabitatResponse.results.map(h => mapResultsToFilter(h)))
        }
        fetchData()

    }, [])

    useEffect(() => {
        if (!mounted) return

        const url = new URL(location.href)

        if (debouncedSearchTerm) {
            url.searchParams.set('searchValue', debouncedSearchTerm)
        } else {
            url.searchParams.delete('searchValue')
        }
        url.searchParams.delete('page')
        router.replace(url.href)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm])

    function handleSortMethodChange(value: string) {
        setSelectedSortMethod(value)
        const url = new URL(location.href)
        if (value) {
            url.searchParams.set('sortMethod', value)
        } else {
            url.searchParams.delete('sortMethod')
        }
        router.replace(url.href)
    }

    function handleColorChange(id: number) {
        setSelectedColorId(id)
        const url = new URL(location.href)
        url.searchParams.set('colorFilter', id.toString())
        url.searchParams.delete('page')
        router.replace(url.href)
    }

    function handleHabitatChange(id: number) {
        setSelectedHabitatId(id)
        const url = new URL(location.href)
        url.searchParams.set('habitatFilter', id.toString())
        url.searchParams.delete('page')
        router.replace(url.href)
    }

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-600">Search</h2>

            <div className="form-control w-full max-w-xs mb-4">
                <label htmlFor="search-by" className="label">
                    <span className="label-text">Search for a Pokémon</span>
                </label>
                <input id="search-by" type="search" defaultValue={defaultSearchValue} onInput={e => setSearchValue((e.target as HTMLInputElement).value)} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>

            <h2 className="text-xl font-semibold text-gray-600">Filters</h2>

            <div className="form-control w-full max-w-xs mb-5">
                <label htmlFor="sort-by" className="label">
                    <span className="label-text">Sort by:</span>
                </label>
                <select id="sort-by" className="select select-bordered" value={sortMethod} onChange={e => handleSortMethodChange(e.target.value)}>
                    <option value="">Default</option>
                    <option value="name">Name</option>
                    <option value="weight:asc">Weight (asc)</option>
                    <option value="weight:desc">Weight (desc)</option>
                    <option value="height:asc">Height (asc)</option>
                    <option value="height:desc">Height (desc)</option>
                </select>
            </div>

            {pokemonColors?.length && (
                <fieldset>
                    <h3>Filter by Color</h3>
                    <div className="max-h-40 overflow-scroll mb-4">
                        <div className="form-control">
                            <label htmlFor="color-default" className="label cursor-pointer">
                                <span className="label-text capitalize">Default</span>
                                <input
                                    type="radio"
                                    id="color-default"
                                    name="color-default"
                                    className="radio checked:bg-primary"
                                    value="default"
                                    checked={selectedColorId === 0}
                                    onChange={() => handleColorChange(0)}
                                />
                            </label>
                        </div>
                        {pokemonColors?.map(color => (
                            <div className="form-control" key={color.id}>
                                <label htmlFor={`color-${color.id}`} className="label cursor-pointer">
                                    <span className="label-text capitalize">{color.name}</span>
                                    <input
                                        type="radio"
                                        id={`color-${color.id}`}
                                        name={`color-${color.id}`}
                                        className="radio checked:bg-primary"
                                        value={color.id}
                                        checked={selectedColorId === color.id}
                                        onChange={() => handleColorChange(color.id)}
                                    />
                                </label>
                            </div>
                        ))}
                    </div>
                </fieldset>
            )}

            {pokemonHabitats?.length && (
                <fieldset>
                    <h3>Filter by Habitat</h3>
                    <div className="max-h-40 overflow-scroll">
                        <div className="form-control">
                            <label htmlFor="habitat-default" className="label cursor-pointer">
                                <span className="label-text capitalize">Default</span>
                                <input
                                    type="radio"
                                    id="habitat-default"
                                    name="habitat-default"
                                    className="radio checked:bg-primary"
                                    value="default"
                                    checked={selectedHabitatId === 0}
                                    onChange={() => handleHabitatChange(0)}
                                />
                            </label>
                        </div>
                        {pokemonHabitats?.map(habitat => (
                            <div className="form-control" key={habitat.id}>
                                <label htmlFor={`habitat-${habitat.id}`} className="label cursor-pointer">
                                    <span className="label-text capitalize">{habitat.name}</span>
                                    <input
                                        type="radio"
                                        id={`habitat-${habitat.id}`}
                                        name={`habitat-${habitat.id}`}
                                        className="radio checked:bg-primary"
                                        value={habitat.id}
                                        checked={selectedHabitatId === habitat.id}
                                        onChange={() => handleHabitatChange(habitat.id)}
                                    />
                                </label>
                            </div>
                        ))}
                    </div>
                </fieldset>
            )}

        </div>
    )
}