import { TransactionType } from '@/types/transaction.type'
import { TransactionTypeEnum } from '@prisma/client'

export function getTotalByMonth(
	transactions: TransactionType[],
	month: number,
	year: number,
	type: TransactionTypeEnum | 'total',
) {
	return transactions.reduce((total, transaction) => {
		const transactionDate = new Date(transaction.date)
		const isRightType = transaction.type === type
		const isSameMonth = transactionDate.getMonth() === month
		const isSameYear = transactionDate.getFullYear() === year

		if (isRightType && isSameMonth && isSameYear) {
			return total + transaction.amount
		}

		if (type === 'total' && isSameMonth && isSameYear) {
			if (transaction.type === TransactionTypeEnum.EXPENSE) {
				return total - transaction.amount
			} else {
				return total + transaction.amount
			}
		}

		return total
	}, 0)
}

export function getTotal(
	transactions: TransactionType[],
	type: TransactionTypeEnum | 'total',
) {
	return transactions.reduce((total, transaction) => {
		if (transaction.type === type) {
			return total + transaction.amount
		}

		if (type === 'total') {
			return transaction.type === TransactionTypeEnum.EXPENSE
				? total - transaction.amount
				: total + transaction.amount
		}

		return total
	}, 0)
}
