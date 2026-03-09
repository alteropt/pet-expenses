'use client'

import { deleteTransaction } from '@/actions/deleteTransaction'
import { formatDate } from '@/lib/formatDate'
import { ManageTransactionSchemaType } from '@/schemas/manage-expense.schema'
import { useModal } from '@/store/modal.store'
import { TransactionType as TransactionT } from '@/types/transaction.type'
import { SquarePen, Trash2 } from 'lucide-react'
import TransactionAmount from './TransactionAmount'
import TransactionCategory, {
	TransactionCategoryName,
} from './TransactionCategory'
import TransactionType from './TransactionType'

type Transaction = {
	data: ManageTransactionSchemaType & { id: string }
}

const Transaction = ({ data: transaction }: { data: TransactionT }) => {
	const open = useModal(state => state.open)

	return (
		<div className='grid grid-cols-[1fr_1fr_2fr_1fr_2fr_1fr] items-center text-sm'>
			<span className='opacity-70'>{formatDate(transaction.date)}</span>
			<TransactionCategory
				name={transaction.category as TransactionCategoryName}
			/>
			<p className='pr-1'>{transaction.description}</p>

			<TransactionAmount amount={transaction.amount} />
			<TransactionType type={transaction.type} />
			<div className='flex gap-1 items-center justify-end'>
				<button
					className='opacity-30 hover:opacity-100 hover:text-(--active) hover:bg-(--active)/10 p-2 rounded-full transition-all'
					onClick={() => open('edit-expense', transaction)}
				>
					<SquarePen size={20} />
				</button>
				<button
					onClick={() => deleteTransaction(transaction.id)}
					type='button'
					className='opacity-30 hover:opacity-100 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-full transition-all duration-300'
				>
					<Trash2 size={20} />
				</button>
			</div>
		</div>
	)
}

export default Transaction
