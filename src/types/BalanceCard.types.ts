import { LucideIcon, LucideProps } from 'lucide-react'

export type CardVariant = 'total' | 'income' | 'expense'
export type CardConfig = {
	className: string
	title: string
	description: string
	icon: LucideIcon
	iconProps: LucideProps
	iconClassName: string
}
