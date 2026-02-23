import Image from 'next/image'

type AuthHeaderProps = {
	title: string
	subtitle: string
}

const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
	return (
		<>
			<Image
				src='/logo.svg'
				alt='logo'
				width={48}
				height={48}
				className='rounded-lg mb-4'
			/>
			<h2 className='font-bold text-2xl mb-2'>{title}</h2>
			<p className='opacity-70'>{subtitle}</p>
		</>
	)
}

export default AuthHeader
