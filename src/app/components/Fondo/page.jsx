import Image from 'next/image'
 
export default function Fondo() {
  return (
    <Image
      src="/imagenes/cocinando.webp"
      width={500}
      height={500}
      alt="Picture of the author"
    />
  )
}