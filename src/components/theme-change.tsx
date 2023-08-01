'use client'

import { useState } from 'react'

export default function ThemeChange() {
    const [isDark, setIsDark] = useState(true)

    const handleThemeChange = () => {
        setIsDark(!isDark)
        document.documentElement.dataset.theme = isDark ? 'light' : 'dark'
    }

    return <button onClick={handleThemeChange}>{isDark ? '🌞' : '🌚'}</button>
}