import React, { useEffect, useState } from 'react'
import { Button, Card, Modal, Image } from 'semantic-ui-react'
import parse from 'html-react-parser'

// eslint-disable-next-line react/prop-types
const Joblist = ({ locationID }) => {
  const [jobList, setJobList] = useState([])
  let url = process.env.REACT_APP_LIST_URL
  // eslint-disable-next-line react/prop-types
  if (locationID.length > 0) url = url + `?filter[locations]=${locationID}`

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
    getJobs()
  }, [locationID])

  console.log(jobList)

  return (
    <div>
      { jobList.map(job =>
        <Card key={job.id} fluid>
          <Card.Content>
            <Card.Header>
              {job.attributes.title}
            </Card.Header>
            <Card.Description>
              {job.attributes.pitch}
            </Card.Description>
            <Modal
              trigger={<Button>Show Modal</Button>}
            >
            <Modal.Header>
              <Image src={job.attributes.picture.thumb} size='medium' rounded floated='right'/>
              {job.attributes.title}
            </Modal.Header>
            <Modal.Content>
              {parse(job.attributes.body)}
            </Modal.Content>
              <Modal.Actions actions={[{ key: 'done', content: 'Done', positive: true }]}/>
            </Modal>
          </Card.Content>
        </Card>
      )}
    </div>
  )
}

export default Joblist
