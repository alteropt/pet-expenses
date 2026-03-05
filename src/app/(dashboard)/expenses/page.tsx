import AddTransactionModalOpenButton from '@/components/AddTransactionModalOpenButton'
import TransactionsList from '@/components/TransactionsList'
import Container from '@/components/UI/Container'
import { getUserId } from '@/lib/getUserId'
import prisma from '@/lib/prisma'

const ExpensesPage = async () => {
	const userId = await getUserId()
	if (!userId) throw new Error('User not found')

	const transactions = await prisma.transaction.findMany({
		where: {
			userId: userId,
		},
		orderBy: { date: 'desc' },
	})

	return (
		<Container>
			<div className='bg-white rounded-xl shadow-md px-6 py-4'>
				<div className='flex justify-between items-center mb-2'>
					<h2 className='font-medium text-xl'>All Transactions</h2>
					<AddTransactionModalOpenButton />
				</div>
				<TransactionsList transactions={transactions} />
			</div>
		</Container>
	)
}

export default ExpensesPage
