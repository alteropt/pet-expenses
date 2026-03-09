import { LucideIcon, LucideProps } from 'lucide-react'

export type CardVariant =
	| 'total-month'
	| 'income-month'
	| 'expense-month'
	| 'income-total'
	| 'expense-total'
	| 'transactions-total'

export type CardConfig = {
	className: string
	title: string
	description?: string
	icon?: LucideIcon
	iconProps?: LucideProps
	iconClassName?: string
	amountClassName?: string
	titleClassName?: string
}
