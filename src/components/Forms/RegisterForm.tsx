'use client'

import { RegisetUser } from '@/actions/register'
import {
	RegisterUserSchema,
	RegisterUserSchemaType,
} from '@/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '../UI/Button'
import InputField from '../UI/InputField'

const RegisterForm = () => {
	const [serverError, setServerError] = useState<string | null>(null)
	const router = useRouter()

	const {
		register,
		handleSubmit,
		reset,
		clearErrors,
		formState: { errors, isSubmitting },
	} = useForm<RegisterUserSchemaType>({
		resolver: zodResolver(RegisterUserSchema),
	})

	const onSubmit: SubmitHandler<RegisterUserSchemaType> = async data => {
		const isSuccess = await RegisetUser(data, setServerError, router)
		if (isSuccess) {
			reset()
			clearErrors()
		}
	}

	return (
		<form
			className='mt-8 w-full flex flex-col gap-4'
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
				Sign Up
			</Button>
		</form>
	)
}

export default RegisterForm
