import React, { useState } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import LocationFilter from '../LocationFilter/LocationFilter.js'
import MyFavourites from '../MyFavourites/MyFavourites.js'

// eslint-disable-next-line react/prop-types
const Header = ({ setFilter, locationID, setLocationID, favourites }) => {
  const [open, setOpen] = React.useState(false)
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
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button>Show Modal</Button>}
      >
      <Modal.Header>My Favourites</Modal.Header>
      <Modal.Content>
        <MyFavourites favourites={favourites}/>
      </Modal.Content>
      </Modal>
    </div>
  )
}

export default Header
