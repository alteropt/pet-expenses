import { cn } from '@/lib/cn'
import { TransactionTypeEnum } from '@prisma/client'
import { TrendingDown, TrendingUp } from 'lucide-react'

const TransactionType = ({ type }: { type: TransactionTypeEnum }) => {
	return (
		<div
			className={cn(
				'flex gap-2 items-center font-semibold px-3 py-1 rounded-2xl',
				type === TransactionTypeEnum.EXPENSE && 'text-red-600 bg-red-400/20',
				type === TransactionTypeEnum.INCOME && 'text-green-500 bg-green-500/20',
			)}
		>
			{type === TransactionTypeEnum.EXPENSE && (
				<>
					<TrendingDown size={20} /> Expense
				</>
			)}
			{type === TransactionTypeEnum.INCOME && (
				<>
					<TrendingUp size={20} /> Income
				</>
			)}
		</div>
	)
}

export default TransactionType
