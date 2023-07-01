import React, {useState, useEffect} from 'react'
import Navigation from './Navigation/Navigation'
import classes from './TasksLayout.module.scss'
import TasksList from './TasksList/TasksList'
import {Switch, Route} from 'react-router-dom'
import AddTask from './AddTask/AddTask'
import FilterButtonNavigation from './FilterButtonNavigation/FilterButtonNavigation'

const TasksLayout = props => {
	const [reload, setReload] = useState(0)
	console.log('[TasksLayout]')
	console.log('Reload: '+ reload)

	useEffect(() => {
		if(reload === 1){
			setReload(2)
		}
		else if(reload === 2){
			setReload(0)
		}
	}, [reload])

	return (
		<div className={classes.TasksLayout}>
			<Navigation/>
			
			<Switch>
				<Route path="/addTask">
					<AddTask />
				</Route>
				{ reload === 0 && (
					<Switch>
						<Route replace path="/tasks/:filter?/:page?/:pageNum?" render={ props => {
							const params = props.match.params
							let pageNum = 1
							if(params.page === 'page'){
								let x = Number( params.pageNum )
								pageNum = (x < 1 || isNaN(x) ) ? 1 : x
							}
							let filter = params.filter
							filter = (filter === 'pending' || filter === 'done' || filter === 'recent') ? filter : 'upcoming'
							return (
								<>
									<FilterButtonNavigation active={filter}/>
									<TasksList info={{page: pageNum, filter}} {...props} refreshTasksLayout={refreshTasksLayout.bind(null, setReload)}/>
								</>
							)
						}} />
						<Route path="/" render={ props => {
							return (
								<>
									<FilterButtonNavigation active='upcoming'/>
									<TasksList info={{page: 1, filter: 'upcoming'}} {...props} refreshTasksLayout={refreshTasksLayout.bind(null, setReload)}/>
								</>
							)
						}} />
					</Switch>
				)}
				
			</Switch>
		</div>
	)
}
// Possible filter values: all, done, pending

const refreshTasksLayout = setReload => { setReload(1) }
export default TasksLayout