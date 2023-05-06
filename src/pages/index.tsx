import Feed from '@/components/Feed'
import Header from '@/components/Header'
import Login from '@/components/Login'
import Sidebar from '@/components/Sidebar'
import Widgets from '@/components/Widgets'
import { getSession, useSession } from 'next-auth/react'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession()
  if (!session){
    return <Login />
  } 
  
  return (
    <div className='h-screen bg-gray-100 overflow-hidden'>
      <Head>
        <title>Facebook</title>
      </Head>

      <Header />

      <main className='flex'>
        <Sidebar />
        <Feed />
        <Widgets />
      </main>
    </div>
  )
}


// export async function getServerSideProps(context: any){
//   const session = await getSession(context)
//   // const { data: session } = useSession(context)

//   return { 
//     props: {
//       session
//     }
//   }
// }
