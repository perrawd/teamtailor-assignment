/**
 * MyFavourites component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React from 'react'
import { List, Modal, Image } from 'semantic-ui-react'
import parse from 'html-react-parser'

/**
  * MyFavourites component.
  *
  * @param {Props<Array>} favourites Array of stored favourites.
  * @returns {React.ReactElement} MyFavourites component.
  */
const MyFavourites = ({ favourites }) => {
  return (
    <div>
      <List
        divided
        verticalAlign='middle'
        size='large'
        relaxed='very'
        style={{ textAlign: 'center' }}
      >
      { // List favourites.
        favourites && favourites.map((favourite, index) => (
            <List.Item key={index} as='a'>
              <Modal closeIcon trigger={
                <div>
                  <Image
                    avatar
                    src={favourite.attributes.picture.thumb}
                  />
                  {favourite.attributes.title}
                </div>}>
            <Modal.Header>
              <Image src={favourite.attributes.picture.thumb}
                size='medium'
                rounded
                floated='right'
              />
              {favourite.attributes.title}
              <p style={{ fontSize: '12px', fontweight: 'normal' }}>
                {favourite.attributes.pitch}
              </p>
            </Modal.Header>
            <Modal.Content scrolling>
              {parse(favourite.attributes.body)}
            </Modal.Content>
              </Modal>
            </List.Item>
        ))
      }
      </List>
    </div>
  )
}

export default MyFavourites
