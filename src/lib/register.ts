import { RegisterUserSchemaType } from '@/schemas/auth.schema'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { Dispatch, SetStateAction } from 'react'
import { LoginUser } from './login'

export async function RegisetUser(
	data: RegisterUserSchemaType,
	setServerError: Dispatch<SetStateAction<string | null>>,
	router: AppRouterInstance,
) {
	try {
		const response = await fetch('/api/register', {
			method: 'POST',
			body: JSON.stringify(data),
		})

		if (response.ok) {
			setServerError('')

			LoginUser(data.email, data.password, setServerError, router)
			return true
		} else {
			const errorData = await response.json()
			setServerError(errorData.error || 'Server Error')
			return false
		}
	} catch {
		setServerError('Error with connection to the server')
		return false
	}
}
