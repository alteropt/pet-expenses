import BalanceCard from '@/components/UI/BalanceCard/BalanceCard'
import Button from '@/components/UI/Button'
import Container from '@/components/UI/Container'
import Transaction from '@/components/UI/Transaction/Transaction'
import { HEADER_HEIGHT } from '@/config/styles-constants.config'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

export default async function Home() {
	const session = await getServerSession(authOptions)
	if (!session)
		return (
			<Container
				className='flex justify-center flex-col items-center gap-4'
				style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
			>
				<h2 className='font-bold text-4xl text-red-400 text-center'>
					To see this page you <br /> must be logged in!
				</h2>
				<Link href='/login'>
					<Button>Log In</Button>
				</Link>
			</Container>
		)

	return (
		<Container>
			<section className='flex gap-6 mt-10 '>
				<BalanceCard variant='total' className='flex-1' amount={19207} />
				<BalanceCard variant='income' className='flex-1' amount={0.0} />
				<BalanceCard variant='expense' className='flex-1' amount={0.0} />
			</section>
			<Transaction />
		</Container>
	)
}
