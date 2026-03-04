import AddTransactionModalOpenButton from '@/components/AddTransactionModalOpenButton'
import Container from '@/components/UI/Container'
import Transaction from '@/components/UI/Transaction/Transaction'
import { TRANSACTION_CATEGORIES } from '@/constants/transaction-categories.constants'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'

const ExpensesPage = async () => {
	const session = await getServerSession(authOptions)
	const userId = session?.user?.id

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
				{transactions.length === 0 && (
					<div className='h-70 flex items-center justify-center flex-col gap-2'>
						<h3 className='text-3xl opacity-70'>No Transactions Found</h3>
						<h5 className='opacity-70 text-md'>
							Add Your First Transaction To Get Started
						</h5>
					</div>
				)}
				{transactions.length > 0 && (
					<div className='flex flex-col gap-2'>
						{transactions.map(transaction => {
							return (
								<Transaction
									key={transaction.id}
									data={{
										...transaction,
										category:
											transaction.category as (typeof TRANSACTION_CATEGORIES)[number],
										amount:
											transaction.type === 'EXPENSE'
												? -transaction.amount
												: transaction.amount,
									}}
								/>
							)
						})}{' '}
					</div>
				)}
			</div>
		</Container>
	)
}

export default ExpensesPage
