/**
 * Header component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React, { useState } from 'react'
import { Button, Modal, Icon, Image, Message } from 'semantic-ui-react'
import LocationFilter from '../LocationFilter/LocationFilter.js'
import MyFavourites from '../MyFavourites/MyFavourites.js'

/**
  * LocationFilter component.
  *
  * @param {React.setState<boolean>} setFilter Set filter state.
  * @param {React.setState<string>} setLocationID Set location ID state.
  * @param {Array<object>} favourites Set showFilter state.
  * @returns {React.ReactElement} Header element and MyFavourites component.
  */
const Header = ({ setFilter, setLocationID, favourites }) => {
  const [open, setOpen] = React.useState(false)
  const [showFilter, setShowFilter] = useState(false)

  /**
  * handleClick method.
  * @returns {void} Set showFilter state.
  */
  const handleClick = () => {
    setShowFilter(!showFilter)
  }

  return (
    <div>
      <Image src='./teamtailor-logo.png' size='tiny' floated='left'/>
      <h3>Joblist Assignment 🚀</h3>
      {/* MyFavourites component */}
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Button color='green'>
            <Icon name='like' color='red'/>
            My Favourites
          </Button>}
      >
      <Modal.Header style={{ textAlign: 'center' }}>My Favourites</Modal.Header>
      <Modal.Content>
        {favourites.length > 0
          ? <MyFavourites favourites={favourites}/>
          : <Message
              icon='inbox'
              header='No favourites yet!'
              content='You have not added any ads to your favourites yet!'
          />
        }
      </Modal.Content>
      </Modal>
      {/* Filter component */}
      <Button color='blue' onClick={handleClick}>Filter by Location</Button>
      { showFilter &&
        <LocationFilter
          setFilter={setFilter}
          setShowFilter={setShowFilter}
          setLocationID={setLocationID}/>
      }
    </div>
  )
}

export default Header
