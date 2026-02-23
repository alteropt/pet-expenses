import { cn } from '@/lib/cn'

type ButtonProps = {
	type?: 'submit' | 'reset' | 'button'
	children: React.ReactNode
	className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
	children,
	type = 'button',
	className,
	...props
}: ButtonProps) => {
	return (
		<button
			type={type}
			className={cn(
				'outline-none bg-(--active) text-white py-3 px-4 font-medium rounded-lg transition-all duration-300 hover:brightness-90 focus:brightness-90 focus relative disabled:opacity-70 disabled:cursor-not-allowed',
				className,
			)}
			{...props}
		>
			<div className='hover-darken -z-1'></div>
			<span className='z-2 relative'>{children}</span>
		</button>
	)
}

export default Button
