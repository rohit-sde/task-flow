import React, {useState, useEffect} from 'react';
import ListItem from './ListItem/ListItem'
import classes from './TasksList.module.scss'
import axios, {axiosAuth} from './../../../axios'

const TasksList = props => {

	const [tasks, setTasks] = useState([])
	
	useEffect(() => {
		// console.log(localStorage.getItem('task-cutive-token'))
		axios.post('/users/refreshToken', {
			refreshToken: localStorage.getItem('task-cutive-token')
		}).then(res => {
			// console.log(res.data)
			if(res.data.status){
				axios.get('/tasks',
					{
						headers: {
							Authorization: 'Bearer ' + res.data.data.accessToken
						}
					}
				)
				.then(res => {
					console.log(res.data)
					if(res.data.status){
						setTasks(res.data.data)
					}
				})
				.catch(e => {
					console.log(e)
				})
			}
		})
		.catch(e => {
			console.log(e)
		})
	}, [])


	return (
		<div className={classes.TasksList}>
			<ul>
				{
					tasks.map(task => (
						<ListItem task={task} key={task._id} />
					) )
				}
			</ul>
		</div>
	)
}

export default TasksList