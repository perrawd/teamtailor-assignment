import React from 'react'
import { Button } from 'semantic-ui-react'

const Header = () => {
  return (
    <div>
      <h1>TeamTailor JobList 🚀</h1>
      <Button color='green'>List All Jobs</Button>
      <Button color='blue' onClick={console.log('show filter')}>Filter</Button>
    </div>
  )
}

export default Header
