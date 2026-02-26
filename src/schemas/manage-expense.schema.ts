import { TRANSACTION_CATEGORIES } from '@/constants/transaction-categories.constants'
import z from 'zod'

export const ManageExpenseSchema = z.object({
	transactionType: z.enum(['expense', 'income']),
	date: z.coerce
		.date({ message: 'Invalid Date Format' })
		.min(new Date('2000-01-01'), { message: 'Date must be after 2000-01-01' })
		.max(new Date(), { message: "Date must be before today's date" }),
	category: z.enum(TRANSACTION_CATEGORIES),
	description: z.string().trim().min(1, { message: 'Description is required' }),
	amount: z.coerce
		.number({ message: 'Amount is required' })
		.refine(val => val > 0, {
			message: 'Amount must be greater than 0',
		}),
})

export type ManageExpenseSchemaType = z.infer<typeof ManageExpenseSchema>
