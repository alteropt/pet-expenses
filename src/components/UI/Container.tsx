import { cn } from '@/lib/cn'
import { ReactNode } from 'react'

type ContainerProps = {
	children: ReactNode
	className?: string
} & React.HTMLAttributes<HTMLDivElement>

const Container = ({ children, className, ...props }: ContainerProps) => {
	return (
		<div
			className={cn('mx-auto max-w-7xl px-4 sm:px-4 md:px-6', className)}
			{...props}
		>
			{children}
		</div>
	)
}

export default Container
