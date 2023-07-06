import { headers } from 'next/headers'
 
export default function Page() {
  const headersList = headers()
  const real = headersList.get('x-real-ip')
  const forwarded = headersList.get('x-forwarded-for')
  const ip = headersList.get('ip')
  const connection = headersList.get('connection')
 
  return (
    <>
    <div>real: {real}</div>
    <div>forwarded: {forwarded}</div>
    <div>ip: {ip}</div>
    <div>connection: {connection}</div>
    </>
  )
}