'use client'

import {
	EXPENSE_CATEGORIES,
	INCOME_CATEGORIES,
	TRANSACTION_CATEGORIES,
} from '@/constants/transaction-categories.constants'
import { useManageTransactionForm } from '@/hooks/useManageTransactionForm.hooks'
import {
	ManageTransactionSchema,
	ManageTransactionSchemaType,
} from '@/schemas/manage-expense.schema'
import { useModal } from '@/store/modal.store'
import { ModalType } from '@/types/ModalType.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionTypeEnum } from '@prisma/client'
import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import Button from '../../UI/Button'
import InputField from '../../UI/InputField'
import Select from '../../UI/Select'
import TransactionTypeSelect from './TransactionTypeSelect'

const ManageTransactionForm = ({ type }: { type: ModalType | null }) => {
	const close = useModal(state => state.close)
	const transactionData = useModal(state => state.data)

	const defaultValues =
		transactionData && type === 'edit-expense'
			? {
					amount: transactionData.amount,
					category:
						transactionData.category as (typeof TRANSACTION_CATEGORIES)[number],
					description: transactionData.description,
					date: transactionData.date
						.toISOString()
						.split('T')[0] as unknown as Date,
					type: transactionData.type,
				}
			: {
					type: TransactionTypeEnum.EXPENSE,
					category: EXPENSE_CATEGORIES[0],
					date: new Date().toISOString().split('T')[0] as unknown as Date,
				}

	const {
		control,
		register,
		setValue,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ManageTransactionSchemaType>({
		resolver: zodResolver(ManageTransactionSchema),
		defaultValues: defaultValues,
		mode: 'onSubmit',
	})

	const transactionType = useWatch({ control, name: 'type' })
	const categories =
		transactionType === TransactionTypeEnum.EXPENSE
			? EXPENSE_CATEGORIES
			: INCOME_CATEGORIES

	useEffect(() => {
		setValue('category', categories[0])
	}, [transactionType, categories, setValue])

	const { onSubmit, error } = useManageTransactionForm(
		type === 'edit-expense'
			? { type: 'edit-expense', transactionData: transactionData! }
			: { type: 'create-expense' },
	)

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='form-default'>
			<TransactionTypeSelect
				control={control}
				name='type'
				label='Transaction Type'
			/>
			<InputField
				label='Date'
				className='py-3'
				type='date'
				id='date'
				error={errors.date?.message}
				{...register('date', { valueAsDate: true })}
			/>
			<Select
				options={categories}
				control={control}
				name='category'
				label='Category'
				className='py-3'
				key={transactionType}
			/>
			<InputField
				label='Description'
				className='py-3'
				id='desc'
				error={errors.description?.message}
				{...register('description')}
				placeholder='e.g., Grocery shopping'
			/>
			<InputField
				label='Amount ($)'
				placeholder='0.00'
				className='py-3'
				id='amount'
				type='number'
				step='any'
				error={errors.amount?.message}
				{...register('amount', { valueAsNumber: true })}
			/>

			{error && <p className='error-message'>{error}</p>}

			<div className='flex gap-2 mt-5'>
				<Button
					className='grow basis-1/2'
					variant='default'
					onClick={close}
					type='button'
				>
					Cancel
				</Button>
				<Button className='grow basis-1/2' type='submit'>
					{isSubmitting
						? 'Saving...'
						: type === 'create-expense'
							? 'Add Transaction'
							: 'Edit Transaction'}
				</Button>
			</div>
		</form>
	)
}

export default ManageTransactionForm
