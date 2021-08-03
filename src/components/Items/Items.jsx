import React, { useEffect, useState } from 'react';
import preloader from '../../img/preloader.svg';
import c from './ItemsStyle.module.css';
import ItemCard from './ItemCard';


const Items = () => {
	let [isDataLoaded, setIsDataLoaded] = useState(false);
	let [error, setError] = useState('');
	let [items, setItems] = useState([]);

	
	async function getData() {
		try {
			const res = await fetch('https://cre-api.kufar.by/items-search/v1/engine/v1/search/rendered-paginated?lang=ru&size=3')

			if (!res.ok) {
				console.log('failed')
				throw new Error("HTTP status " + res.status);
			} else {
				let json = await res.json();
				setItems(json.ads)
				setIsDataLoaded(true)
			}
		} catch (err) {
			setError(err)
		}
	}

	useEffect(() => {
		getData()
	}, [])


	const Preloader = () => {
		return <div className={c.preloader}> <img src={preloader}/></div>
	}

	const ErrorBlock = () => {
		return <div className={c.error}><p>Failed to Load</p></div>
	}


	const itemCards = items
		.map(card =>
			<ItemCard
				date={card.list_time} key={card.ad_id} subject={card.subject}
				price={card.price_byn} params={card.ad_parameters}
			/>
		)

		
	return (
		<>
			{isDataLoaded && <ul className={c.itemsList}>{itemCards}</ul>}
			{!isDataLoaded && !error && <Preloader />}
			{error && <ErrorBlock/>}
		</>
	)

}


export default Items;