import { Wallet } from 'lucide-react'
import Link from 'next/link'

type LogoSize = 'sm' | 'md' | 'lg'

type LogoProps = {
	size?: LogoSize
}

const iconSizeMap: Record<LogoSize, number> = {
	sm: 18,
	md: 24,
	lg: 30,
}

const textSizeMap: Record<LogoSize, string> = {
	sm: 'text-lg',
	md: 'text-xl',
	lg: 'text-2xl',
}

const Logo = ({ size = 'md' }: LogoProps) => {
	return (
		<Link href='/' className='inline-flex items-center gap-2'>
			<div className='bg-(--active) inline-flex p-1.5 rounded-md'>
				<Wallet color='#fff' size={iconSizeMap[size]} />
			</div>
			<h3 className={`font-bold ${textSizeMap[size]}`}>ExpensesTracker</h3>
		</Link>
	)
}

export default Logo
