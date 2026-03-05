'use server'

import prisma from '@/lib/prisma'
import { ManageTransactionSchema } from '@/schemas/manage-expense.schema'
import { TransactionType } from '@/types/transaction.type'
import { revalidatePath } from 'next/cache'

export async function editTransaction(
	data: Omit<TransactionType, 'createdAt' | 'userId'>,
) {
	const parsedData = ManageTransactionSchema.parse(data)

	try {
		const transaction = prisma.transaction.update({
			where: {
				id: data.id,
			},
			data: {
				amount: parsedData.amount,
				category: parsedData.category,
				description: parsedData.description,
				date: parsedData.date,
				type: parsedData.type,
			},
		})

		revalidatePath('/expenses')

		return { success: true, transaction }
	} catch (error) {
		return { success: false, error }
	}
}
