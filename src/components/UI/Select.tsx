'use client'

import { cn } from '@/lib/cn'
import { ChevronDown } from 'lucide-react'
import { ButtonHTMLAttributes, useState } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

type Props<T extends FieldValues> = {
	label: string
	options: readonly string[]
	control: Control<T>
	name: Path<T>
} & ButtonHTMLAttributes<HTMLButtonElement>

const Select = <T extends FieldValues>({
	options,
	control,
	name,
	label,
	className,
	...props
}: Props<T>) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className='label-input-div'>
			<label htmlFor={name}>{label}</label>
			<Controller
				control={control}
				name={name}
				render={({ field: { value, onChange } }) => {
					return (
						<div className='relative'>
							<button
								className={cn(
									'flex justify-between w-full input-default',
									className,
								)}
								type='button'
								onClick={() => setIsOpen(prev => !prev)}
								{...props}
							>
								{value} <ChevronDown />
							</button>

							{isOpen && (
								<div className='absolute -bottom-1 left-0 translate-y-full w-full z-9 bg-white'>
									{options.map(option => (
										<button
											key={option}
											className='flex justify-between w-full input-default relative hover:bg-(--active)/20 transition-colors duration-300 outline-none border border-(--active)/20 rounded-none first:rounded-t-lg last:rounded-b-lg p-2'
											onClick={() => {
												setIsOpen(false)
												onChange(option)
											}}
											type='button'
										>
											{option}
										</button>
									))}
								</div>
							)}
						</div>
					)
				}}
			/>
		</div>
	)
}

export default Select
