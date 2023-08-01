import { POKEMON_API_BASE_URL } from '@/config/api';
import { extractPokemonIdFromUrl, getPokemonImageSprite } from '@/helpers/string';
import { NamedPokemonApiResource, PokemonSearchResultsApi } from '@/interfaces/pokemon-api';
import { NextRequest, NextResponse } from 'next/server';

const API_RESULT_LIMIT = 1281 // could maybe move to env var

export async function GET(request: NextRequest) {
    const url = new URL(POKEMON_API_BASE_URL + '/pokemon')
    url.searchParams.set('limit', API_RESULT_LIMIT.toString())

    const searchValue = request.nextUrl.searchParams.get('searchValue') ?? '';
    const pageSize = Number(request.nextUrl.searchParams.get('pageSize')) || 20;
    const page = Number(request.nextUrl.searchParams.get('page')) || 1;

    const colorFilter = request.nextUrl.searchParams.get('colorFilter')
    const habitatFilter = request.nextUrl.searchParams.get('habitatFilter')

    let colorPokemonIds: string[] = []
    if (colorFilter) {
        colorPokemonIds = await getPokemonIdsByFilterResource('color', colorFilter)
    }

    try {
        const response = await fetch(url)
        const data = await response.json()

        if (!response.ok) {
            return NextResponse.json({ data }, { status: 400 })
        }

        const results: PokemonSearchResultsApi[] = data.results
        let filteredResults = results
            .filter(pokemon => pokemon.name.includes(searchValue.toLowerCase()))
            .map(pokemon => {
                const id = extractPokemonIdFromUrl(pokemon.url)
                return {
                    ...pokemon,
                    id,
                    image: getPokemonImageSprite(id)
                }
            })


        if (colorFilter) {
            filteredResults = filteredResults.filter(pokemon => colorPokemonIds.includes(pokemon.id))
        }

        const count = filteredResults.length;
        const totalPages = Math.ceil(count / pageSize);
        const paginatedResults = filteredResults.slice((page - 1) * pageSize, page * pageSize);

        return NextResponse.json({ ...data, results: paginatedResults, count, page, totalPages })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

type ValidFilterResource = 'color' | 'habitat'

async function getPokemonIdsByFilterResource(resource: ValidFilterResource, id: string) {
    const url = new URL(`${POKEMON_API_BASE_URL}/pokemon-${resource}/${id}`)

    try {
        const response = await fetch(url)
        const data: {
            pokemon_species: NamedPokemonApiResource[]
        } = await response.json()

        if (!response.ok) return []

        return data.pokemon_species.map(p => extractPokemonIdFromUrl(p.url))
    } catch {
        return []
    }
}