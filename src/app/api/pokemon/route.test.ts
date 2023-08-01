import { PokemonApiResponse } from '@/interfaces/pokemon'
import { NextRequest } from 'next/server'
import { GET } from './route'

it('should respond with a default paginated result of the dataset ', async () => {
    const req = new NextRequest('http://testing.com')
    const response = await GET(req)
    const responseData: PokemonApiResponse = await response.json()

    expect(responseData.count).toBe(1281)
    expect(responseData.page).toBe(1)
    expect(responseData.totalPages).toBe(86)

    const charmander = responseData.results[3]

    expect(charmander).toBeDefined()

    if (charmander) {
        expect(charmander.color).toEqual({ id: 8, name: 'red' })
        expect(charmander.habitat).toEqual({ id: 4, name: 'mountain' })
        expect(charmander.height).toBe(6)
        expect(charmander.id).toBe(4)
        expect(charmander.image).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png')
        expect(charmander.name).toBe('charmander')
        expect(charmander.types).toEqual([{ id: 10, name: 'fire' }])
        expect(charmander.weight).toBe(85)
    }
})

it('should filter pokemon based off a partial search value', async () => {
    const req = new NextRequest('http://testing.com?searchValue=magik')
    const response = await GET(req)
    const responseData: PokemonApiResponse = await response.json()

    expect(responseData.count).toBe(1)
    expect(responseData.page).toBe(1)
    expect(responseData.totalPages).toBe(1)

    const magikarp = responseData.results[0]

    expect(magikarp).toBeDefined()

    if (magikarp) {
        expect(magikarp.color.name).toEqual('red')
        expect(magikarp.id).toBe(129)
        expect(magikarp.name).toBe('magikarp')
        expect(magikarp.types).toEqual([{ id: 11, name: 'water' }])
    }
})

it('should filter pokemon based off their color', async () => {
    const req = new NextRequest('http://testing.com?colorFilter=10')
    const response = await GET(req)
    const responseData: PokemonApiResponse = await response.json()

    expect(responseData.count).toBe(127)
    expect(responseData.page).toBe(1)
    expect(responseData.totalPages).toBe(9)

    const pikachu = responseData.results[2]

    expect(pikachu).toBeDefined()

    if (pikachu) {
        expect(pikachu.color).toEqual({ id: 10, name: 'yellow' })
        expect(pikachu.id).toBe(25)
        expect(pikachu.name).toBe('pikachu')
        expect(pikachu.types).toEqual([{ id: 13, name: 'electric' }])
    }
})

it('should filter pokemon based off their habitat', async () => {
    const req = new NextRequest('http://testing.com?habitatFilter=7')
    const response = await GET(req)
    const responseData: PokemonApiResponse = await response.json()

    expect(responseData.count).toBe(45)
    expect(responseData.page).toBe(1)
    expect(responseData.totalPages).toBe(3)

    const tentacool = responseData.results[0]

    expect(tentacool).toBeDefined()

    if (tentacool) {
        expect(tentacool.color).toEqual({ id: 2, name: 'blue' })
        expect(tentacool.id).toBe(72)
        expect(tentacool.name).toBe('tentacool')
        expect(tentacool.types).toEqual([{ id: 11, name: 'water' }, { id: 4, name: 'poison' }])
    }
})

it('should sort pokemon based off their height', async () => {
    const req = new NextRequest('http://testing.com?sortMethod=height%3Adesc')
    const response = await GET(req)
    const responseData: PokemonApiResponse = await response.json()

    const meowthGmax = responseData.results[6]

    expect(meowthGmax).toBeDefined()

    if (meowthGmax) {
        // eslint-disable-next-line unicorn/numeric-separators-style
        expect(meowthGmax.id).toBe(10200)
        expect(meowthGmax.name).toBe('meowth-gmax')
    }
})

it('should sort, filter & search for pokemon', async () => {
    const req = new NextRequest('http://testing.com?searchValue=tle&colorFilter=2&page=1&habitatFilter=9&sortMethod=weight%3Adesc')
    const response = await GET(req)
    const responseData: PokemonApiResponse = await response.json()

    expect(responseData.count).toBe(2)
    expect(responseData.results.length).toBe(2)

    const squirtle = responseData.results[1]
    const wartortle = responseData.results[0]

    expect(squirtle).toBeDefined()
    expect(wartortle).toBeDefined()
})