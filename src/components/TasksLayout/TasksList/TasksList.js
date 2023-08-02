import React, {useState, useEffect} from 'react'
import ListItem from './ListItem/ListItem'
import classes from './TasksList.module.scss'
import {axiosAuth} from './../../../axios'
import CircularLoader from './../../UI/Loader/CircularLoader/CircularLoader'
import Pagination from './../../UI/Pagination/Pagination'

const TasksList = props => {
	const tasksIS = {
		data: [],
		totalCount: 0,
		fetched: false
	}
	const [tasks, setTasks] = useState( tasksIS )
	// console.log('---------------------------------')
	// console.log({...tasks})
	
	useEffect(() => {
		if( !tasks.fetched ) {
			// setTasks( {...tasksIS} )
			let queryParams = {
				perPage: props.info.perPage,
				page: props.info.page,
				filter: props.info.filter
			}
			// if(props.info.filter === 'done' || props.info.filter === 'pending'){
			// 	queryParams.isCompleted = (props.info.filter === 'done') ? true : false
			// }
			// if(props.info.filter === 'upcoming'){
			// 	queryParams.filter = 'upcoming'
			// }
			// queryParams = Object.keys(queryParams).map(key => {
			// 	return `${key}=${queryParams[key]}`
			// })
			// queryParams = queryParams.join('&')
			queryParams = Object.keys(queryParams).map(key => `${key}=${queryParams[key]}`).join('&')
	
			axiosAuth( (axios) => {
				axios.get('tasks?' + queryParams)
					.then(res => {
						// console.log(res.data)
						if(res.data.status){
							setTasks({
								data: res.data.data,
								totalCount: res.data.totalCount,
								fetched: true
							})
						}
					})
					.catch(e => {
						// console.log(e)
					})
			})
		}
		
		// console.log('[TasksList] useEffect')
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tasks.fetched])
	useEffect( () => {
		setTasks( {...tasksIS} )
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.info.page, props.info.filter, props.info.perPage])


	return (
		<div className={classes.TasksList}>
			{ !tasks.fetched ? (
					<div className={classes.LoaderCon}>
						<CircularLoader />
					</div>
				) : ( tasks.data.length > 0 ? (
					<>
						<ul>
							{
								tasks.data.map(task => (
									<ListItem
										key={task._id}
										task={task}
										tasks={tasks}
										setTasks={setTasks}
										refreshTasksLayout={props.refreshTasksLayout}
										setEditTaskState={props.setEditTaskState}/>
								) )
							}
						</ul>
						{ tasks.totalCount > props.info.perPage && (
							<Pagination
								total={tasks.totalCount}
								// total={21}
								current={props.info.page}
								perPage={props.info.perPage}
								filter={props.info.filter}
								defaultFilter={props.info.defaultFilter}/>
						)}
					</>
					) : (
						<div className={classes.NoTaskAvailable}>
							<div>No task available.</div>
						</div>
					)
				)
			}
		</div>
	)
}

export default TasksList