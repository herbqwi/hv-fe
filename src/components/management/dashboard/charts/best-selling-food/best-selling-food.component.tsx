import './best-selling-food.css'
import pizzaImg from '../../../../../assets/pizza1.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger, faMugHot, faPizzaSlice } from '@fortawesome/free-solid-svg-icons';

const BestSellingFood = () => {
  return <ul className='best-selling-food'>
    <li><p className='food-info'><FontAwesomeIcon icon={faPizzaSlice} /> Meat Pizza</p><p>20 Units</p></li>
    <li><p className='food-info'><FontAwesomeIcon icon={faPizzaSlice} /> Pepperoni Pizza</p><p>16 Units</p></li>
    <li><p className='food-info'><FontAwesomeIcon icon={faBurger} /> Cheeseburger</p><p>15 Units</p></li>
    <li><p className='food-info'><FontAwesomeIcon icon={faMugHot} /> Hot Coffee</p><p>12 Units</p></li>
    <li><p className='food-info'><FontAwesomeIcon icon={faPizzaSlice} /> Margherita Pizza</p><p>9 Units</p></li>
    <li><p className='food-info'><FontAwesomeIcon icon={faPizzaSlice} /> Margherita Pizza</p><p>9 Units</p></li>
    <li><p className='food-info'><FontAwesomeIcon icon={faPizzaSlice} /> Margherita Pizza</p><p>9 Units</p></li>
  </ul>
}

export default BestSellingFood;