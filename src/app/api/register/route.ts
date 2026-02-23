import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
	const { email, password, fullname } = await req.json()

	if (!email || !password || !fullname)
		return Response.json({ error: 'Missing fields' }, { status: 400 })

	const exists = await prisma.user.findUnique({
		where: { email },
	})

	if (exists) return Response.json({ error: 'User exists!' }, { status: 400 })

	const hash = await bcrypt.hash(password, 10)

	const user = await prisma.user.create({
		data: { email, password: hash, fullname },
	})

	return Response.json(user)
}
