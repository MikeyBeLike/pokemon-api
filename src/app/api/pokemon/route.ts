import { PokemonApiResponse, PokemonSearchResults } from '@/interfaces/pokemon';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

export async function GET(request: NextRequest) {
    const searchValue = request.nextUrl.searchParams.get('searchValue') ?? ''
    const sortMethod = request.nextUrl.searchParams.get('sortMethod') ?? ''
    const pageSize = Number(request.nextUrl.searchParams.get('pageSize')) || 15
    const page = Number(request.nextUrl.searchParams.get('page')) || 1

    const colorFilter = Number(request.nextUrl.searchParams.get('colorFilter')) || 0
    const habitatFilter = Number(request.nextUrl.searchParams.get('habitatFilter')) || 0

    try {
        const filePath = path.join(process.cwd(), 'public', 'data', 'pokemon.json');
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const allPokemonData: PokemonSearchResults[] = JSON.parse(fileContent);

        let filteredResults = allPokemonData.filter(pokemon => pokemon.name.includes(searchValue.toLowerCase()))

        if (colorFilter) {
            filteredResults = filteredResults.filter(pokemon => pokemon.color.id === colorFilter)
        }

        if (habitatFilter) {
            filteredResults = filteredResults.filter(pokemon => pokemon.habitat?.id === habitatFilter)
        }

        if (sortMethod) {
            filteredResults.sort((a, b) => {
                switch (sortMethod) {
                    case 'name': {
                        return a.name.localeCompare(b.name)
                    }
                    case 'weight:asc': {
                        return a.weight - b.weight
                    }
                    case 'weight:desc': {
                        return b.weight - a.weight
                    }
                    case 'height:asc': {
                        return a.height - b.height
                    }
                    case 'height:desc': {
                        return b.height - a.height
                    }
                    default: {
                        return 0
                    }
                }
            })
        }

        const count = filteredResults.length;
        const totalPages = Math.ceil(count / pageSize);
        const paginatedResults = filteredResults.slice((page - 1) * pageSize, page * pageSize);

        const apiResponse: PokemonApiResponse = { results: paginatedResults, count, page, totalPages }

        return NextResponse.json(apiResponse)
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}
