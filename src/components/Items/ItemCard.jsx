import React from 'react';
import installment from '../../img/installment.svg';
import marker from '../../img/marker-gray.svg';
import unliked from '../../img/unliked.svg';
import vip from '../../img/vip_1.svg';
import car from '../../img/delivery-car.png';
import main from '../../img/main.jpg';
import c from './ItemsStyle.module.css';


	const ItemCard = (props) => {
		let category = props.params.find(el => el.p === 'category');
		let area = props.params.find(el => el.p === 'area');
		let region = props.params.find(el => el.p === 'region')
		let date = Date.parse(props.date);
		let getCorrectDateParams = (dateParams) => {
			return dateParams.length === 1 ? `0${dateParams}` : dateParams
		}

		return (
			<>
				<li className={c.item}>

					<div className={c.imgAndIcons}>
						<img className={c.mainImg} src={main} alt={props.subject} />
						<div className={c.date}>
							Сегодня, {getCorrectDateParams(`${new Date(date).getHours()}`)}
							:{getCorrectDateParams(`${new Date(date).getMinutes()}`)}
						</div>
						<img src={unliked} className={c.unlikedImg} />
						<div className={c.icons}>
							<div className={c.iconWrap}><img src={vip} alt={'vip'} /><span> vip</span></div>
							<div className={c.iconWrap}><img src={installment} alt={'installment'} /><span> рассрочка</span></div>
							<div className={c.iconWrap}><img src={car} alt={'car'} /></div>
						</div>
					</div>

					<div className={c.textInfo}>
						<p className={c.category}>{category.vl}</p>
						<p className={c.subject}>{props.subject}</p>
						<p className={c.area}>
							<img src={marker} alt={'marker'} />
							{region.vl === 'Минск' && 'Минск, '}{area.vl}
						</p>
						<p className={c.price}>{(+props.price).toLocaleString('ru-RU')} р.</p>
					</div>

				</li>
			</>
		)
	}


export default ItemCard;