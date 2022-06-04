import React, { useEffect, useState } from 'react'
import { Button, Card, Modal, Image, Icon } from 'semantic-ui-react'
import parse from 'html-react-parser'
import MyFavourites from '../MyFavourites/MyFavourites.js'

const Joblist = ({ filter, locationID, setFavourites }) => {
  const [jobList, setJobList] = useState([])
  const [next, setNext] = useState(null)

  let url = process.env.REACT_APP_LIST_URL

  const getJobs = async (url) => {
    // If a filter is applied, clear the list.
    filter && setJobList([])

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
        next
          ? setJobList(prevJobs => [...prevJobs, ...data.data])
          : setJobList([...data.data])
        'next' in data.links
          ? setNext(data.links.next)
          : setNext(null)
      })
  }

  useEffect(() => {
    if (filter && !!locationID) url = url + `?filter[locations]=${locationID}`
    getJobs(url)
  }, [filter, locationID])

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
          </Card.Content>
        </Card>
      )}
      {next && <Button onClick={() => getJobs(next)}>More jobs</Button>}
    </div>
  )
}

export default Joblist
