import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react'
import { CardConfig, CardVariant } from '../types/BalanceCard.types'

export const cardConfig: Record<CardVariant, CardConfig> = {
	'total-month': {
		className: 'bg-linear-to-r from-(--active)/70 to-(--active) text-white',
		title: 'Total Balance',
		description: 'Total Balance',
		icon: DollarSign,
		iconProps: { color: 'white' },
		iconClassName: 'bg-white/20',
	},
	'income-month': {
		className:
			'bg-white border-l-5 border-l-green-400 border-b-3 border-b-gray-300 shadow-lg',
		title: 'Monthly Income',
		description: 'Income this month',
		icon: TrendingUp,
		iconProps: { color: 'green' },
		iconClassName: 'bg-green-400/20',
	},
	'expense-month': {
		className:
			'bg-white border-l-5 border-l-red-500 border-b-3 border-b-gray-300 shadow-lg',
		title: 'Monthly Expenses',
		description: 'Expenses this month',
		icon: TrendingDown,
		iconProps: { color: 'red' },
		iconClassName: 'bg-red-500/20',
	},
	'income-total': {
		className:
			'bg-white border-l-5 border-l-green-400 border-b-3 border-b-gray-300 shadow-lg py-5',
		title: 'Total Income',
		titleClassName: 'mb-1 font-normal',
		amountClassName: 'text-3xl text-green-600',
	},
	'expense-total': {
		className:
			'bg-white border-l-5 border-l-red-500 border-b-3 border-b-gray-300 shadow-lg py-5',
		title: 'Total Expenses',
		titleClassName: 'mb-1 font-normal',
		amountClassName: 'text-3xl text-red-600',
	},
	'transactions-total': {
		className:
			'bg-white border-l-5 border-l-green-400 border-b-3 border-b-gray-300 shadow-lg py-5 border-l-0',
		title: 'Total Transactions',
		titleClassName: 'mb-1 font-normal',
		amountClassName: 'text-3xl',
	},
}
