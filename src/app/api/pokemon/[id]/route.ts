import { PokemonSearchResults } from '@/interfaces/pokemon';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    try {
        const filePath = path.join(process.cwd(), 'public', 'data', 'pokemon.json')
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const allPokemonData: PokemonSearchResults[] = JSON.parse(fileContent)

        const foundPokemon = allPokemonData.find(p => p.id === Number(params.id))

        if (!foundPokemon) {
            return NextResponse.json('Not found', { status: 404 })
        }

        return NextResponse.json(foundPokemon)
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}
