import React, { useState } from 'react'
import { Dropdown, Button } from 'semantic-ui-react'

const LocationFilter = ({ setFilter, setLocationID }) => {
  const [locations, setLocations] = useState([])
  let pages = true
  let url = process.env.REACT_APP_LOCATION_URL

  const handleClick = async () => {
    if (locations.length > 0) return

    while (pages) {
      await fetch(url, {
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
        .then(data => {
          setLocations(prevState => [...prevState, ...data.data])
          !('next' in data.links)
            ? pages = false
            : url = data.links.next
        })
    }
  }

  const handleChange = async (event, element) => {
    setLocationID(element.value)
    setFilter(true)
  }

  return (
    <div>
      <Dropdown
        placeholder='Select Location'
        selection
        options={locations.map(location => ({
          key: location.attributes.city,
          text: location.attributes.city,
          value: location.id
        }))}
        onClick={handleClick}
        onChange={handleChange}
        style={{ marginTop: '10px' }}
      />
      <Button
        basic
        color='blue'
        style={{ margin: '5px' }}
        onClick={() => {
          setFilter(false)
        }
      }>
        Clear filter
      </Button>
    </div>
  )
}

export default LocationFilter
