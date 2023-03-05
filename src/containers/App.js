import FormBody from '../components/FormBody/FormBody';
import clssses from'./App.module.scss';

function App() {
	return (
		<div className={clssses.App}>
			<FormBody formType="Login"/>
		</div>
	);
}

export default App;
