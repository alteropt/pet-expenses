import AddTransactionModalOpenButton from '@/components/AddTransactionModalOpenButton'
import Container from '@/components/UI/Container'

const ExpensesPage = () => {
	return (
		<Container>
			<div className='bg-white rounded-xl shadow-md px-6 py-4'>
				<div className='flex justify-between items-center'>
					<h2 className='font-medium text-xl'>All Transactions</h2>
					<AddTransactionModalOpenButton />
				</div>
			</div>
		</Container>
	)
}

export default ExpensesPage
