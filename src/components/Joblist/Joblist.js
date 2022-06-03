import React, { useEffect, useState } from 'react'
import { Button, Card, Modal, Image, Icon } from 'semantic-ui-react'
import parse from 'html-react-parser'
import MyFavourites from '../MyFavourites/MyFavourites.js'

// eslint-disable-next-line react/prop-types
const Joblist = ({ filter, locationID, setFavourites }) => {
  const [jobList, setJobList] = useState([])

  let url = process.env.REACT_APP_LIST_URL
  // eslint-disable-next-line react/prop-types
  // if (filter && locationID.length > 0) url = url + `?filter[locations]=${locationID}`

  const getJobs = async () => {
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
      .then(data => setJobList([...data.data]))
  }

  useEffect(() => {
    if (filter === true) {
      // eslint-disable-next-line react/prop-types
      url = url + `?filter[locations]=${locationID}`
    }
    getJobs()
  }, [filter, locationID])

  // eslint-disable-next-line no-unused-vars
  const addFavourite = (event, element) => {
    console.log(event.target.parentElement)
    setFavourites(prevFavs => [...prevFavs, event.target.parentElement.outerHTML])
  }

  return (
    <div>
      <MyFavourites/>
      { jobList.map(job =>
        <Card key={job.id} fluid>
          <Card.Content>
            <Card.Header>
              {job.attributes.title}
            </Card.Header>
            <Card.Description>
              {job.attributes.pitch}
            </Card.Description>
            <Modal trigger={<Button
              size='tiny'
              basic
              color='green'
              style={{ marginTop: '10px' }}
              >Show more</Button>} closeIcon>
            <Modal.Header>
              <Image src={job.attributes.picture.thumb} size='medium' rounded floated='right'/>
              {job.attributes.title}
              <p style={{ fontSize: '12px', fontweight: 'normal' }}>{job.attributes.pitch}</p>
            </Modal.Header>
            <Modal.Content scrolling>
              {parse(job.attributes.body)}
            </Modal.Content>
              <Modal.Actions>
              <Button onClick={() => setFavourites(prevFavs => [...prevFavs, job])} color='green'>
            <Icon name='like' color='red'/>Add to my favourites</Button>
            </Modal.Actions>
            </Modal>
          </Card.Content>
        </Card>
      )}
    </div>
  )
}

export default Joblist
