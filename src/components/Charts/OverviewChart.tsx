'use client'

import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from 'recharts'

const COLORS = ['#FF6B81', '#3A86FF', '#FFBE0B', '#38B000', '#9D4EDD']

const OverviewChart = ({
	data,
	title,
}: {
	data: {
		name: string
		value: number
	}[]
	title: string
}) => {
	return (
		<div className='w-full h-100 bg-white p-6 rounded-xl shadow-sm'>
			<h3 className='text-lg font-semibold mb-6'>{title}</h3>

			<ResponsiveContainer width='100%' height='90%'>
				<PieChart>
					<Pie
						data={data}
						cx='50%'
						cy='50%'
						innerRadius={60}
						outerRadius={100}
						paddingAngle={2}
						dataKey='value'
					>
						{data.map((_, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
					<Tooltip
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
					<Legend />
				</PieChart>
			</ResponsiveContainer>
		</div>
	)
}

export default OverviewChart
