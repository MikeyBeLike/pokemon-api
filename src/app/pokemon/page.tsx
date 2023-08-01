import Pagination from "@/components/pagination";
import PokemonCards from "@/components/pokemon-cards";
import { PokemonSearchResults } from "@/interfaces/pokemon";
import { Suspense } from "react";
import Loading from "./loading";

const pageSize = 15

async function getData(params: Record<string, string>) {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pokemon`)
  url.searchParams.set('pageSize', pageSize.toString())

  for (let [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  return response.json()
}

export default async function PokemonPage(
  { searchParams }: { searchParams: { page: string; searchValue: string; colorFilter: string; habitatFilter: string; sortMethod: string } }
) {
  const page = searchParams.page ?? '1'
  const searchValue = searchParams.searchValue ?? ''
  const sortMethod = searchParams.sortMethod ?? ''
  const colorFilter = searchParams.colorFilter ?? ''
  const habitatFilter = searchParams.habitatFilter ?? ''

  const requestParams = {
    page,
    searchValue,
    colorFilter,
    habitatFilter,
    sortMethod
  }

  const { count: totalResults, results: pokemon }: { count: number, results: PokemonSearchResults[] } = await getData(requestParams)

  if (!totalResults) return (
    <div>There are no results for this search criteria</div>
  )

  return (
    <>

      <div className="flex py-4 justify-center flex-col items-center">
        <Pagination currentPage={Number(page)} resultsPerPage={pageSize} totalResults={totalResults} urlBase="/pokemon" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Suspense fallback={<Loading />}>
          <PokemonCards pokemonCards={pokemon} />
        </Suspense>
      </div>

      <div className="flex py-4 justify-center flex-col items-center">
        <Pagination currentPage={Number(page)} resultsPerPage={pageSize} totalResults={totalResults} urlBase="/pokemon" />
      </div>

    </>
  )
}
