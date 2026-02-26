'use client'

import { useModal } from '@/store/modal.store'
import { Plus } from 'lucide-react'
import Button from './UI/Button'

const AddTransactionModalOpenButton = () => {
	const open = useModal(state => state.open)

	return (
		<Button
			className='px-6 flex gap-3 text-base'
			onClick={() => open('create-expense')}
		>
			<div>
				<Plus />
			</div>
			<span>Add Transaction</span>
		</Button>
	)
}

export default AddTransactionModalOpenButton
