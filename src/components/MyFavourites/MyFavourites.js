import React, { useState } from 'react'
import { List, Modal, Image } from 'semantic-ui-react'
import parse from 'html-react-parser'

// eslint-disable-next-line react/prop-types
const MyFavourites = ({ favourites }) => {
  // eslint-disable-next-line no-unused-vars
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <div>
      <List divided verticalAlign='middle' size='large' relaxed='very'>
      {
        // eslint-disable-next-line react/prop-types
        favourites
          // eslint-disable-next-line react/prop-types
          ? favourites.map((favourite, index) => (
            <List.Item key={index}>
              <Modal trigger={<div><Image avatar src={favourite.attributes.picture.thumb} />{favourite.attributes.title}</div>}>
            <Modal.Header>
              <Image src={favourite.attributes.picture.thumb} size='medium' rounded floated='right'/>
              {favourite.attributes.title}
              <p style={{ fontSize: '12px', fontweight: 'normal' }}>{favourite.attributes.pitch}</p>
            </Modal.Header>
            <Modal.Content scrolling>
              {parse(favourite.attributes.body)}
            </Modal.Content>
              </Modal>
            </List.Item>
          ))
          : console.log('nothing here')
      }
      </List>
    </div>
  )
}

export default MyFavourites
