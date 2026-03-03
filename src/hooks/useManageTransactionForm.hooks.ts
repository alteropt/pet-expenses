import { addTransaction } from '@/actions/addTransaction'
import { ManageTransactionSchemaType } from '@/schemas/manage-expense.schema'
import { useModal } from '@/store/modal.store'

type UseManageTransactionForm = () => {
	onSubmit: (data: ManageTransactionSchemaType) => Promise<void>
}

export const useManageTransactionForm: UseManageTransactionForm = () => {
	const close = useModal(state => state.close)

	async function onSubmit(data: ManageTransactionSchemaType) {
		try {
			await addTransaction(data)
		} catch {
			// TODO: Add error handling
			console.error('Error adding transaction')
		} finally {
			close()
		}
	}

	return { onSubmit }
}
