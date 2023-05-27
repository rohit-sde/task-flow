import authReducer from './reducers/authReducer'
import tasksReducer from './reducers/tasksReducer'

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

export default store