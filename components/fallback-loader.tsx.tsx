import Image from 'next/image'
import React from 'react'

type Props = {
    title?:string
}

const FallbackLoader = ({title}: Props) => {
  return (
    <div className='min-h-[300px] flex items-center justify-center bg-white rounded-md border'>
        <div>
        <div className="w-52 h-52 relative ">
          <Image fill alt="loader" src={"/loader-logo.png"} />
        </div>
        <h3 className="text-center text-xl font-medium -mt-12 text-muted-foreground">{title || 'Loading'}</h3>
      </div>
    </div>
  )
}

export default FallbackLoader