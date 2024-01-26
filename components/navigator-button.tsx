'use client'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

type Props = {
    title:string,
    href:string,
    
} & React.HTMLProps<HTMLButtonElement>

const NaviatorButton = ({title,href,...props}: Props) => {
    const router = useRouter()
  return (
    <Button onClick={()=>router.push(href)}>{title}</Button>
  )
}

export default NaviatorButton