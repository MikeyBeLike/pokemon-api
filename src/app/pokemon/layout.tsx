import FilterSidebar from "@/components/filter-sidebar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <div className="container flex">
        <aside className="w-full lg:w-1/4 px-6">
          <FilterSidebar />
        </aside>
        <main className="w-full lg:w-3/4 px-6">
          {children}
        </main>
      </div>
    </div>
  )
}
