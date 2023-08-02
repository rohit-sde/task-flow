import React, {useState, useEffect} from 'react'
import classes from './Profile.module.scss'
import CircularLoader from '../../UI/Loader/CircularLoader/CircularLoader'
import { axiosAuth } from '../../../axios'

const Profile = props => {
	const [info, setInfo] = useState([])
	
	useEffect(() => {
		axiosAuth(axios => {
			axios.get('users/getProfile')
				.then(res => {
					if(res.data.status){
						const data = res.data.data
						setInfo([
							{text: 'First Name', value: data.fname},
							{text: 'Last Name', value: data.lname},
							{text: 'Email', value: data.email},
							{text: 'Joined on', value: (new Date(data.created_at)).toLocaleString() }
						])
					}
					else{
						// console.log(res)
					}
				})
				.catch(e => {
					// console.log(e)
				})
		})
	}, [])

	return (
		<div className={classes.Profile}>
			<div>
				<h2 className={classes.Heading}>Profile</h2>
			</div>
			<div className={classes.MainCon}>
				{info.length === 0 ? (
					<CircularLoader/>
				) : (
					<div className={classes.DivTable}>
						{info.map(v => (
							<div key={v.text}>
								<div>{v.text}</div>
								<div>{v.value}</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default Profile