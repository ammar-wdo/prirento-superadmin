'use client'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

type Props = {
    title:string,
    href:string,
    
} & React.HTMLProps<HTMLButtonElement>

const NavigatorButton = ({title,href,className}: Props) => {
    const router = useRouter()
  return (
    <Button className={className} onClick={()=>router.push(href)}>{title}</Button>
  )
}

export default NavigatorButton