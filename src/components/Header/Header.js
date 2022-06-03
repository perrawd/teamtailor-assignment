import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import LocationFilter from '../LocationFilter/LocationFilter.js'

// eslint-disable-next-line react/prop-types
const Header = ({ setFilter, locationID, setLocationID }) => {
  const [showFilter, setShowFilter] = useState(false)
  const handleClick = () => {
    setShowFilter(!showFilter)
  }

  return (
    <div>
      <h1>TeamTailor JobList 🚀</h1>
      <Button color='green'>List All Jobs</Button>
      <Button color='blue' onClick={handleClick}>Filter by Location</Button>
      { showFilter &&
        <LocationFilter
          setFilter={setFilter}
          locationID={locationID}
          setLocationID={setLocationID}/>
      }
    </div>
  )
}

export default Header
