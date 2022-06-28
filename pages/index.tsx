import { FormEvent, useCallback, useState } from "react"
import { SearchResults } from "../components/SearchResults";

type Results = {
  id: number,
  title: string,
  price: number,
  priceFormatted: string
}

export default function Home() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<Results[]>([])

  const addToWishList = useCallback(async (id: number) => {
    console.log(id)
  }, [])

  async function handleSearch(e: FormEvent) {
    e.preventDefault()

    if (!search.trim()) {
      return;
    }

    const formatter = new Intl.NumberFormat("pt-BR", { style: 'currency', currency: 'BRL' })

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json()

    const products: Results[] = data.map((product: Results) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price)
      }
    })

    setResults(products)
  }

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </form>

      {
        results.length > 0 ?
          (
            <SearchResults results={results} onAddToWishList={addToWishList} />
          ) : <p>Sem resultados</p>
      }
    </div>
  )
}
