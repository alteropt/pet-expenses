import { addTransaction } from '@/actions/addTransaction'
import { editTransaction } from '@/actions/editTransaction'
import { ManageTransactionSchemaType } from '@/schemas/manage-expense.schema'
import { useModal } from '@/store/modal.store'
import { ModalType } from '@/types/ModalType.type'
import { TransactionType } from '@/types/transaction.type'
import { useState } from 'react'

type useManageTransactionFormProps =
	| {
			type: Extract<ModalType, 'create-expense'>
			transactionData?: never
	  }
	| {
			type: Extract<ModalType, 'edit-expense'>
			transactionData: TransactionType
	  }

type UseManageTransactionForm = (props: useManageTransactionFormProps) => {
	onSubmit: (data: ManageTransactionSchemaType) => Promise<void>
	error: string | null
}

export const useManageTransactionForm: UseManageTransactionForm = ({
	type,
	transactionData,
}) => {
	const close = useModal(state => state.close)
	const [error, setError] = useState<string | null>(null)

	async function onSubmit(data: ManageTransactionSchemaType) {
		if (type === 'create-expense') {
			const response = await addTransaction(data)
			if (response.success) close()
			else setError('Some error occurred')
		} else if (type === 'edit-expense') {
			const response = await editTransaction({
				...data,
				id: transactionData.id,
			})
			if (response.success) close()
			else setError('Some error occurred')
		}
	}

	return { onSubmit, error }
}
