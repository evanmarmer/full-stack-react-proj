import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Row from './Row.jsx'

function App() {
  const [speciesData, setSpeciesData] = useState([])

  useEffect(() => {
    axios.get('/species')
    .then((response) => {
        setSpeciesData(response.data)
    })
}, [])

const [isMakingNewRow, setIsMakingNewRow] = useState(false)
const [speciesInput, setSpeciesInput] = useState('')

function onAddClickHandler() {
    setIsMakingNewRow(true)
}

function onSaveClickHandler() {
  let maBod = {
      species: speciesInput,
  }
  axios.post('/species', maBod)
  .then((response) => {
      setSpeciesData(response.data)
      setIsMakingNewRow(false)
      setSpeciesInput('')
  })
}


  return (
    <>
      <header>Lifetime Species Harvest</header>
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Species</th>
            <th>Harvest-Count</th>
          </tr>
        </thead>
        <tbody>
          { speciesData.map((speciesObj) => {
              return <Row
                  species={speciesObj.species}
                  harvested={speciesObj.harvested}
                  setSpeciesData={setSpeciesData}
                />
               })
          }
          { isMakingNewRow && 
            <tr>
              <td>
                <button onClick={onSaveClickHandler}>Save</button>
              </td>
              <td>
                Species:
                <input type={"text"} value={speciesInput} onChange={(e) => setSpeciesInput(e.target.value)}/>
              </td>
            </tr>

          }

        </tbody>
      </table>
      <button onClick={onAddClickHandler} >Add Species</button>
    </>
  )
}

export default App