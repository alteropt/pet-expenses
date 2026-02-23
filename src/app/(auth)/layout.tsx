import '@/app/globals.css'
import type { Metadata } from 'next'

import { Inter } from 'next/font/google'

export const metadata: Metadata = {
	title: 'Expenses Tracker',
	description: 'Track your expenses and income.',
}

const inter = Inter({
	subsets: ['latin'],
})

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className={inter.className}>
			<body className='bg-[#E6EDFF]'>
				<div className='p-4'>
					<div className='mx-auto h-full w-2/5 flex flex-col items-center bg-white p-8 rounded-2xl'>
						{children}
					</div>
				</div>
			</body>
		</html>
	)
}
