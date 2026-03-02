'use server'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { ManageTransactionSchemaType } from '@/schemas/manage-expense.schema'
import { TransactionT } from '@prisma/client'
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

	const transaction = await prisma.transaction.create({
		data: {
			amount: Number(data.amount),
			category: data.category,
			description: data.description,
			date: new Date(data.date),
			type: data.transactionType as TransactionT,
			userId: userId,
		},
	})

	return transaction
}
