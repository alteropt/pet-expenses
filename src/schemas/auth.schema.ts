import z from 'zod'

export const RegisterUserSchema = z
	.object({
		fullname: z
			.string()
			.trim()
			.min(1, { message: 'Full name is required' })
			.refine(
				val => {
					return val.trim().split(/\s+/).length >= 2
				},
				{
					message: 'Full name must contain first and last name',
				},
			),
		email: z.email({ message: 'Invalid email address' }),
		password: z
			.string()
			.trim()
			.min(1, { message: 'Password is required' })
			.min(8, { message: 'Password must be at least 8 characters' }),
		confirmPassword: z
			.string()
			.trim()
			.min(1, { message: 'Password confirmation is required' }),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})

export const LoginUserSchema = z.object({
	email: z.email({ message: 'Invalid email address' }),
	password: z
		.string()
		.trim()
		.min(1, { message: 'Password is required' })
		.min(8, { message: 'Password must be at least 8 characters' }),
})

export type RegisterUserSchemaType = z.infer<typeof RegisterUserSchema>
export type LoginUserSchemaType = z.infer<typeof LoginUserSchema>
