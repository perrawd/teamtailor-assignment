import React from 'react'

const Footer = () => {
  return (
    <div style={
      {
        height: '100px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        <li>Per Rawdin x Teamtailor</li>
        <li>Joblist Assignment</li>
        <li>2022</li>
      </ul>
    </div>
  )
}

export default Footer
