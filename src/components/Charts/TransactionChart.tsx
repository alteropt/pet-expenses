'use client'

import { TransactionType } from '@/types/transaction.type'
import { TransactionTypeEnum } from '@prisma/client'
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

const TransactionChart = ({
	data,
	transactionType,
}: {
	data: TransactionType[]
	transactionType: TransactionTypeEnum
}) => {
	const resultingData = data.reduce(
		(acc: { category: string; amount: number }[], transaction) => {
			if (transaction.type !== transactionType) return acc

			const existingCategory = acc.find(
				item => item.category === transaction.category,
			)

			if (existingCategory) {
				existingCategory.amount += transaction.amount
			} else {
				acc.push({
					category: transaction.category,
					amount: transaction.amount,
				})
			}

			return acc
		},
		[],
	)

	if (resultingData.length === 0) {
		return (
			<div className='mt-8 text-center w-1/2'>
				<h2 className='text-center font-medium text-2xl'>
					{transactionType.charAt(0).toUpperCase() +
						transactionType.slice(1).toLowerCase() +
						's'}{' '}
					Stats
				</h2>
				<p>
					No{' '}
					{transactionType.charAt(0).toUpperCase() +
						transactionType.slice(1).toLowerCase() +
						's'}{' '}
					found!
				</p>
			</div>
		)
	}

	return (
		<div className='w-full mt-8'>
			<h2 className='text-center font-medium text-2xl'>
				{transactionType.charAt(0).toUpperCase() +
					transactionType.slice(1).toLowerCase() +
					's'}{' '}
				Stats
			</h2>
			<ResponsiveContainer width='100%' height={300}>
				<BarChart
					data={resultingData}
					margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
				>
					<defs>
						<linearGradient id='colorAmount' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='5%' stopColor='#2563eb' stopOpacity={0.9} />
							<stop offset='95%' stopColor='#155dfc' stopOpacity={0.9} />
						</linearGradient>
					</defs>

					<CartesianGrid
						strokeDasharray='3 3'
						vertical={false}
						stroke='#e5e7eb'
					/>

					<XAxis
						dataKey='category'
						axisLine={false}
						tickLine={false}
						tick={{ fill: '#6b7280', fontSize: 12 }}
						dy={10}
					/>

					<YAxis
						axisLine={false}
						tickLine={false}
						tick={{ fill: '#6b7280', fontSize: 12 }}
					/>

					<Tooltip
						cursor={{ fill: '#f3f4f6' }}
						contentStyle={{
							borderRadius: '12px',
							border: 'none',
							boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
							borderColor: '#155dfc',
							backgroundColor: 'white',
						}}
						labelStyle={{ color: '#111827' }}
						formatter={(value: unknown) => [`${value}$`, 'Amount']}
					/>

					<Bar
						dataKey='amount'
						fill='url(#colorAmount)'
						radius={[6, 6, 0, 0]}
						maxBarSize={50}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

export default TransactionChart
