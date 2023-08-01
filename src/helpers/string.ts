export function extractPokemonIdFromUrl(url: string) {
    return new URL(url).pathname.split('/').at(-2) ?? ''
}

export function getPokemonImageSprite(pokemonId: string) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
    // return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
}