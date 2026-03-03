'use client'

import { signIn } from 'next-auth/react'

export async function loginUser({
	email,
	password,
}: {
	email: string
	password: string
}) {
	try {
		const res = await signIn('credentials', {
			redirect: false,
			email: email,
			password: password,
		})
		if (res?.error) {
			return false
		} else {
			return true
		}
	} catch {
		return false
	}
}
