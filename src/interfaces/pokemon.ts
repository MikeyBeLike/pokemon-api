export interface PokemonApiResponse {
    results: PokemonSearchResults[]
    count: number
    page: number
    totalPages: number
}

export interface PokemonSearchResults {
    id: number
    name: string
    weight: number
    height: number
    color: IdName
    habitat: IdName | null
    types: IdName[]
    image: string
}

interface IdName {
    id: number
    name: string
}