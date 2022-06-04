/**
 * Joblist component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React, { useEffect, useState } from 'react'
import { Button, Card, Modal, Image, Icon, Message, Transition } from 'semantic-ui-react'
import parse from 'html-react-parser'
import MyFavourites from '../MyFavourites/MyFavourites.js'

/**
  * Joblist component.
  * Fetch and list job ads from API.
  * View specific ad with additional information in a modal.
  *
  * @param {boolean} filter Filter state.
  * @param {string} locationID Location ID state.
  * @param {React.setState<Array<object>>} setFavourites Set favourites state.
  * @returns {React.ReactElement} Fetch and list job ads from API.
  */
const Joblist = ({ filter, locationID, setFavourites }) => {
  const [jobList, setJobList] = useState([])
  const [next, setNext] = useState(null)
  const [fetchError, setFetchError] = useState(false)

  let url = process.env.REACT_APP_LIST_URL

  const getJobs = async (url) => {
    /* If a filter is applied, clear the list. */
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
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        } else {
          return response.json()
        }
      })
      .then(data => {
        /* If data fetch is paged, append the results else set the data to state. */
        next
          ? setJobList(prevJobs => [...prevJobs, ...data.data])
          : setJobList([...data.data])
        /* If API call contains a next page, set next page to state. */
        'next' in data.links
          ? setNext(data.links.next)
          : setNext(null)
      })
      .catch(error => {
        /* Set error state. */
        setFetchError(error.message)
        console.error(error)
      })
  }

  /* Fetch data. */
  useEffect(() => {
    /* If filter state is true, set parameters for filter. */
    if (filter && !!locationID) url = url + `${process.env.REACT_APP_FILTER_STRING}${locationID}`
    getJobs(url)
  }, [filter, locationID])

  return (
    /* Show error message if error when fetching data occured. */
    fetchError
      ? <Message negative>
            <Message.Header>An Error occured when fetching the data.</Message.Header>
            <p>{`Error message: ${fetchError}`}</p>
          </Message>
      : <div>
      <MyFavourites/>
      {/* List ads with title and pitch. */}
      { jobList.length > 0
        ? jobList.map(job =>
        <Card key={job.id} fluid>
          <Card.Content>
            <Card.Header>
              {job.attributes.title}
            </Card.Header>
            <Card.Description>
              {job.attributes.pitch}
            </Card.Description>
            {/* Specific ad view additional information. */}
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
        )
        : <Transition transitionOnMount={true} animation='fade' duration={5000}>
            <Message
              icon='suitcase'
              header='No jobs found!'
              content='No jobs was found for this query.'
            />
          </Transition>
        }
      {/* If additional API pages are available, show button to fetch. */}
      {next && <Button onClick={() => getJobs(next)}>More jobs</Button>}
    </div>)
}

export default Joblist
