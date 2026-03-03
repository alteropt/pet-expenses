'use client'

import {
	EXPENSE_CATEGORIES,
	INCOME_CATEGORIES,
} from '@/constants/transaction-categories.constants'
import { useManageTransactionForm } from '@/hooks/useManageTransactionForm.hooks'
import {
	ManageTransactionSchema,
	ManageTransactionSchemaType,
} from '@/schemas/manage-expense.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionTypeEnum } from '@prisma/client'
import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import Button from '../../UI/Button'
import InputField from '../../UI/InputField'
import Select from '../../UI/Select'
import TransactionTypeSelect from './TransactionTypeSelect'

const ManageTransactionForm = () => {
	const {
		control,
		register,
		setValue,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ManageTransactionSchemaType>({
		resolver: zodResolver(ManageTransactionSchema),
		defaultValues: {
			transactionType: TransactionTypeEnum.EXPENSE,
			category: EXPENSE_CATEGORIES[0],
		},
		mode: 'onSubmit',
	})

	const transactionType = useWatch({ control, name: 'transactionType' })
	const categories =
		transactionType === TransactionTypeEnum.EXPENSE
			? EXPENSE_CATEGORIES
			: INCOME_CATEGORIES

	useEffect(() => {
		setValue('category', categories[0])
	}, [transactionType, categories, setValue])

	const { onSubmit } = useManageTransactionForm()

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='form-default'>
			<TransactionTypeSelect
				control={control}
				name='transactionType'
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

			<div className='flex gap-2 mt-5'>
				<Button className='grow basis-1/2' variant='default' onClick={close}>
					Cancel
				</Button>
				<Button className='grow basis-1/2' type='submit'>
					{isSubmitting ? 'Saving...' : 'Add Transaction'}
				</Button>
			</div>
		</form>
	)
}

export default ManageTransactionForm
