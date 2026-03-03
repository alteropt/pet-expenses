'use server'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import {
	ManageTransactionSchema,
	ManageTransactionSchemaType,
} from '@/schemas/manage-expense.schema'
import { getServerSession } from 'next-auth'

export async function addTransaction(
	data: ManageTransactionSchemaType,
	userId?: string,
) {
	if (!userId) {
		userId = (await getServerSession(authOptions))?.user.id

		if (!userId) {
			throw new Error('User not found')
		}
	}

	const parsedData = ManageTransactionSchema.parse(data)

	return await prisma.transaction.create({
		data: {
			amount: parsedData.amount,
			category: parsedData.category,
			description: parsedData.description,
			date: parsedData.date,
			type: parsedData.transactionType,
			userId: userId,
		},
	})
}
