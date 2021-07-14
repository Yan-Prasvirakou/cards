import React, { useEffect, useState } from 'react';
import axios from 'axios';
import preloader from '../../img/preloader.svg';
import c from './ItemsStyle.module.css';
import ItemCard from './ItemCard';


const Items = () => {
	let [isDataLoaded, setIsDataLoaded] = useState(false);
	let [errors, setErrors] = useState([]);
	let [items, setItems] = useState([]);

	useEffect(() => {
		axios
			.get('https://cre-api.kufar.by/items-search/v1/engine/v1/search/rendered-paginated?lang=ru&size=3')
			.then(res => {
				setItems(res.data.ads)
				setIsDataLoaded(true)
			})
			.catch(e => {
				// console.log(e.response.data.error.message)
				setErrors([...errors, e.response.data.error.message])
			}
				
				// setIsLoadingFailed(true)
			)
	}, [])


	const Preloader = () => {
		return <div className={c.preloader}> <img src={preloader}/></div>
	}

	const ErrorBlock = () => {
		return <div className={c.error}><p>{errors[0]}</p></div>
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
			{!isDataLoaded && !errors[0] && <Preloader />}
			{errors[0]  && <ErrorBlock/>}
		</>
	)

}


export default Items;