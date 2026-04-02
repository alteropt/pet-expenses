import AllTransactionsSection from '@/components/AllTransactionsSection'
import BalanceCard from '@/components/UI/BalanceCard'
import Container from '@/components/UI/Container'
import { getTotal } from '@/lib/balance-calculation'
import { getUserId } from '@/lib/getUserId'
import prisma from '@/lib/prisma'
import { TransactionTypeEnum } from '@prisma/client'

const ExpensesPage = async () => {
	const userId = await getUserId()
	if (!userId) throw new Error('User not found')

	const transactions = await prisma.transaction.findMany({
		where: {
			userId: userId,
		},
		orderBy: { date: 'desc' },
	})

	const totalIncome = getTotal(transactions, TransactionTypeEnum.INCOME)
	const totalExpense = getTotal(transactions, TransactionTypeEnum.EXPENSE)
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

				<section className='flex justify-between items-start gap-5 mb-5'>
					<BalanceCard
						variant='transactions-total'
						amount={totalTransactions}
					/>
					<BalanceCard variant='income-total' amount={totalIncome} />
					<BalanceCard variant='expense-total' amount={totalExpense} />
				</section>
				<AllTransactionsSection transactions={transactions} />
			</div>
		</Container>
	)
}

export default ExpensesPage
