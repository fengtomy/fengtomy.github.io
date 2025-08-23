import { useEffect, useState } from "react"

export const useCSSColorScheme = () => {
  const [isLightMode, setIsLightMode] = useState( window.matchMedia('(prefers-color-scheme: light)').matches)

  useEffect(() => {
    const handleColorSchemeChange = (event: MediaQueryListEvent) => {
      console.log(event)
      setIsLightMode(!!event.matches)
    }

    const lightModeMediaQuery = window.matchMedia('(prefers-color-scheme: light)')

    lightModeMediaQuery.addEventListener('change', handleColorSchemeChange);

    return () => {
      lightModeMediaQuery.removeEventListener('change', handleColorSchemeChange)
    }
  }, [])

  return { light: isLightMode, dark: !isLightMode }
}