import { useEffect, useState } from "react";
import { useCurrencies } from "../hooks/useCurrencies";
import { usePrices } from "../hooks/usePrices";
import CurrencySelector from "./CurrencySelector";
import Loader from "./Loader";

function Price() {
  const { currencies, error: currenciesError } = useCurrencies();
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const {
    result,
    isLoading,
    error: pricesError,
  } = usePrices(fromCurrency, toCurrency);

  useEffect(() => {
    if (currencies.length > 1) {
      setFromCurrency(currencies[0]);
      setToCurrency(currencies[1]);
    }
  }, [currencies]);

  const errorMessage = currenciesError || pricesError;
  if (!result || errorMessage) {
    return (
      <div className="flex-row h-30 w-50">
        <Loader errorMessage={errorMessage}></Loader>
      </div>
    );
  }

  return (
    <div className="flex flex-row h-30 w-50 items-center">
      <div className="ml-5 mt-5 mb-5">
        <CurrencySelector
          items={currencies}
          value={fromCurrency}
          onChange={setFromCurrency}
        ></CurrencySelector>
        <span className="ml-5 mr-5">/</span>
        <CurrencySelector
          items={currencies}
          value={toCurrency}
          onChange={setToCurrency}
        ></CurrencySelector>
        <span className="ml-5">=</span>
      </div>
      <div className="ml-5 w-20">{isLoading ? "..." : result.toFixed(4)}</div>
    </div>
  );
}

export default Price;
