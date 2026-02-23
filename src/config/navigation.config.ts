export interface NavLink {
	label: string
	href: string
}

export const NAV_LINKS = [
	{ label: 'Dashboard', href: '/' },
	{ label: 'Expenses', href: '/expenses' },
	{ label: 'Summary', href: '/summary' },
	{ label: 'Reports', href: '/reports' },
	{ label: 'Settings', href: '/settings' },
]
