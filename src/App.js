/**
 * App component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React, { useState } from 'react'
import { Container } from 'semantic-ui-react'
import Header from './components/Header/Header.js'
import Joblist from './components/Joblist/Joblist.js'
import Footer from './components/Footer/Footer.js'

/**
  * App component.
  * @returns {React.ReactElement} App element.
  */
const App = () => {
  const [filter, setFilter] = useState(false)
  const [locationID, setLocationID] = useState(null)
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
        <Joblist
          filter={filter}
          locationID={locationID}
          setFavourites={setFavourites}
        />
      </Container>
      <Footer/>
    </div>
  )
}

export default App
