import { TransactionCategories } from '@/types/transaction-categories.types'

const TransactionCategory = ({ name }: { name: TransactionCategories }) => {
	return (
		<div className='text-(--active) bg-(--active)/10 font-medium px-4 py-1 rounded-2xl'>
			{name}
		</div>
	)
}

export default TransactionCategory
