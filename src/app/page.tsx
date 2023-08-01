import Link from "next/link";

export default function Home() {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold mb-8">Pokémon + NextJS</h1>
          <article className="text-left">

            <h5 className="text-2xl">Stack</h5>
            <ul className="list-disc mb-5">
              <li><a href="https://nextjs.org/" target="_blank" className="link">NextJS</a> 13.4 w/ App Router</li>
              <li><a href="https://www.typescriptlang.org/" target="_blank" className="link">Typescript</a></li>
              <li><a href="https://tailwindcss.com/" target="_blank" className="link">TailwindCSS</a> w/ <a href="https://daisyui.com/" target="_blank" className="link">DaisyUI</a></li>
              <li>Web3: WalletConnect, Wagmi</li>
              <li>ESLint: <a href="https://nextjs.org/docs/app/building-your-application/configuring/eslint" target="_blank" className="link">eslint next plugin</a> & <a href="https://github.com/sindresorhus/eslint-plugin-unicorn" target="_blank" className="link">eslint unicorn plugin</a></li>
            </ul>

            <h5 className="text-2xl">Description</h5>
            <p className="mb-5">
              This app allows a user to list all Pokémon in a grid based format, it offers the features of pagination, filtering against certain traits, searching for specific Pokemon & also sorting by some specific traits.
            </p>

            <h5 className="text-2xl">Challenges</h5>
            <p className="mb-5">
              The main challenge was finding a public API, that already had sorting, searching, filtering & pagination built in - which also did not have rate limiting restrictions in place.
            </p>

            <p className="mb-5">
              Because of this challenge I had to find an API that had the data I needed and had it freely available and build my own abstraction of the API I required for the task. Luckily the Pokemon API is freely available on Github, but unfortunately the data is not relational (found out the long way).
            </p>
            <p className="mb-5">
              Essentially I had to write a script that would allow me to fetch all of the related relevant data and stitch it together into a .json file. <a className="underline" href="https://gist.github.com/MikeyBeLike/6e43dc7b074eb84733cb59aae9fb4958" target="_blank">This code can be found here</a>.
            </p>

          </article>

          <Link href="/pokemon" className="btn btn-primary">View Pokémon</Link>
        </div>
      </div>
    </div>
  )
}
