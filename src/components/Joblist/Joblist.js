import React, { useEffect, useState } from 'react'
import { Button, Card, Modal, Image } from 'semantic-ui-react'
import parse from 'html-react-parser'

const Joblist = () => {
  // if filter === true, set location in url
  const [jobList, setJobList] = useState([])

  const getJobs = async () => {
    await fetch(process.env.REACT_APP_LIST_URL, {
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
  }, [])

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
