'use client'

import { signIn } from 'next-auth/react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { Dispatch, SetStateAction } from 'react'

export async function LoginUser(
	email: string,
	password: string,
	setServerError: Dispatch<SetStateAction<string | null>>,
	router: AppRouterInstance,
) {
	try {
		const res = await signIn('credentials', {
			redirect: false,
			email: email,
			password: password,
		})
		if (res?.error) {
			setServerError('Invalid email or password!')
			return false
		} else {
			router.push('/')
			return true
		}
	} catch {
		setServerError('Error with connection to the server')
		return false
	}
}
