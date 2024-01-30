import React from 'react'

type Props = {
    children:React.ReactNode,
    title:string
}

const FormSectionsWrapper = ({children,title}: Props) => {
  return (
    <div className='border rounded-md p-8 bg-white'>
<h3 className='text-2xl font-semibold capitalize'>{title}</h3>
<div className='mt-6'>
    {children}
</div>
    </div>
  )
}

export default FormSectionsWrapper