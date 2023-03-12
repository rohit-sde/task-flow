import FormLayout from '../components/FormLayout/FormLayout';
import clssses from'./App.module.scss';

function App() {
	return (
		<div className={clssses.App}>
			<FormLayout formType="Login"/>
		</div>
	);
}

export default App;
