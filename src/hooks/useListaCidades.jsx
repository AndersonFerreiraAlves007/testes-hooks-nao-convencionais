import { useState, useMemo, useEffect } from 'react'


function useListaCidades(cidades) {
  const [cidadesAll, setCidadesAll] = useState([])

  useEffect(() => {
    async function getCidades() {
      const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')
      let cidades = await response.json()
      setCidadesAll([...cidades, ...cidades, ...cidades, ...cidades])
    }
    
    getCidades()
  }, [])

  const listCidades = useMemo(() => {
    return (
      <ul>
        {cidades.map((item, index) => <li key={item.id + `alpha${index}`}>{item.nome}</li>)}
      </ul>
    )
  }, [cidades])

  return {
    cidadesAll,
    listCidades
  }
}

export default useListaCidades