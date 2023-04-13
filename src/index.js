import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './containers/App'
import {BrowserRouter} from 'react-router-dom'
import reportWebVitals from './reportWebVitals'

import authReducer from './store/reducers/authReducer'
import tasksReducer from './store/reducers/tasksReducer'

import {Provider} from 'react-redux'
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
	auth: authReducer,
	task: tasksReducer
})

// eslint-disable-next-line no-unused-vars
const logger = store => {
	return next => {
		return action => {
			console.log(`[Middleware Dispatching]`, action)
			const result = next(action)
			console.log(`[MIddleware] next state`, store.getState() )
			return result
		}
	}
}

const store = createStore(reducers, composeEnhancers( applyMiddleware(thunk) ))

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();
