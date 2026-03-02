'use client'

import { addTransaction } from '@/actions/addTransaction'
import {
	EXPENSE_CATEGORIES,
	INCOME_CATEGORIES,
} from '@/constants/transaction-categories.constants'
import {
	ManageTransactionSchema,
	ManageTransactionSchemaType,
} from '@/schemas/manage-expense.schema'
import { useModal } from '@/store/modal.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionT } from '@prisma/client'
import { useEffect } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import Button from '../UI/Button'
import InputField from '../UI/InputField'
import Select from '../UI/Select'

const buttonClasses =
	'font-medium text-gray-800 text-lg bg-gray-200 px-5 py-3 grow rounded-xl border-2 border-gray-200 transition-all duration-300'

const ManageTransactionForm = () => {
	const {
		control,
		register,
		setValue,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(ManageTransactionSchema),
		defaultValues: {
			transactionType: TransactionT.EXPENSE,
			date: new Date().toISOString().split('T')[0],
			category: EXPENSE_CATEGORIES[0],
			description: '',
			amount: 0,
		},
		mode: 'onSubmit',
	})

	const transactionType = useWatch({ control, name: 'transactionType' })
	const categories =
		transactionType === TransactionT.EXPENSE
			? EXPENSE_CATEGORIES
			: INCOME_CATEGORIES

	useEffect(() => {
		setValue('category', categories[0])
	}, [transactionType, categories, setValue])

	const close = useModal(state => state.close)

	async function onSubmit(data: ManageTransactionSchemaType) {
		try {
			await addTransaction(data)
		} catch {
			console.error('Error adding transaction')
		} finally {
			close()
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='form-default'>
			<div className='label-input-div'>
				<label className='font-medium opacity-70 inline-block'>
					Transaction Type
				</label>
				<Controller
					control={control}
					name='transactionType'
					render={({ field: { value, onChange } }) => {
						return (
							<div className='flex justify-between gap-2'>
								<button
									className={`${buttonClasses} ${
										value === TransactionT.EXPENSE
											? 'border-red-500 bg-red-500/15 text-red-600'
											: 'button-effect'
									}`}
									onClick={() => onChange(TransactionT.EXPENSE)}
									type='button'
								>
									Expense
								</button>
								<button
									className={`${buttonClasses} ${
										value === TransactionT.INCOME
											? 'border-green-500 bg-green-500/15 text-green-600'
											: 'button-effect'
									}`}
									onClick={() => onChange(TransactionT.INCOME)}
									type='button'
								>
									Income
								</button>
							</div>
						)
					}}
				/>
			</div>
			<InputField
				label='Date'
				className='py-3'
				type='date'
				id='date'
				error={errors.date?.message}
				{...register('date')}
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
				{...register('amount')}
			/>

			<div className='flex gap-2 mt-5'>
				<Button className='grow basis-1/2' variant='default' onClick={close}>
					Cancel
				</Button>
				<Button className='grow basis-1/2' type='submit'>
					Add Transaction
				</Button>
			</div>
		</form>
	)
}

export default ManageTransactionForm
