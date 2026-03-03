'use client'

import { useLoginForm } from '@/hooks/useAuthForm.hooks'
import { LoginUserSchema } from '@/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Button from '../UI/Button'
import InputField from '../UI/InputField'

const LoginForm = () => {
	const {
		register,
		reset,
		handleSubmit,
		clearErrors,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(LoginUserSchema),
	})

	const { onSubmit, serverError } = useLoginForm({ reset, clearErrors })

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
				{isSubmitting ? 'Signing In...' : 'Sign In'}
			</Button>
		</form>
	)
}

export default LoginForm
