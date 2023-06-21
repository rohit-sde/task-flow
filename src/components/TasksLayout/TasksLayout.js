import React from 'react'
import Navigation from './Navigation/Navigation'
import classes from './TasksLayout.module.scss'
import TasksList from './TasksList/TasksList'
import {Switch, Route} from 'react-router-dom'
import AddTask from './AddTask/AddTask'
import FilterButtonNavigation from './FilterButtonNavigation/FilterButtonNavigation'

const TasksLayout = props => {
	console.log('props')
	console.log(props)

	return (
		<div className={classes.TasksLayout}>
			<Navigation/>
			
			<Switch>
				<Route path="/addTask">
					<AddTask />
				</Route>
				<Route path="/tasks/:filter?/:page?/:pageNum?" render={ props => {
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
							<TasksList info={{page: pageNum, filter}} {...props}/>
						</>
					)
				}} />
				<Route path="/" render={ props => {
					return (
						<>
							<FilterButtonNavigation active='upcoming'/>
							<TasksList info={{page: 1, filter: 'upcoming'}} {...props} />
						</>
					)
				}} />
			</Switch>
		</div>
	)
}
// Possible filter values: all, done, pending
export default TasksLayout