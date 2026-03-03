import {
	EXPENSE_CATEGORIES,
	INCOME_CATEGORIES,
} from '@/constants/transaction-categories.constants'
import { TransactionTypeEnum } from '@prisma/client'
import * as z from 'zod'

export const ManageTransactionSchema = z.object({
	transactionType: z.enum(TransactionTypeEnum),
	date: z
		.date({ message: 'Invalid Date Format' })
		.min(new Date('2000-01-01'), { message: 'Date must be after 2000-01-01' })
		.max(new Date(), { message: "Date must be before today's date" }),
	category: z.enum([...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES]),
	description: z.string().trim().min(1, { message: 'Description is required' }),
	amount: z.number({ message: 'Amount is required' }).refine(val => val > 0, {
		message: 'Amount must be greater than 0',
	}),
})

export type ManageTransactionSchemaType = z.infer<
	typeof ManageTransactionSchema
>
