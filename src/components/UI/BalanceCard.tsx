import { cardConfig } from '@/config/BalanceCard.config'
import { cn } from '@/lib/cn'
import { CardVariant } from '@/types/BalanceCard.types'

type BalanceCardProps = {
	variant: CardVariant
	amount: number
	className?: string
}

const BalanceCard = ({ variant, amount, className }: BalanceCardProps) => {
	const Icon = cardConfig[variant]?.icon
	const amountWithTwoDecimals = amount.toFixed(2)

	return (
		<div
			className={cn(
				`min-w-75 w-fit rounded-lg px-6 py-8 relative flex-1 ${cardConfig[variant].className}`,
				className,
			)}
		>
			<h4
				className={cn(
					'font-semibold opacity-70 text-sm mb-5',
					!!cardConfig[variant].titleClassName &&
						cardConfig[variant].titleClassName,
				)}
			>
				{cardConfig[variant].title}
			</h4>
			<div>
				<span
					className={cn(
						'text-4xl font-bold block mb-1',
						!!cardConfig[variant].amountClassName &&
							cardConfig[variant].amountClassName,
					)}
				>
					{variant === 'transactions-total'
						? amount
						: `$${amountWithTwoDecimals}`}
				</span>
				{cardConfig[variant].description && (
					<p className='opacity-70 text-sm'>
						{cardConfig[variant].description}
					</p>
				)}
			</div>

			{Icon && (
				<div
					className={`absolute top-6 right-6 p-1.5 rounded-lg ${cardConfig[variant]?.iconClassName}`}
				>
					<Icon {...cardConfig[variant].iconProps} />
				</div>
			)}
		</div>
	)
}

export default BalanceCard
