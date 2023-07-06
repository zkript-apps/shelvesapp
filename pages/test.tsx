import React from 'react'

export async function getServerSideProps({ req }: any) {
  const forwarded = req.headers["X-Forwarded-For"]
  return {
    props: {
      ip: forwarded,
    },
  }
}

const Test = ({ ip }: any) => {
  return (
    <div>test: {ip}</div>
  )
}

export default Test