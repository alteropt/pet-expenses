import BalanceCard from '@/components/UI/BalanceCard'
import Container from '@/components/UI/Container'
import { getTotalByMonth } from '@/lib/balance-calculation'
import { getUserId } from '@/lib/getUserId'
import prisma from '@/lib/prisma'
import { TransactionTypeEnum } from '@prisma/client'

const currentMonth = new Date().getMonth()
const currentYear = new Date().getFullYear()

export default async function Home() {
	const userId = await getUserId()

	const transactions = await prisma.transaction.findMany({
		where: {
			userId: userId,
		},
		orderBy: { date: 'desc' },
	})

	console.log(transactions)

	const totalBalance = transactions.reduce((acc, transaction) => {
		if (transaction.type === 'EXPENSE') {
			return acc - transaction.amount
		} else {
			return acc + transaction.amount
		}
	}, 0)

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
			<section className='flex gap-6 pt-10 '>
				<BalanceCard variant='total-balance' amount={totalBalance} />
				<BalanceCard variant='income-month' amount={monthlyIncome} />
				<BalanceCard variant='expense-month' amount={monthlyExpense} />
			</section>
		</Container>
	)
}
