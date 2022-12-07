import React, { useState, useRef, useTransition, useMemo } from "react"
import Input from './components/Input'
import useListaCidades from './hooks/useListaCidades'

const App = ({}) => {
  const [search, setSearch] = useState('')
  const [count, setCount] = useState(0)
  const [cidades, setCidades] = useState([])
  const { cidadesAll, listCidades } = useListaCidades(cidades)
  const refInput = useRef(null)
  const [isPending, startTransition] = useTransition()

  function handleClick() {
    if(refInput.current) {
      refInput.current.changeColor()
    }
  }

  function handleIncrement() {
    setCount(count + 1)
  }

  function handleSearch(value) {
    setSearch(value)
    startTransition(() => {
      const cidades = cidadesAll
      .sort(function (a, b) {
        return a.nome > b.nome ? 1 : -1
      })
      .filter((item) => item.nome.toLowerCase().includes(value.toLowerCase()))
      setCidades(cidades)
    })
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '10px'
      }}>
        <Input value={search} onChange={e => handleSearch(e.target.value)} ref={refInput}/>
        <div>
          <h2>Count: {count}</h2>
        </div>
        <div style={{
          display: 'flex',
          gap: '10px'
        }}>
          <button type="button" onClick={handleClick} style={{ padding: '10px' }}>Mudar Cor</button>
          <button type="button" onClick={handleIncrement} style={{ padding: '10px' }}>Incrementar</button>
        </div>
      </div>
      {isPending && <div>Carregando</div>}
      <h1 style={{ margin: '10px 0', textAlign: 'center' }}>Cidades Filtradas</h1>
      <div style={{ padding: '20px', border: '2px solid red', margin: '20px' }}>
        {listCidades}
      </div>
    </div>
  )
}

export default App
