'use client'

import { cn } from '@/lib/cn'
import { TransactionTypeEnum } from '@prisma/client'
import { HTMLAttributes } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

const buttonClasses =
	'font-medium text-gray-800 text-lg bg-gray-200 px-5 py-3 grow rounded-xl border-2 border-gray-200 transition-all duration-300'

type Props<T extends FieldValues> = {
	label: string
	control: Control<T>
	name: Path<T>
} & HTMLAttributes<HTMLDivElement>

const TransactionTypeSelect = <T extends FieldValues>({
	control,
	name,
	label,
	className,
	...props
}: Props<T>) => {
	return (
		<div className='label-input-div'>
			<label htmlFor={name} className='label'>
				{label}
			</label>
			<Controller
				control={control}
				name={name}
				render={({ field: { value, onChange } }) => {
					return (
						<div
							className={cn('flex justify-between gap-2', className)}
							{...props}
						>
							<button
								className={`${buttonClasses} ${
									value === TransactionTypeEnum.EXPENSE
										? 'border-red-500 bg-red-500/15 text-red-600'
										: 'button-effect'
								}`}
								onClick={() => onChange(TransactionTypeEnum.EXPENSE)}
								type='button'
							>
								Expense
							</button>
							<button
								className={`${buttonClasses} ${
									value === TransactionTypeEnum.INCOME
										? 'border-green-500 bg-green-500/15 text-green-600'
										: 'button-effect'
								}`}
								onClick={() => onChange(TransactionTypeEnum.INCOME)}
								type='button'
							>
								Income
							</button>
						</div>
					)
				}}
			/>
		</div>
	)
}

export default TransactionTypeSelect
