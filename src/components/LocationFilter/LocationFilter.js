/**
 * LocationFilter component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React, { useState } from 'react'
import { Dropdown, Button } from 'semantic-ui-react'

/**
  * LocationFilter component.
  *
  * @param {React.setState<boolean>} setFilter Set filter state.
  * @param {React.setState<string>} setLocationID Set location ID state.
  * @param {React.setState<boolean>} setShowFilter Set showFilter state.
  * @returns {React.ReactElement} Location filter drop-down menu.
  */
const LocationFilter = ({ setFilter, setLocationID, setShowFilter }) => {
  const [locations, setLocations] = useState([])

  let pages = true
  let url = process.env.REACT_APP_LOCATION_URL

  const handleClick = async () => {
    if (locations.length > 0) return

    /* Pagination, while there are pages available, fetch results from every page. */
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
          /* Append results to list. */
          setLocations(prevState => [...prevState, ...data.data])
          /* Verify if there are more pages. */
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

  /* Set location state when user selects a location. */
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
