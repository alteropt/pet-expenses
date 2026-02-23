import { cn } from '@/lib/cn'
import { cardConfig } from './BalanceCard.config'
import { CardVariant } from './BalanceCard.types'

type BalanceCardProps = {
	variant: CardVariant
	amount: number
	className?: string
}

const BalanceCard = ({ variant, amount, className }: BalanceCardProps) => {
	const Icon = cardConfig[variant].icon
	const amountWithTwoDecimals = amount.toFixed(2)

	return (
		<div
			className={cn(
				`min-w-75 w-fit rounded-lg px-6 py-8 relative ${cardConfig[variant].className}`,
				className,
			)}
		>
			<h4 className='font-semibold opacity-70 text-sm mb-5'>
				{cardConfig[variant].title}
			</h4>
			<div>
				<span className='text-4xl font-bold block mb-1'>
					${amountWithTwoDecimals}
				</span>
				<p className='opacity-70 text-sm'>{cardConfig[variant].description}</p>
			</div>

			<div
				className={`absolute top-6 right-6 p-1.5 rounded-lg ${cardConfig[variant].iconClassName}`}
			>
				<Icon {...cardConfig[variant].iconProps} />
			</div>
		</div>
	)
}

export default BalanceCard
