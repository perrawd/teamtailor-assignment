import React, { useState } from 'react'
import { Container } from 'semantic-ui-react'
import Header from './components/Header/Header.js'
import Joblist from './components/Joblist/Joblist.js'

const App = () => {
  // if location === true, set location in url
  const [filter, setFilter] = useState(null)
  const [locationID, setLocationID] = useState([])

  return (
    <div className="App">
      <Container text>
        <Header
          setFilter={setFilter}
          locationID={locationID}
          setLocationID={setLocationID}
        />
        <Joblist filter={filter} locationID={locationID}/>
      </Container>
    </div>
  )
}

export default App
