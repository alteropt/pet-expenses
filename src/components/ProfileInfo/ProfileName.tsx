import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import Button from '../UI/Button'
import ProfileButton from './ProfileButton'

const ProfileName = async () => {
	const session = await getServerSession(authOptions)

	if (!session?.user)
		return (
			<Link href='/login'>
				<Button>Login</Button>
			</Link>
		)

	return <ProfileButton user={session.user} />
}

export default ProfileName
