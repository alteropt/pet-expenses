import AuthFooter from '@/components/AuthUI/AuthFooter'
import AuthHeader from '@/components/AuthUI/AuthHeader'
import RegisterForm from '@/components/Forms/RegisterForm'
import { redirectIfSessionExists } from '@/lib/session-check'

const Register = async () => {
	await redirectIfSessionExists()

	return (
		<>
			<AuthHeader
				title='Create Account'
				subtitle='Start tracking your expenses today'
			/>

			<RegisterForm />

			<AuthFooter authType='register' />
		</>
	)
}

export default Register
