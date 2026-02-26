import ManageTransactionForm from '../Forms/ManageTransactionForm'
import Modal from './Modal'

const TransactionModal = () => {
	return (
		<Modal>
			<h2 className='font-medium text-xl relative pb-5 mb-5 after:content-[" "] after:absolute after:bottom-0 after:-left-10 after:w-500 after:h-px after:bg-gray-400/20'>
				Add New Transaction
			</h2>
			<ManageTransactionForm />
		</Modal>
	)
}

export default TransactionModal
