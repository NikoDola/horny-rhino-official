"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function Counting() {
  const [timeLeft, setTimeLeft] = useState<null | {
    days: number
    hours: number
    minutes: number
    seconds: number
  }>(null)

  useEffect(() => {
    const getTimeLeft = () => {
      const targetDate = new Date("2025-05-25T00:00:00")
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

      const seconds = Math.floor((difference / 1000) % 60)
      const minutes = Math.floor((difference / 1000 / 60) % 60)
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))

      return { days, hours, minutes, seconds }
    }

    const update = () => setTimeLeft(getTimeLeft())
    update() // run once on mount

    const timer = setInterval(update, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!timeLeft) return null  // avoids rendering before hydration is ready

  return (
    <div className="text-black absolute top-0 w-full mx-auto text-center flex flex-col items-center justify-center space-y-1 p-4">
      <h2 className="text-xl">Opening In: 5/25/2025</h2>
      <h2 className="mt-4">Days Left</h2>
      <div className="flex space-x-4 text-lg">
        <span className="text-5xl">{timeLeft.days}d</span>
        <span className="text-5xl">{timeLeft.hours}h</span>
        <span className="text-5xl">{timeLeft.minutes}m</span>
        <span className="text-5xl">{timeLeft.seconds}s</span>
      </div>
      <Image
        src="/branding/logo_text_white-bg.svg"
        width={200}
        height={200}
        alt="logo"
      />
    </div>
  )
}
