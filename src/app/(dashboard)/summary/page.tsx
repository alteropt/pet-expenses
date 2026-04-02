import Container from '@/components/UI/Container'
import TransactionChart from '@/components/Charts/TransactionChart'
import { getUserId } from '@/lib/getUserId'
import prisma from '@/lib/prisma'
import { TransactionTypeEnum } from '@prisma/client'

const SummaryPage = async () => {
	const userId = await getUserId()
	if (!userId) throw new Error('User not found')

	const transactions = await prisma.transaction.findMany({
		where: {
			userId: userId,
		},
		orderBy: { date: 'desc' },
	})

	return (
		<Container>
			<div className='flex gap-1 justify-around'>
				<TransactionChart
					data={transactions}
					transactionType={TransactionTypeEnum.EXPENSE}
				/>
				<TransactionChart
					data={transactions}
					transactionType={TransactionTypeEnum.INCOME}
				/>
			</div>
		</Container>
	)
}

export default SummaryPage
