'use client'

import { useMounted } from '@/hooks/use-mounted'
import { useWeb3Modal } from '@web3modal/react'
import { useAccount, useDisconnect } from 'wagmi'

export default function Web3Btn() {
    const { isConnected } = useAccount()

    const { open } = useWeb3Modal()
    const { disconnect } = useDisconnect()

    const mounted = useMounted()
    if (!mounted) return

    const text = isConnected ? 'Disconnect' : 'Connect Wallet'

    function onClick() {
        if (isConnected) {
            disconnect()
        } else {
            open()
        }
    }

    return <button onClick={onClick}>{text}</button>
}