export const EXPENSE_CATEGORIES = [
	'Food',
	'Transport',
	'Entertainment',
	'Health',
	'Shopping',
	'Utilities',
] as const

export const INCOME_CATEGORIES = ['Salary', 'Gifts', 'Others'] as const

export const TRANSACTION_CATEGORIES = [
	...EXPENSE_CATEGORIES,
	...INCOME_CATEGORIES,
] as const
