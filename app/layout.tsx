import './globals.css'
import { Roboto } from 'next/font/google'
import { TopNav } from '@/components/top-nav'
import { SideNav } from '@/components/side-nav'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Invoice System',
  description: 'Modern invoice management system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="min-h-screen flex flex-col">
          <div className="fixed top-0 left-0 right-0 z-50">
            <TopNav />
          </div>
          <div className="flex flex-1 pt-14">
            <div className="fixed left-0 top-14 bottom-0">
              <SideNav />
            </div>
            <main className="flex-1 ml-[80px] bg-gray-50">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
