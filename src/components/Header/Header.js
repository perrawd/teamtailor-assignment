import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import LocationFilter from '../LocationFilter/LocationFilter.js'

// eslint-disable-next-line react/prop-types
const Header = ({ setFilter, locations, setLocations }) => {
  const [showFilter, setShowFilter] = useState(false)
  const handleClick = () => {
    setShowFilter(!showFilter)
  }

  return (
    <div>
      <h1>TeamTailor JobList 🚀</h1>
      <Button color='green'>List All Jobs</Button>
      <Button color='blue' onClick={handleClick}>Filter</Button>
      { showFilter &&
        <LocationFilter
          setFilter={setFilter}
          locations={locations}
          setLocations={setLocations}/>
      }
    </div>
  )
}

export default Header
