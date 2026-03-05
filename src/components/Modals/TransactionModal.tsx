'use client'

import { useModal } from '@/store/modal.store'
import ManageTransactionForm from '../Forms/ManageTransactionForm/ManageTransactionForm'
import Modal from './Modal'

const TransactionModal = () => {
	const type = useModal(state => state.type)

	return (
		<Modal>
			<h2 className='font-medium text-xl relative pb-5 mb-5 after:content-[" "] after:absolute after:bottom-0 after:-left-10 after:w-500 after:h-px after:bg-gray-400/20'>
				{type === 'create-expense' || type === null
					? 'Add New Transaction'
					: 'Edit Transaction'}
			</h2>
			<ManageTransactionForm type={type} />
		</Modal>
	)
}

export default TransactionModal
