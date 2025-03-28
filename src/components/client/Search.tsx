"use client"

import { useState } from "react"

export default function Search() {
  const [search, setSearch] = useState("")
  const lista = ['Domat', 'piperka']
  const [findItem, setFindItem] = useState("")

  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)

    const finding = lista.find((item) =>
      item.toLowerCase().startsWith(value.toLowerCase())
    )

    setFindItem(finding || "")


  }

  return (
    <>
      <input onInput={handleSearch} type="search" placeholder="search" />
      {search && <p>{findItem}</p>}
      {!findItem && search && <p> Could not find {search}</p>}
    </>
  )
}
