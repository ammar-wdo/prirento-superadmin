'use client'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

type Props = {
    title:string,
    href:string,
    
} & React.HtmlHTMLAttributes<HTMLButtonElement>

const NavigatorButton = ({title,href,className,children}: Props) => {
    const router = useRouter()
  return (
    <Button className={className} onClick={()=>router.push(href)}>{title || children}</Button>
  )
}

export default NavigatorButton