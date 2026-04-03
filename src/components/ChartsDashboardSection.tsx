import { cn } from '@/lib/cn'
import {
	getExpensePieData,
	getFinancialDynamicsData,
} from '@/lib/data-charts-calculations'
import { getUserId } from '@/lib/getUserId'
import prisma from '@/lib/prisma'
import FinancialDynamicsChart from './Charts/FinancialDynamicsChart'
import OverviewChart from './Charts/OverviewChart'

const ChartsDashboardSection = async ({
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

	const expensesPieData = getExpensePieData(transactions)
	const financialDynamicsChartData = getFinancialDynamicsData(transactions)

	return (
		<div className={cn('flex gap-4', className)}>
			<OverviewChart title='Expenses Overview' data={expensesPieData} />
			<FinancialDynamicsChart data={financialDynamicsChartData} />
		</div>
	)
}

export default ChartsDashboardSection
