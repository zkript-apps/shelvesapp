import React from 'react'

export async function getServerSideProps({ req }: any) {
  const forwarded = req.headers["x-forwarded-for"]
  const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
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