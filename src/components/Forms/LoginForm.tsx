'use client'

import { LoginUser } from '@/actions/login'
import { LoginUserSchema, LoginUserSchemaType } from '@/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '../UI/Button'
import InputField from '../UI/InputField'

const LoginForm = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(LoginUserSchema),
	})

	const router = useRouter()
	const [serverError, setServerError] = useState<string | null>(null)

	const onSubmit: SubmitHandler<LoginUserSchemaType> = async function (data) {
		const isSuccess = await LoginUser(
			data.email,
			data.password,
			setServerError,
			router,
		)
		if (isSuccess) {
			setServerError('')
			reset()
		}
	}

	return (
		<form
			className='mt-8 w-full form-default'
			onSubmit={handleSubmit(onSubmit)}
		>
			<InputField
				label='Email Address'
				id='email'
				type='email'
				placeholder='you@example.com'
				error={errors.email?.message}
				{...register('email')}
			/>

			<InputField
				label='Password'
				id='password'
				type='password'
				placeholder='••••••••'
				error={errors.password?.message}
				{...register('password')}
			/>
			{serverError && <p className='text-red-500 text-sm'>{serverError}</p>}

			<Button disabled={isSubmitting} type='submit'>
				Sign In
			</Button>
		</form>
	)
}

export default LoginForm
