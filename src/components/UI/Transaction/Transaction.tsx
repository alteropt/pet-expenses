import { SquarePen, Trash2 } from 'lucide-react'
import TransactionAmount from './TransactionAmount'
import TransactionCategory from './TransactionCategory'
import TransactionType from './TransactionType'

const Transaction = () => {
	return (
		<div className='flex justify-between items-center text-sm'>
			<span className='opacity-70'>Jan 28, 2026</span>
			<TransactionCategory name='Food' />
			<p>Grocery Shopping</p>

			<TransactionAmount amount={-85.5} />
			<TransactionType type='expense' />
			<div className='flex gap-1 items-center'>
				<div className='opacity-30 hover:opacity-100 hover:text-(--active) hover:bg-(--active)/10 p-2 rounded-full transition-all'>
					<SquarePen size={20} />
				</div>
				<div className='opacity-30 hover:opacity-100 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-full transition-all duration-300'>
					<Trash2 size={20} />
				</div>
			</div>
		</div>
	)
}

export default Transaction
