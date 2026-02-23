import AuthFooter from '@/components/AuthUI/AuthFooter'
import AuthHeader from '@/components/AuthUI/AuthHeader'
import LoginForm from '@/components/Forms/LoginForm'
import { redirectIfSessionExists } from '@/lib/session-check'

const Login = async () => {
	await redirectIfSessionExists()
	return (
		<>
			<AuthHeader
				title='Welcome Back'
				subtitle='Sign in to your ExpenseTracker account'
			/>

			<LoginForm />

			<AuthFooter authType='login' />
		</>
	)
}

export default Login
