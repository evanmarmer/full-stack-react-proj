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
const [harvestedInput, setHarvestedInput] = useState('')

function onAddClickHandler() {
    setIsMakingNewRow(true)
}

function onSaveClickHandler() {
  let maBod = {
      harvested: harvestedInput,
  }

  axios.post('/job', maBod)
  .then((response) => {
      setTableData(response.data)
      setIsMakingNewRow(false)
      setHarvestedInput('')
  })

  return (
    <>
      <header>Lifetime Species Harvest</header>
      <table>
        <thead>
          <tr>
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
                          <td>Species
                            <input></input>
                          </td>
                          <td>Harvest-Count
                            <input></input>
                          </td>
                      </tr>

                    }

          </tbody>
      </table>
      <button onClick={onAddClickHandler} >Add</button>
    </>
  )
}

export default App