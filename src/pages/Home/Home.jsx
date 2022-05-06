import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Home.scss'

function Home() {
	let [launchpads, setLaunchpads] = useState([])

	let url = 'https://api.spacexdata.com/v4/launchpads'

	let getLaunchpads = () => {
		axios
			.get(url)
			.then((res) => {
				let launchpads = res.data

				launchpads.forEach((launchpad) => {
					if (launchpad.launches.length === 0) {
						launchpad.launches = ['No launches']
					} else {
						launchpad.launches = launchpad.launches.slice(0, 3)
					}
				})
				setLaunchpads(launchpads)
			})
			.catch((err) => {
				console.error(`Error: ${err}`)
			})
	}

	useEffect(() => {
		getLaunchpads()
	})

	return (
		<div className="spacex">
			<h1 className="header">SpaceX Launchpads</h1>
			<ul>
				{launchpads.map((launchpad) => {
					return (
						<li key={launchpad.id}>
							<h2 className="launch-name">{launchpad.full_name}</h2>
							<p>Locality: {launchpad.locality}</p>
							<p>Region: {launchpad.region}</p>
							<p>TZ: {launchpad.timezone}</p>
							<p>LAT: {launchpad.latitude}</p>
							<p>LONG: {launchpad.longitude}</p>
							<p>Launch Attempts: {launchpad.launch_attempts}</p>
							<p>Launch Successes: {launchpad.launch_successes}</p>
							<p>Status: {launchpad.status}</p>
							Launches:{' '}
							<ul>
								{launchpad.launches.map((launch) => {
									return (
										<li key={launch} className="link-spacex">
											{launch === 'No launches' ? (
												<p>{launch}</p>
											) : (
												<Link className='spacexlink' to={`/detail/${launch}`}>{launch}</Link>
											)}
										</li>
									)
								})}
							</ul>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default Home
