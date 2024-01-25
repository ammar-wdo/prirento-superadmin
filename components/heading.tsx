import React from 'react'

type Props = {
    title:string,
    description:string
}

const Heading = ({title,description}: Props) => {
  return (
    <div className='flex flex-col gap-2'>
        <h3 className='text-3xl font-bold capitalize'>{title}</h3>
        <p className='text-sm font-medium text-muted-foreground capitalize'>{description}</p>
    </div>
  )
}

export default Heading