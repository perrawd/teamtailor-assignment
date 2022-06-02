import React from 'react'
import { Select } from 'semantic-ui-react'

const LocationFilter = () => {
  const locations = [
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
    { key: 'al', value: 'al', text: 'Albania' },
    { key: 'dz', value: 'dz', text: 'Algeria' }
  ]

  return (
    <div>
      <Select options={locations} placeholder="Select location"/>
    </div>
  )
}

export default LocationFilter
