'use client'

import { LogOut, User } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useState } from 'react'

type SessionUser = {
	id: string
	fullname: string
} & {
	name?: string | null
	email?: string | null
	image?: string | null
}

const ProfileButton = ({ user }: { user: SessionUser }) => {
	const [isPopupOpen, setIsPopupOpen] = useState(false)

	function handleProfileInfoButtonClick() {
		setIsPopupOpen(!isPopupOpen)
	}

	function handleSignOutButtonClick() {
		signOut()
	}

	return (
		<div className='relative'>
			<button
				className='flex items-center gap-2 px-3 py-2 hover:bg-gray-200 transition-colors duration-300 select-none rounded-lg'
				onClick={handleProfileInfoButtonClick}
			>
				<div className='flex items-center justify-center p-2 bg-(--active)/20 rounded-full'>
					<User color='var(--active)' size={20} />
				</div>
				<span className='text-sm font-semibold opacity-70'>
					{user.fullname ?? 'User'}
				</span>
			</button>

			{isPopupOpen && (
				<div className='absolute bg-white text-sm z-10 top-[calc(100%+0.75rem)] left-1/2 translate-x-[-50%] rounded-lg border border-gray-700/30 pb-2'>
					<div className='p-4 pb-2 border-b-gray-500/30 border-b'>
						<span className='font-semibold'>{user.fullname ?? 'User'}</span>
						<p className='text-gray-500 text-xs'>{user.email}</p>
					</div>
					<button
						className='p-4 pt-2 pb-2 text-sm text-red-500 w-full flex items-center gap-1 transition-colors duration-300 hover:bg-red-500/10'
						onClick={handleSignOutButtonClick}
					>
						<LogOut /> Sign Out
					</button>
				</div>
			)}
		</div>
	)
}

export default ProfileButton
