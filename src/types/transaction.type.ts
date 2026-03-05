import { TransactionTypeEnum } from '@prisma/client'

export type TransactionType = {
	id: string
	createdAt: Date
	description: string
	amount: number
	date: Date
	type: TransactionTypeEnum
	userId: string
	category: string
}

