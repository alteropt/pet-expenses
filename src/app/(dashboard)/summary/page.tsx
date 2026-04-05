import TransactionChart from '@/components/Charts/TransactionChart'
import BalanceCard from '@/components/UI/BalanceCard'
import Container from '@/components/UI/Container'
import { getTotal, getTotalByMonth } from '@/lib/balance-calculation'
import { getUserId } from '@/lib/getUserId'
import prisma from '@/lib/prisma'
import { TransactionTypeEnum } from '@prisma/client'

const currentMonth = new Date().getMonth()
const currentYear = new Date().getFullYear()

const SummaryPage = async () => {
	const userId = await getUserId()
	if (!userId) throw new Error('User not found')

	const transactions = await prisma.transaction.findMany({
		where: {
			userId: userId,
		},
		orderBy: { date: 'desc' },
	})

	const totalBalance = getTotal(transactions, 'total')
	const monthlyIncome = getTotalByMonth(
		transactions,
		currentMonth,
		currentYear,
		TransactionTypeEnum.INCOME,
	)

	const monthlyExpense = getTotalByMonth(
		transactions,
		currentMonth,
		currentYear,
		TransactionTypeEnum.EXPENSE,
	)

	return (
		<Container>
			<div className='flex flex-col gap-2 my-8'>
				<h1 className='font-bold text-3xl'>Financial Summary</h1>
				<p className='opacity-70'>
					Comprehensive overview of your financial health
				</p>
			</div>
			<div className='flex gap-6'>
				<BalanceCard variant='total-balance' amount={totalBalance} />
				<BalanceCard variant='expense-month' amount={monthlyExpense} />
				<BalanceCard variant='income-month' amount={monthlyIncome} />
			</div>
			<div className='flex gap-1 justify-around mt-4 mb-10'>
				<TransactionChart
					data={transactions}
					transactionType={TransactionTypeEnum.EXPENSE}
				/>
				<TransactionChart
					data={transactions}
					transactionType={TransactionTypeEnum.INCOME}
				/>
			</div>
		</Container>
	)
}

export default SummaryPage
