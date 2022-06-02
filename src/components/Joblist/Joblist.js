import React, { useEffect, useState } from 'react'
import { Card } from 'semantic-ui-react'

const Joblist = () => {
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
        </Card.Content>
      </Card>
      )
      }
    </div>
  )
}

export default Joblist
