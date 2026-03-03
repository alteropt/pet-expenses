import { RegisterUserSchemaType } from '@/schemas/auth.schema'
import { loginUser } from './login'

export async function registerUser(data: RegisterUserSchemaType) {
	try {
		const response = await fetch('/api/register', {
			method: 'POST',
			body: JSON.stringify(data),
		})

		if (!response.ok) return { error: 'User already exists', success: false }

		const isLoginOk = await loginUser({
			email: data.email,
			password: data.password,
		})

		return isLoginOk
			? { error: null, success: true }
			: { error: 'Login failed', success: false }
	} catch {
		return { error: 'Server Error', success: false }
	}
}
