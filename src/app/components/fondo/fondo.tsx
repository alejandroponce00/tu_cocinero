import Image from 'next/image'
 
export default function Fondo() {
  return (
    <Image
          alt="fondo"
          src={"/imagenes/cocinando.webp"}
          className="imagen blur-sm"
          // width={"560"}
          //height={"200"}
          fill={true}
        />
  )
}