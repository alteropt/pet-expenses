import { getServerSession } from 'next-auth'
import { authOptions } from './auth'

export async function getUserId() {
	const session = await getServerSession(authOptions)
	const userId = session?.user?.id

	return userId
}
