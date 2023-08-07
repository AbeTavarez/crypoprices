import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Price(props) {
  const [coin, setCoin] = useState(null);

  const params = useParams();
  const { symbol } = params;

  const url = `https://rest.coinapi.io/v1/exchangerate/${symbol}/USD?apiKey=${process.env.REACT_APP_COINAPI_KEY}`;

  const getCoin = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setCoin(data);
    } catch (e) {
      console.log("ERROR FETCHING DATA", e);
    }
  };

  // runs as soon as the component mounts
  useEffect(() => {
    getCoin();
  }, []);

  // show the fetched data
  const loaded = () => {
    return (
      <div>
        <h1>
          {coin.asset_id_base}/{coin.asset_id_quote}
        </h1>
        <h2>{coin.rate}</h2>
      </div>
    );
  };

  // show a loading message
  const loading = () => <h1>Loading...</h1>;

  return (
    <div>
      <section>{coin ? loaded() : loading()}</section>
     
      <section>
        <h1>Crypo News</h1>
      <p>
        Global payments giant PayPal (PYPL) is entering the cryptocurrency
        market with its own U.S. dollar-pegged stablecoin, PayPal USD (PYUSD),
        the company announced on Monday. The Ethereum-based token will soon be
        available to PayPal users in the U.S. This is the first time a major
        financial company is issuing its own stablecoin. Users can transfer
        PYUSD between PayPal and supported external digital wallets, use the
        tokens to pay for goods and services or convert any of PayPal's
        supported cryptocurrencies to and from PYUSD.
      </p>
      </section>
    </div>
  );
}
