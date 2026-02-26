'use client'

import { TRANSACTION_CATEGORIES } from '@/constants/transaction-categories.constants'
import { ManageExpenseSchema } from '@/schemas/manage-expense.schema'
import { useModal } from '@/store/modal.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import Button from '../UI/Button'
import InputField from '../UI/InputField'
import Select from '../UI/Select'

const buttonClasses =
	'font-medium text-gray-800 text-lg bg-gray-200 px-5 py-3 grow rounded-xl border-2 border-gray-200 transition-all duration-300'

const ManageTransactionForm = () => {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(ManageExpenseSchema),
		defaultValues: {
			transactionType: 'expense',
			date: new Date().toISOString().split('T')[0],
			category: TRANSACTION_CATEGORIES[0],
			description: '',
			amount: 0,
		},
		mode: 'onSubmit',
	})

	const close = useModal(state => state.close)

	function onSubmit() {}

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
										value === 'expense'
											? 'border-red-500 bg-red-500/15 text-red-600'
											: 'button-effect'
									}`}
									onClick={() => onChange('expense')}
									type='button'
								>
									Expense
								</button>
								<button
									className={`${buttonClasses} ${
										value === 'income'
											? 'border-green-500 bg-green-500/15 text-green-600'
											: 'button-effect'
									}`}
									onClick={() => onChange('income')}
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
				options={TRANSACTION_CATEGORIES}
				control={control}
				name='category'
				label='Category'
				className='py-3'
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
				<Button className='grow basis-1/2'>Add Transaction</Button>
			</div>
		</form>
	)
}

export default ManageTransactionForm
