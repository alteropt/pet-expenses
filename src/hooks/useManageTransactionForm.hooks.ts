import { addTransaction } from '@/actions/addTransaction'
import { editTransaction } from '@/actions/editTransaction'
import { ManageTransactionSchemaType } from '@/schemas/manage-expense.schema'
import { useModal } from '@/store/modal.store'
import { ModalType } from '@/types/ModalType.type'
import { TransactionType } from '@/types/transaction.type'

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
}

export const useManageTransactionForm: UseManageTransactionForm = ({
	type,
	transactionData,
}) => {
	const close = useModal(state => state.close)

	async function onSubmit(data: ManageTransactionSchemaType) {
		if (type === 'create-expense') {
			const response = await addTransaction(data)
			if (response.success) close()
			else console.log(response.error) // TODO Show error in UI
		} else if (type === 'edit-expense') {
			const response = await editTransaction({
				...data,
				id: transactionData.id,
			})
			if (response.success) close()
			else console.log(response.error) // TODO Show error in UI
		}
	}

	return { onSubmit }
}
