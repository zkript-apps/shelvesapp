import Image from 'next/image'

export default function Public() {
  return (
    <main className="flex justify-center">
      <Image
        src="/1024x5008.2.png"
        alt="Shelves Logo"
        width={1024}
        height={5008}
        priority
      />
    </main>
  )
}