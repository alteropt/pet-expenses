import { cn } from '@/lib/cn'
import React, { InputHTMLAttributes } from 'react'

type InputFieldProps = {
	label: string
	error?: string
} & InputHTMLAttributes<HTMLInputElement>

const InvalidInput = ({ message }: { message: string }) => {
	return <p className='text-red-500 text-sm'>{message}</p>
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
	({ label, error, id, className, ...props }, ref) => {
		return (
			<div className='flex flex-col gap-1'>
				<label
					htmlFor={id ?? props.name}
					className='font-medium opacity-70 inline-block'
				>
					{label}
				</label>
				<input
					className={cn(
						'outline-1 outline-black/20 p-3.5 rounded-xl focus:shadow-[0_0_0_2px_var(--active)]',
						className,
					)}
					{...props}
					ref={ref}
				/>
				{error && <InvalidInput message={error} />}
			</div>
		)
	},
)

InputField.displayName = 'InputField'

export default InputField
