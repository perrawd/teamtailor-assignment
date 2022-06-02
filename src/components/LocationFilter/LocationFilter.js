import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'

const LocationFilter = () => {
  const [locations, setLocations] = useState([])

  const handleClick = () => {
    fetch(process.env.REACT_APP_LOCATION_URL, {
      headers: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        Authorization: process.env.REACT_APP_TOKEN,
        'X-Api-Version': process.env.REACT_APP_API_VERSION
      }
    })
      .then(res => res.json())
      .then(data => setLocations([...data.data]))
  }

  return (
    <div>
      <Dropdown
        placeholder='Select Location'
        selection
        options={locations.map(location => ({
          key: location.attributes.city,
          text: location.attributes.city,
          value: location.attributes.city
        }))}
        onClick={handleClick}
      />
    </div>
  )
}

export default LocationFilter
