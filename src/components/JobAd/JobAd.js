/**
 * JobAd component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React from 'react'
import { Button, Modal, Image, Icon } from 'semantic-ui-react'
import parse from 'html-react-parser'

/**
  * JobAd component.
  *
  * @param {object} job Job details object.
  * @param {React.setState<Array<object>>} setFavourites Set favourites state.
  * @returns {React.ReactElement} JobAd view component.
  */
const JobAd = ({ job, setFavourites }) => {
  return (
    <Modal trigger={
      <Button
        size='tiny'
        basic
        color='green'
        style={{ marginTop: '10px' }}
        >Show more
      </Button>} closeIcon>
    <Modal.Header>
      <Image src={job.attributes.picture.thumb} size='medium' rounded floated='right'/>
      {job.attributes.title}
      <p style={{ fontSize: '12px', fontweight: 'normal' }}>{job.attributes.pitch}</p>
    </Modal.Header>
    <Modal.Content scrolling>
      {parse(job.attributes.body)}
    </Modal.Content>
      <Modal.Actions>
      <Button
        onClick={() => setFavourites(prevFavs => [...prevFavs, job])}
        color='green'
      >
    <Icon name='like' color='red'/>Add to my favourites</Button>
    </Modal.Actions>
    </Modal>
  )
}

export default JobAd
