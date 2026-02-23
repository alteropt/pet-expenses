import '@/app/globals.css'
import Header from '@/components/Header'
import type { Metadata } from 'next'

import { Inter } from 'next/font/google'

export const metadata: Metadata = {
	title: 'Expenses Tracker',
	description: 'Track your expenses and income.',
}

const inter = Inter({
	subsets: ['latin'],
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className={inter.className}>
			<body className='bg-(--background)'>
				<Header />
				{children}
			</body>
		</html>
	)
}
