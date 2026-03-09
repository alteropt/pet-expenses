import AddTransactionModalOpenButton from '@/components/AddTransactionModalOpenButton'
import TransactionsList from '@/components/TransactionsList'
import BalanceCard from '@/components/UI/BalanceCard'
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

	const totalIncome = transactions.reduce((acc, transaction) => {
		if (transaction.type === 'INCOME') return acc + transaction.amount
		return acc
	}, 0)
	const totalExpense = transactions.reduce((acc, transaction) => {
		if (transaction.type === 'EXPENSE') return acc + transaction.amount
		return acc
	}, 0)
	const totalTransactions = transactions.length

	return (
		<Container>
			<div className='py-8'>
				<div className='flex flex-col gap-2 mb-8'>
					<h1 className='font-bold text-3xl'>Expense Management</h1>
					<p className='opacity-70'>
						Track and manage all your transactions in one place
					</p>
				</div>

				<div className='flex justify-between items-start gap-5 mb-5'>
					<BalanceCard
						variant='transactions-total'
						amount={totalTransactions}
					/>
					<BalanceCard variant='income-total' amount={totalIncome} />
					<BalanceCard variant='expense-total' amount={totalExpense} />
				</div>

				<div className='bg-white rounded-xl shadow-md px-6 py-4'>
					<div className='flex justify-between items-center mb-2'>
						<h2 className='font-medium text-xl'>All Transactions</h2>
						<AddTransactionModalOpenButton />
					</div>
					<TransactionsList transactions={transactions} />
				</div>
			</div>
		</Container>
	)
}

export default ExpensesPage
