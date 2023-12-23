'use client'
import { FC, useState } from 'react'
import LogIn from './components/login/LogIn'
import SignIn from './components/signin/SignIn'

const Authentication: FC = () => {
  const [Active, SetActive] = useState<boolean>()
  return (
    <>
      {
        Active ? <LogIn Active={Active} SetActive={SetActive}/> : <SignIn Active={Active} SetActive={SetActive}/>
      }
    </>
  )
}

export default Authentication