import { TransactionType } from '@/types/transaction.type'

export type MonthlyFinancialDynamicsData = {
	name: string
	income: number
	expenses: number
}

export const getExpensePieData = (transactions: TransactionType[]) => {
	const expenses = transactions.filter(t => t.type === 'EXPENSE')

	const aggregated = expenses.reduce(
		(acc, curr) => {
			const existing = acc.find(item => item.name === curr.category)
			if (existing) {
				existing.value += curr.amount
			} else {
				acc.push({ name: curr.category, value: curr.amount })
			}
			return acc
		},
		[] as { name: string; value: number }[],
	)

	return aggregated
}

export const getFinancialDynamicsData = (transactions: TransactionType[]) => {
	const months = transactions.reduce<
		Record<string, MonthlyFinancialDynamicsData>
	>((acc, t) => {
		const date = new Date(t.date)
		const monthLabel = date.toLocaleString('en-US', {
			month: 'short',
			year: 'numeric',
		})

		if (!acc[monthLabel]) {
			acc[monthLabel] = { name: monthLabel, income: 0, expenses: 0 }
		}

		if (t.type === 'INCOME') {
			acc[monthLabel].income += t.amount
		} else {
			acc[monthLabel].expenses += t.amount
		}

		return acc
	}, {})

	return Object.values(months).sort(
		(a, b) => new Date(a.name).getTime() - new Date(b.name).getTime(),
	)
}
