'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteTransaction(transactionId: string) {
	await prisma.transaction.delete({
		where: {
			id: transactionId,
		},
	})
	revalidatePath('/expenses')
}
