import React, { useContext, useEffect ,useState} from 'react'
import './coin.css'
import {useParams} from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/linechart/linechart';




const coin = () => {

  const {coinid}= useParams();
  const [coindata,setcoindata]=useState();
  const [historicaldata,sethistoricaldata]=useState();
  const {currency}=useContext(CoinContext)

  const fetchCoindata=async()=>{

    const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch(`https://api.coingecko.com/api/v3/coins/${coinid}`, options)
  .then(res => res.json())
  .then(res => setcoindata(res))
  .catch(err => console.error(err));
  }

   const fetchHistoricaldata= async()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-YAPeF1fLKnaP8YKQH7CK3SmA'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinid}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
    
      .then(res => res.json())
      .then(res => sethistoricaldata(res))
      .catch(err => console.error(err));
   }
    
  useEffect(()=>{

    fetchCoindata();
    fetchHistoricaldata(); 
  },[currency])


  if(coindata && historicaldata)
  {
    return (
      
        <div className="coin">
          <div className="coin-name">
            <img src={coindata.image.large} alt="" />
            <p><b>{coindata.name} ({coindata.symbol.toUpperCase()})</b></p>
          </div>
          <div className="coin-chart">
           <LineChart historicaldata={historicaldata}/>
          </div>
          <div className="coin-info">
            <ul>
              <li>Crypto Market Rank</li>
              <li>{coindata.market_cap_rank}</li>
            </ul>
            <ul>
              <li>Current Price</li>
              <li>{currency.symbol}{coindata.market_data.current_price[currency.name].toLocaleString()}</li>
            </ul>
            <ul>
              <li>Market Cap</li>
              <li>{currency.symbol}{coindata.market_data.market_cap[currency.name].toLocaleString()}</li>
            </ul>
            <ul>
              <li>24 Hour High</li>
              <li>{currency.symbol}{coindata.market_data.high_24h[currency.name].toLocaleString()}</li>
            </ul>
            <ul>
              <li>24 Hour Low</li>
              <li>{currency.symbol}{coindata.market_data.low_24h[currency.name].toLocaleString()}</li>
            </ul>
          </div>

        </div>
      
    )

  }else{
    return (
      
        <div className="spinner">
          <div className="spin"></div>
          
        </div>
      
    )


  }
  
}

export default coin
