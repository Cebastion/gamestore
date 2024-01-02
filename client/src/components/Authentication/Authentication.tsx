'use client'
import { FC, useState } from 'react'
import LogIn from './components/login/LogIn'
import SignIn from './components/signin/SignIn'
import { IUserActive } from '@/interface/UserActive.interface'

const Authentication: FC<IUserActive> = ({SetUserActive}) => {
  const [Active, SetActive] = useState<boolean>(false)
  return (
    <>
      {
        Active ? <LogIn Active={Active} SetUserActive={SetUserActive} SetActive={SetActive}/> : <SignIn Active={Active} SetUserActive={SetUserActive} SetActive={SetActive}/>
      }
    </>
  )
}

export default Authentication