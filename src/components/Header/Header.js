import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import LocationFilter from '../LocationFilter/LocationFilter.js'

const Header = () => {
  const [showFilter, setShowFilter] = useState(false)
  const handleClick = () => {
    setShowFilter(!showFilter)
  }

  return (
    <div>
      <h1>TeamTailor JobList 🚀</h1>
      <Button color='green'>List All Jobs</Button>
      <Button color='blue' onClick={handleClick}>Filter</Button>
      { showFilter && <LocationFilter/>}
    </div>
  )
}

export default Header
