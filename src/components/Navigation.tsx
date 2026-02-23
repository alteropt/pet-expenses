'use client'

import { NAV_LINKS } from '@/config/navigation.config'
import { usePathname } from 'next/navigation'
import NavLink from './UI/NavLink'

const Navigation = () => {
	const pathname = usePathname()
	return (
		<nav className='flex gap-8'>
			{NAV_LINKS.map(link => (
				<NavLink
					key={link.href}
					href={link.href}
					label={link.label}
					isActive={pathname === link.href}
				></NavLink>
			))}
		</nav>
	)
}

export default Navigation
