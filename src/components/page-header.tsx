import Link from "next/link";
import ThemeChange from "./theme-change";
import Web3Btn from "./web3-button";

export function PageHeader() {
    return (
        <div className="navbar bg-base-100">
            <div className="container m-auto">
                <div className="flex-1">
                    <Link href="/" className="btn btn-ghost normal-case text-xl">Pokémon NextJS</Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link href="/pokemon">Pokémon</Link></li>
                        <li><Web3Btn /></li>
                        <li><ThemeChange /></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}