'use client'

import { useRegisterForm } from '@/hooks/useAuthForm.hooks'
import {
	RegisterUserSchema,
	RegisterUserSchemaType,
} from '@/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Button from '../UI/Button'
import InputField from '../UI/InputField'

const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		clearErrors,
		formState: { errors, isSubmitting },
	} = useForm<RegisterUserSchemaType>({
		resolver: zodResolver(RegisterUserSchema),
	})

	const { onSubmit, serverError } = useRegisterForm({ reset, clearErrors })

	return (
		<form
			className='mt-8 w-full form-default'
			onSubmit={handleSubmit(onSubmit)}
		>
			{serverError && (
				<p className='text-red-500 text-lg mx-auto'>{serverError}</p>
			)}
			<InputField
				label='Full Name'
				id='fullname'
				type='text'
				placeholder='John Doe'
				error={errors.fullname?.message}
				{...register('fullname')}
			/>

			<InputField
				label='Email'
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
				className='placeholder:opacity-70'
				error={errors.password?.message}
				{...register('password')}
			/>

			<InputField
				label='Confirm Password'
				id='confirm-password'
				type='password'
				placeholder='••••••••'
				className='placeholder:opacity-70'
				error={errors.confirmPassword?.message}
				{...register('confirmPassword')}
			/>

			<Button disabled={isSubmitting} type='submit'>
				{isSubmitting ? 'Signing Up...' : 'Sign Up'}
			</Button>
		</form>
	)
}

export default RegisterForm
