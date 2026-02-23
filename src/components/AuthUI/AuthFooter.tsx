import Link from 'next/link'

type AuthFooterProps = {
	authType: 'register' | 'login'
}

const AuthFooter = ({ authType }: AuthFooterProps) => {
	return (
		<>
			<div className='w-full flex justify-center relative my-5'>
				<span className='text-gray-400 before:content-[""] before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0 before:w-4/9 before:h-px before:bg-gray-400 after:content-[""] after:absolute after:top-1/2 after:-translate-y-1/2 after:right-0 after:w-4/9 after:h-px after:bg-gray-400'>
					OR
				</span>
			</div>
			<div className='flex gap-1 items-center'>
				<p className='opacity-70'>
					{authType === 'register'
						? 'Already have an account?'
						: "Don't have an account?"}
				</p>
				<Link
					href={authType === 'register' ? '/login' : '/register'}
					className='text-(--active) font-medium'
				>
					{authType === 'register' ? 'Sign In' : 'Sign Up'}
				</Link>
			</div>
		</>
	)
}

export default AuthFooter
