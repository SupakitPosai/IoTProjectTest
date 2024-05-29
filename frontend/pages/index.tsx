import type { ReactElement } from 'react'
import type { NextPageWithLayout } from './_app'
import Layout from '@/components/Layout'
 
const Page: NextPageWithLayout = () => {
  return <p>IoT Management</p>
}
 
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
 
export default Page