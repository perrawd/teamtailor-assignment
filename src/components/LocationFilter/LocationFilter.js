import React from 'react'
import { Dropdown } from 'semantic-ui-react'

// eslint-disable-next-line react/prop-types
const LocationFilter = ({ setFilter, locations, setLocations }) => {
  let pages = true
  let url = process.env.REACT_APP_LOCATION_URL

  const handleClick = async () => {
    // eslint-disable-next-line react/prop-types
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
          console.log(locations)
        })
    }
  }

  return (
    <div>
      <Dropdown
        placeholder='Select Location'
        selection
        // eslint-disable-next-line react/prop-types
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
