import * as constants from './../actions/constants'

const initialState = {
	tasks: []
}

const listTasks = (state, action) => {
	console.log('List Tasks')
	return state;
}

const tasksReducer = (state = initialState, action) => {
	switch (action.type) {
		case constants.LIST_TASKS: return listTasks(state, action)
		default: return state
	}
}

export default tasksReducer