import { cn } from '@/lib/cn'
import React, { InputHTMLAttributes } from 'react'

type InputFieldProps = {
	label: string
	error?: string
} & InputHTMLAttributes<HTMLInputElement>

const InvalidInput = ({ message }: { message: string }) => {
	return <p className='error-message'>{message}</p>
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
	({ label, error, id, className, ...props }, ref) => {
		return (
			<div className='label-input-div'>
				<label htmlFor={id ?? props.name} className='label'>
					{label}
				</label>
				<input
					className={cn(
						'input-default',
						error && 'outline-red-500 focus:shadow-[0_0_0_2px_transparent]',
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
