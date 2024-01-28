import { Inter } from 'next/font/google'
import './globals.css'
import Head from 'next/head'
import Sidebar from '@/components/Sidebar'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'อัพโหลด',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <link rel="icon" href='/favicon.ico' />
      </Head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
