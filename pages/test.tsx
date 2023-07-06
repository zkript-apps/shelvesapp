import React from 'react'

export async function getServerSideProps({ req }: any) {
  return {
    props: {
      ip: req.headers,
    },
  }
}

const Test = ({ ip }: any) => {
  return (
    <div>test: {ip}</div>
  )
}

export default Test