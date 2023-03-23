import FormLayout from '../components/FormLayout/FormLayout'
import clssses from'./App.module.scss'
import {Switch, Route} from 'react-router-dom'

function App() {
	return (
		<div className={clssses.App}>
			<Switch>
				<Route path="/login">
					<FormLayout formType="Login"/>
				</Route>
				<Route path="/signup">
					<FormLayout formType="Signup"/>
				</Route>
				<Route path="/resetPassword">
					<FormLayout formType="ResetPassword"/>
				</Route>
				<Route path="/">
					<FormLayout formType="Login"/>
				</Route>
			</Switch>
		</div>
	);
}

export default App;
