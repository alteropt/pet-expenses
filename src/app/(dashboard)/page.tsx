import BalanceCardsDashboardSection from '@/components/BalanceCardsDashboardSection'
import ExpenseOverviewChart from '@/components/Charts/ExpenseOverviewChart'
import FinancialDynamicsChart from '@/components/Charts/FinancialDynamicsChart'
import Container from '@/components/UI/Container'
import {
	getExpensePieData,
	getFinancialDynamicsData,
} from '@/lib/data-charts-calculations'
import { getUserId } from '@/lib/getUserId'
import prisma from '@/lib/prisma'

export default async function Home() {
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
		<Container>
			<BalanceCardsDashboardSection />
			<ExpenseOverviewChart data={expensesPieData} />
			<FinancialDynamicsChart data={financialDynamicsChartData} />
		</Container>
	)
}
