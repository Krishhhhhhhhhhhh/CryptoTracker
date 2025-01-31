import React, { useContext } from 'react'
import './navbar.css'
import logo from '../../assets/logo1.png'
import arrow from '../../assets/arrowsign.jpg';
import { CoinContext } from '../../context/CoinContext';
import { MdEuro } from "react-icons/md";
import { PiCurrencyInr } from "react-icons/pi";
import  {Link} from 'react-router-dom'


const navbar = () => {

  const {setCurrency}=useContext(CoinContext)

  const currencyHandler=(event)=>{
    switch(event.target.value)
    {
      case "usd":{
        setCurrency({name: "usd",symbol:"$"});
        break;
      }
      case "eur":{
        setCurrency({name: "eur",symbol:<MdEuro />});
        break;
      }
      case "inr":{
        setCurrency({name: "inr",symbol:<PiCurrencyInr />});
        break;
      }
      default:{
        setCurrency({name: "usd",symbol:"$"});
        break;
      }
    }

  }

  
  
      return (
    <div className='navbar'>
      <Link to={'/'}>
      <img src={logo} alt="" className='logo' />
      </Link>
      
      <ul>
      <Link to={'/'}><li>Home</li></Link>   
      <li>Features</li>
      <li>Pricing</li>
      <li>Blog</li>
      </ul>
      <div className='nav-right'>
        <select  onChange={currencyHandler}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="inr">INR</option>
        </select>
        <button>Sign up <img src={arrow} alt="" /></button>
      </div>
    </div>
  )
}

export default navbar
