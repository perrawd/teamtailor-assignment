import React, { useState } from 'react'
import { Dropdown, Button } from 'semantic-ui-react'

const LocationFilter = ({ setFilter, setLocationID, setShowFilter }) => {
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
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText)
          } else {
            return response.json()
          }
        })
        .then(data => {
          setLocations(prevState => [...prevState, ...data.data])
          !('next' in data.links)
            ? pages = false
            : url = data.links.next
        })
        .catch(error => {
          pages = false
          setLocations([
            {
              id: null,
              attributes: {
                name: `Error fetching values: ${error.message}`,
                value: error.message
              }
            }
          ])
          console.error(error)
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
          text: location.attributes.name || location.attributes.city,
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
          setShowFilter(false)
        }
      }>
        Clear filter
      </Button>
    </div>
  )
}

export default LocationFilter
