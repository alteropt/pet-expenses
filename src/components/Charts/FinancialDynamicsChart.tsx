'use client'

import { MonthlyFinancialDynamicsData } from '@/lib/data-charts-calculations'
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

const FinancialDynamicsChart = ({
	data,
}: {
	data: MonthlyFinancialDynamicsData[]
}) => {
	return (
		<div className='w-full h-100 bg-white p-6 rounded-xl shadow-sm'>
			<h3 className='text-lg font-semibold mb-6'>Spending Trend</h3>
			<ResponsiveContainer width='100%' height='90%'>
				<LineChart data={data}>
					<CartesianGrid
						strokeDasharray='3 3'
						vertical={false}
						stroke='#F1F5F9'
					/>

					<XAxis
						dataKey='name'
						axisLine={false}
						tickLine={false}
						tick={{ fill: '#64748B', fontSize: 12 }}
						dy={10}
					/>

					<YAxis
						axisLine={false}
						tickLine={false}
						tick={{ fill: '#64748B', fontSize: 12 }}
						tickFormatter={val => `$${val}`}
					/>

					<Tooltip
						contentStyle={{
							borderRadius: '8px',
							border: 'none',
							boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
						}}
						formatter={(
							value: number | string | readonly (number | string)[] | undefined,
						) => {
							if (typeof value === 'number') {
								return `$${value.toFixed(2)}`
							}
							if (Array.isArray(value)) {
								const firstVal = Number(value[0]) || 0
								return `$${firstVal.toFixed(2)}`
							}
							const fallbackVal = Number(value) || 0
							return `$${fallbackVal.toFixed(2)}`
						}}
					/>

					<Legend
						verticalAlign='bottom'
						align='center'
						iconType='circle'
						wrapperStyle={{ paddingTop: '20px' }}
					/>

					<Line
						name='Income'
						type='monotone'
						dataKey='income'
						stroke='#10B981'
						strokeWidth={2.5}
						dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }}
						activeDot={{ r: 6 }}
					/>

					<Line
						name='Expenses'
						type='monotone'
						dataKey='expenses'
						stroke='#EF4444'
						strokeWidth={2.5}
						dot={{ r: 4, fill: '#EF4444', strokeWidth: 2, stroke: '#fff' }}
						activeDot={{ r: 6 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}

export default FinancialDynamicsChart
