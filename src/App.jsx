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
          </tbody>
      </table>
      <button>Add</button>
    </>
  )
}

export default App