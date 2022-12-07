import React, { useEffect, useState } from "react"

function generateRandomColor(){
  const maxVal = 0xFFFFFF;
  let randomNumber = Math.random() * maxVal; 
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  const randColor = randomNumber.padStart(6, 0);   
  return `#${randColor.toUpperCase()}`
}

const App = ({}) => {
  const [search, setSearch] = useState('')
  const [count, setCount] = useState(0)
  const [color, setColor] = useState('')
  const [cidades, setCidades] = useState([])
  const [cidadesAll, setCidadesAll] = useState([])

  const id = 'id_teste'

  useEffect(() => {
    async function getCidades() {
      const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')
      let cidades = await response.json()
      setCidadesAll([...cidades, ...cidades, ...cidades, ...cidades])
    }
    
    getCidades()
  }, [])

  function handleClick() {
    setColor(generateRandomColor())
  }

  function handleIncrement() {
    setCount(count + 1)
  }

  function handleSearch(value) {
    setSearch(value)
    const cidades = cidadesAll
      .sort(function (a, b) {
        return a.nome > b.nome ? 1 : -1
      })
      .filter((item) => item.nome.toLowerCase().includes(value.toLowerCase()))
    setCidades(cidades)
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '10px'
      }}>
        <div style={{ display: 'flex', flexDirection:'column' }}>
          <label htmlFor={id}>Termo de pesquisa</label>
          <input 
            id={id}
            type="text" 
            value={search} 
            onChange={(e) => handleSearch(e.target.value)}
            style={{
              color
            }}
          />
        </div>
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
      <h1 style={{ margin: '10px 0', textAlign: 'center' }}>Cidades Filtradas</h1>
      <div style={{ padding: '20px', border: '2px solid red', margin: '20px' }}>
        <ul>
          {cidades.map((item, index) => <li key={item.id + `alpha${index}`}>{item.nome}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default App
