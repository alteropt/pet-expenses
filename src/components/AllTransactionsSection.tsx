import { TransactionType } from '@/types/transaction.type'
import AddTransactionModalOpenButton from './AddTransactionModalOpenButton'
import TransactionsList from './TransactionsList'

const AllTransactionsSection = ({
	transactions,
}: {
	transactions: TransactionType[]
}) => {
	return (
		<div className='bg-white rounded-xl shadow-md px-6 py-4'>
			<div className='flex justify-between items-center mb-2'>
				<h2 className='font-medium text-xl'>All Transactions</h2>
				<AddTransactionModalOpenButton />
			</div>
			<TransactionsList transactions={transactions} />
		</div>
	)
}

export default AllTransactionsSection
