import { TransactionType } from '@/types/transaction.type'
import { TransactionTypeEnum } from '@prisma/client'

export function getTotalByMonth(
	transactions: TransactionType[],
	month: number,
	year: number,
	type?: TransactionTypeEnum,
) {
	return transactions.reduce((total, transaction) => {
		const transactionDate = new Date(transaction.date)
		const isRightType = transaction.type === type
		const isSameMonth = transactionDate.getMonth() === month
		const isSameYear = transactionDate.getFullYear() === year

		if (!type && isSameMonth && isSameYear) return total + transaction.amount

		if (isRightType && isSameMonth && isSameYear) {
			return total + transaction.amount
		}

		return total
	}, 0)
}
