import React, { useContext, useEffect,useState } from 'react'
import './home.css'
import { CoinContext } from '../../context/CoinContext' 
import { Link } from 'react-router-dom'



const home = () => {
  const {allCoin,currency}= useContext(CoinContext);
  const [displayCoin,setDisplayCoin]=useState([]);
  const [input, setInput]=useState('');

  // while performing search search
  const inputHandler=(event)=>{
    setInput(event.target.value);

    if(event.target.value==" ")    //if we add insert some coin name in search it will show result
                                    //but if we clear our search it will go back to show top 10 results.
    {
      setDisplayCoin(allCoin); 
    }
  }
//prevent webpage from reloading after performing btc search
  const searchHandler=async(event)=>{
    event.preventDefault();
    const coins=await allCoin.filter((item)=>
    {
     return  item.name.toLowerCase().includes(input.toLowerCase())
    })
    setDisplayCoin(coins);

  }


  useEffect(()=>{
    setDisplayCoin(allCoin);
  },[allCoin])
 

  
  return (
    <div className='home'>
      <div className='hero'>
        <h1>Largest <br/> Crypto Marketplace</h1>
        <p>Welcome to worlds largest cryptocurrency marketplace.Sign up to explore 
          more about cryptos
        </p>
        <form onSubmit={searchHandler}>
          <input onChange={inputHandler} list='coinlist' value={input} type="text" placeholder='Search crypto' required />

          <dataList id='coinlist'>
            {allCoin.map((item,index)=>(<option key={index} value={item.name}/>))}
          </dataList>
          <button type='submit'>Search</button>
        </form>
      </div>
       <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{textAlign:"center"}}>24H Change</p>
          <p className='marketcap'>Market Cap</p>
        </div>
        {
          displayCoin.slice(0,10).map((item,index)=>(
            <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt="" />
                <p>{item.name +"- "+ item.symbol}</p>
              </div>
              <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
              <p className={item.price_change_percentage_24h>0?"green":"red"}>{Math.floor(item.price_change_percentage_24h*100)/100}</p>
              <p className='marketcap'>{currency.symbol}{item.market_cap.toLocaleString()}</p>

            </Link>
          ))
        }
       </div>
      
    </div>
  )
}

export default home
