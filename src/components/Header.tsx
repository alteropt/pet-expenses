import { HEADER_HEIGHT } from '@/config/styles-constants.config'
import Navigation from './Navigation'
import ProfileName from './ProfileInfo/ProfileName'
import Container from './UI/Container'
import Logo from './UI/Logo'

const Header = () => {
	return (
		<header
			className='py-2 border-b-3 border-b-gray-200 bg-white'
			style={{ minHeight: `${HEADER_HEIGHT}px` }}
		>
			<Container className='flex items-center justify-between'>
				<Logo />
				<Navigation />
				<ProfileName />
			</Container>
		</header>
	)
}

export default Header
