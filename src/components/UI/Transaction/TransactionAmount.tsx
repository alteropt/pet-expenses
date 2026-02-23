import { cn } from '@/lib/cn'

const TransactionAmount = ({ amount }: { amount: number }) => {
	return (
		<span
			className={cn(
				'font-semibold',
				amount < 0 ? 'text-red-500' : 'text-green-500',
			)}
		>
			{amount < 0 ? '-' : ''}${Math.abs(amount).toFixed(2)}
		</span>
	)
}

export default TransactionAmount
