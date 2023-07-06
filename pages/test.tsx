import React from 'react'

export async function getServerSideProps({ req }: any) {
  const forwarded = req.headers["X-Real-IP"]
  const ip = forwarded ? forwarded : req.connection.remoteAddress
  return {
    props: {
      ip,
    },
  }
}

const Test = ({ ip }: any) => {
  return (
    <div>test: {ip}</div>
  )
}

export default Test