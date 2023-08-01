"use client"

import { useMounted } from "@/hooks/use-mounted"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface PaginationProps {
    totalResults: number
    resultsPerPage: number
    currentPage: number
    urlBase: string
}

export default function Pagination({ totalResults, resultsPerPage, currentPage, urlBase }: PaginationProps) {
    const mounted = useMounted()
    const searchParams = useSearchParams()

    if (!mounted) return

    const totalPages = Math.ceil(totalResults / resultsPerPage)

    const startPage = Math.max(currentPage - 2, 1)
    const endPage = Math.min(startPage + 4, totalPages)

    const origin = window.location.origin

    const getURLWithPage = (page: number) => {
        const url = new URL(urlBase, origin)
        url.searchParams.append('page', page.toString())
        for (const [key, value] of searchParams.entries()) {
            if (key !== 'page' && key !== 'pageSize' && typeof value === 'string') {
                url.searchParams.append(key, value.toString())
            }
        }
        return url.toString()
    }

    const prevUrl = getURLWithPage(Math.max(1, currentPage - 1))
    const nextUrl = getURLWithPage(Math.min(totalPages, currentPage + 1))

    return (
        <>
            <div className="join">
                <Link href={prevUrl} className={`join-item btn ${currentPage === 1 ? 'btn-disabled' : ''}`}>
                    Previous
                </Link>
                {[...Array.from({ length: endPage - startPage + 1 }).keys()].map((_, index) => {
                    const page = startPage + index
                    const url = getURLWithPage(page)
                    return (
                        <Link key={index} href={url} className={`join-item btn ${currentPage === page ? 'btn-disabled' : ''}`}>
                            {page}
                        </Link>)
                })}
                <Link href={nextUrl} className={`join-item btn ${currentPage === totalPages ? 'btn-disabled' : ''}`}>
                    Next
                </Link>
            </div>
            <div className="w-full text-right">Total Results: {totalResults.toLocaleString()}</div>
        </>
    )
}
