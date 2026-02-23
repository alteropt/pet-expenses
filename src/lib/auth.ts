import { PrismaAdapter } from '@auth/prisma-adapter'
import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { AuthOptions } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import { JWT } from 'next-auth/jwt'
import Credentials from 'next-auth/providers/credentials'
import prisma from './prisma'

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma) as Adapter,

	session: {
		strategy: 'jwt',
	},

	secret: process.env.NEXTAUTH_SECRET,

	providers: [
		Credentials({
			name: 'credentials',

			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},

			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) return null

				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				})

				if (!user) return null

				const passwordValid = await bcrypt.compare(
					credentials.password,
					user.password,
				)

				if (!passwordValid) return null

				return {
					id: user.id,
					email: user.email,
					fullname: user.fullname,
				}
			},
		}),
	],

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				const u = user as User
				token.id = u.id
				token.fullname = u.fullname
			}
			return token
		},
		async session({ session, token }) {
			const t = token as JWT

			if (session.user) {
				session.user.id = t.id
				session.user.fullname = t.fullname
			}
			return session
		},
	},
	pages: {
		signIn: '/login',
	},
}
