import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react'
import { CardConfig, CardVariant } from './BalanceCard.types'

export const cardConfig: Record<CardVariant, CardConfig> = {
	total: {
		className: 'bg-linear-to-r from-(--active)/70 to-(--active) text-white',
		title: 'Total Balance',
		description: 'Total Balance',
		icon: DollarSign,
		iconProps: { color: 'white' },
		iconClassName: 'bg-white/20',
	},
	income: {
		className:
			'bg-white border-l-5 border-l-green-400 border-b-3 border-b-gray-300 shadow-lg',
		title: 'Monthly Income',
		description: 'Income this month',
		icon: TrendingUp,
		iconProps: { color: 'green' },
		iconClassName: 'bg-green-400/20',
	},
	expense: {
		className:
			'bg-white border-l-5 border-l-red-500 border-b-3 border-b-gray-300 shadow-lg',
		title: 'Monthly Expenses',
		description: 'Expenses this month',
		icon: TrendingDown,
		iconProps: { color: 'red' },
		iconClassName: 'bg-red-500/20',
	},
}
