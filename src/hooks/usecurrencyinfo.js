import { useState, useEffect, useId } from 'react';

// Your original useCurrencyInfo hook (unchanged)
function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    if (!currency) return;
    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setData(data[currency] || {}))
      .catch((err) => {
        setData({});
        console.error("Failed to fetch currency data:", err);
      });
  }, [currency]);

  return data;
}

export default useCurrencyInfo;