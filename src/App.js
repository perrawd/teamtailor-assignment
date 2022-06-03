import React, { useState } from 'react'
import { Container } from 'semantic-ui-react'
import Header from './components/Header/Header.js'
import Joblist from './components/Joblist/Joblist.js'

const App = () => {
  // if location === true, set location in url
  const [filter, setFilter] = useState(null)
  const [locationID, setLocationID] = useState([])
  const [favourites, setFavourites] = useState([])

  return (
    <div className="App">
      <Container text>
        <Header
          setFilter={setFilter}
          locationID={locationID}
          setLocationID={setLocationID}
          favourites={favourites}
        />
        <Joblist filter={filter} locationID={locationID} setFavourites={setFavourites}/>
      </Container>
    </div>
  )
}

export default App
