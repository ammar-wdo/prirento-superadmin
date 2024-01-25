import React from 'react'

type Props = {
    title?:string
}

const NoResult = ({title}: Props) => {
  return (
    <p className='text-2xl font-semibold capitalize text-center text-muted-foreground'>{title ? title : "No result"}</p>
  )
}

export default NoResult