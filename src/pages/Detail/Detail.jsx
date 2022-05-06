import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Detail.scss'

function Detail() {
	let [launch, setLaunch] = useState([])
	let { id } = useParams()
	let url = 'https://api.spacexdata.com/v4/launches/' + id

	let getLaunch = () => {
		axios
			.get(url)
			.then((res) => {
				let launch = res.data
				launch.reused = launch.cores[0].reused
				setLaunch(launch)
			})
			.catch((err) => {
				console.error(`Error: ${err}`)
			})
	}

	useEffect(() => {
		getLaunch()
	})

	return (
		<div className="spacex">
			<h1 className="spacex-header">{launch.name}</h1>
			<p>Date UTC: {launch.date_utc}</p>
			<p>
				Details:
				{launch.details ? (
					<span> {launch.details}</span>
				) : (
					<span> No details available.</span>
				)}
			</p>
			<p>{launch.reused ? <p>Reused: True</p> : <p>Reused: False</p>}</p>
		</div>
	)
}

export default Detail
