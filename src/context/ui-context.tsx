"use client"
import { useContext, createContext, useState, useEffect, ReactNode } from "react"
import Loading from "@/components/general/Login"

interface UiContextType {
  wW: number | undefined;
  hH: number | undefined;
}

const UiContext = createContext<UiContextType | undefined>(undefined)

export function UiProvider({ children }: { children: ReactNode }) {
  const [wW, setWw] = useState<number | undefined>(undefined)
  const [hH, sethH] = useState<number | undefined>(undefined)

  useEffect(() => {
    const handleResize = () => {
      setWw(window.innerWidth)
      sethH(window.innerHeight)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (wW === undefined || hH === undefined) {
    return <Loading />
  }

  return <UiContext.Provider value={{ wW, hH }}>{children}</UiContext.Provider>
}

export function useUi() {
  const context = useContext(UiContext)
  if (!context) {
    throw new Error("useUi must be used within a UiProvider component")
  }
  return context
}
