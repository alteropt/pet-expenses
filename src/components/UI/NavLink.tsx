import { type NavLink } from '@/config/navigation.config'
import { cn } from '@/lib/cn'
import Link from 'next/link'

type NavLinkProps = NavLink & {
	isActive?: boolean
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

const NavLink = ({ href, label, className, isActive }: NavLinkProps) => {
	return (
		<Link
			href={href}
			className={cn(
				`font-semibold ${isActive ? 'text-(--active)' : 'text-black opacity-70'} transition-opacity hover:opacity-100 duration-300`,
				className,
			)}
		>
			{label}
		</Link>
	)
}

export default NavLink
