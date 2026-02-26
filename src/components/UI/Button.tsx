import { cn } from '@/lib/cn'

type ButtonProps = {
	variant?: 'default' | 'primary'
	type?: 'submit' | 'reset' | 'button'
	children: React.ReactNode
	className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
	children,
	type = 'button',
	className,
	variant = 'primary',
	...props
}: ButtonProps) => {
	return (
		<button
			type={type}
			className={cn(
				'outline-none bg-(--active) text-white py-3 px-4 font-medium rounded-xl relative disabled:opacity-70 disabled:cursor-not-allowed button-effect select-none',
				{
					'text-black/70 bg-white border hover:shadow-[inset_0_0_0_2000px_rgba(0,0,0,0.03)] focus:shadow-[inset_0_0_0_2000px_rgba(0,0,0,0.5)]':
						variant === 'default',
				},
				className,
			)}
			{...props}
		>
			{children}
		</button>
	)
}

export default Button
