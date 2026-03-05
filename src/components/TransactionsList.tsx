import { TRANSACTION_CATEGORIES } from '@/constants/transaction-categories.constants'
import { TransactionType } from '@/types/transaction.type'
import Transaction from './UI/Transaction/Transaction'

const TransactionsList = ({
	transactions,
}: {
	transactions: TransactionType[]
}) => {
	return (
		<>
			{transactions.length === 0 && (
				<div className='h-70 flex items-center justify-center flex-col gap-2'>
					<h3 className='text-3xl opacity-70'>No Transactions Found</h3>
					<h5 className='opacity-70 text-md'>
						Add Your First Transaction To Get Started
					</h5>
				</div>
			)}
			{transactions.length > 0 && (
				<div className='flex flex-col gap-2'>
					{transactions.map(transaction => {
						return (
							<Transaction
								key={transaction.id}
								data={{
									...transaction,
									category:
										transaction.category as (typeof TRANSACTION_CATEGORIES)[number],
									amount:
										transaction.type === 'EXPENSE'
											? -transaction.amount
											: transaction.amount,
								}}
							/>
						)
					})}{' '}
				</div>
			)}
		</>
	)
}

export default TransactionsList
