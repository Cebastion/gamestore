import RootLayout from './layout'
import Header from '@/components/Header'
import Main from '@/components/Main'

export default function Home() {
  return (
    <RootLayout>
      <Header />
      <Main/>
    </RootLayout>
  )
}
