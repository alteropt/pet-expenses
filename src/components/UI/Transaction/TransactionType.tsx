import { cn } from '@/lib/cn'
import { TrendingDown, TrendingUp } from 'lucide-react'

const TransactionType = ({ type }: { type: 'expense' | 'income' }) => {
	return (
		<div
			className={cn(
				'flex gap-2 items-center font-semibold px-3 py-1 rounded-2xl',
				type === 'expense' && 'text-red-600 bg-red-400/20',
				type === 'income' && 'text-green-500 bg-green-500/20',
			)}
		>
			{type === 'expense' && (
				<>
					<TrendingDown size={20} /> Expense
				</>
			)}
			{type === 'income' && (
				<>
					<TrendingUp size={20} /> Income
				</>
			)}
		</div>
	)
}

export default TransactionType
