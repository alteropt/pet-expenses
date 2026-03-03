import {
	EXPENSE_CATEGORIES,
	INCOME_CATEGORIES,
} from '@/constants/transaction-categories.constants'

type TransactionCategoryName =
	| (typeof INCOME_CATEGORIES)[number]
	| (typeof EXPENSE_CATEGORIES)[number]

const TransactionCategory = ({ name }: { name: TransactionCategoryName }) => {
	return (
		<div className='text-(--active) bg-(--active)/10 font-medium px-4 py-1 rounded-2xl'>
			{name}
		</div>
	)
}

export default TransactionCategory
