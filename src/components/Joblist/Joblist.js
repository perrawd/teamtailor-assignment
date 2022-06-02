import React, { useEffect, useState } from 'react'

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
    </div>
  )
}

export default Joblist
