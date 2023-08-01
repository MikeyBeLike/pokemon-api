import { POKEMON_API_BASE_URL } from '@/config/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const url = new URL(POKEMON_API_BASE_URL + '/pokemon/' + params.id)

    try {
        const response = await fetch(url)
        const data = await response.json()

        if (!response.ok) {
            return NextResponse.json({ data }, { status: 400 })
        }

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}
