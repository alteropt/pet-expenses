import { getTotal, getTotalByMonth } from '@/lib/balance-calculation'
import { cn } from '@/lib/cn'
import { getUserId } from '@/lib/getUserId'
import prisma from '@/lib/prisma'
import { TransactionTypeEnum } from '@prisma/client'
import BalanceCard from './UI/BalanceCard'

const currentMonth = new Date().getMonth()
const currentYear = new Date().getFullYear()

const BalanceCardsDashboardSection = async ({
	className,
}: {
	className?: string
}) => {
	const userId = await getUserId()

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
		<section className={cn('flex gap-6 pt-10', className)}>
			<BalanceCard variant='total-balance' amount={totalBalance} />
			<BalanceCard variant='income-month' amount={monthlyIncome} />
			<BalanceCard variant='expense-month' amount={monthlyExpense} />
		</section>
	)
}

export default BalanceCardsDashboardSection
