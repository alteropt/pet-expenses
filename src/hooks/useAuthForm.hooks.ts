import { loginUser } from '@/actions/login'
import { registerUser } from '@/actions/register'
import {
	LoginUserSchemaType,
	RegisterUserSchemaType,
} from '@/schemas/auth.schema'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FieldValues, SubmitHandler, UseFormClearErrors } from 'react-hook-form'

type UseAuthForm<T extends FieldValues> = (props: {
	reset: (values?: T) => void
	clearErrors: UseFormClearErrors<T>
}) => {
	onSubmit: SubmitHandler<T>
	serverError: string | null
}

export const useRegisterForm: UseAuthForm<RegisterUserSchemaType> = ({
	reset,
	clearErrors,
}) => {
	const router = useRouter()

	const [serverError, setServerError] = useState<string | null>(null)
	const onSubmit: SubmitHandler<RegisterUserSchemaType> = async data => {
		const response = await registerUser(data)
		if (response.success) {
			router.refresh()
			router.push('/')
			clearErrors()
			reset()
		} else {
			setServerError(response.error)
		}
	}

	return { onSubmit, serverError }
}

export const useLoginForm: UseAuthForm<LoginUserSchemaType> = ({
	reset,
	clearErrors,
}) => {
	const [serverError, setServerError] = useState<string | null>(null)
	const router = useRouter()

	const onSubmit: SubmitHandler<LoginUserSchemaType> = async function (data) {
		const isSuccess = await loginUser(data)
		if (isSuccess) {
			setServerError('')
			router.refresh()
			router.push('/')
			clearErrors()
			reset()
		} else {
			setServerError('Invalid email or password')
		}
	}

	return { onSubmit, serverError }
}
