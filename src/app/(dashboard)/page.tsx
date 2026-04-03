import BalanceCardsDashboardSection from '@/components/BalanceCardsDashboardSection'
import ChartsDashboardSection from '@/components/ChartsDashboardSection'
import Container from '@/components/UI/Container'

export default async function Home() {
	return (
		<Container className='pb-8'>
			<BalanceCardsDashboardSection className='mb-8' />
			<ChartsDashboardSection />
		</Container>
	)
}
