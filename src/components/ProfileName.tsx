import { authOptions } from '@/lib/auth'
import { User } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import Button from './UI/Button'

const ProfileName = async () => {
	const session = await getServerSession(authOptions)

	if (!session?.user)
		return (
			<Link href='/login'>
				<Button>Login</Button>
			</Link>
		)

	return (
		<button className='flex items-center gap-2 px-3 py-2 hover:bg-gray-200 transition-colors duration-300 select-none rounded-lg'>
			<div className='flex items-center justify-center p-2 bg-(--active)/20 rounded-full'>
				<User color='var(--active)' size={20} />
			</div>
			<span className='text-sm font-semibold opacity-70'>
				{session?.user.fullname ?? 'User'}
			</span>
		</button>
	)
}

export default ProfileName
