import { useEffect, useState } from "react";
import { fetchCurrencies } from "../services/api/prices";

export const useCurrencies = () => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getCurrencies = async (): Promise<void> => {
      try {
        const data = await fetchCurrencies();
        setCurrencies(data);
      } catch (error) {
        console.error("Error fetching currencies", error);
        setError("Error fetching currencies data");
      }
    };
    getCurrencies();
  }, []);

  return { currencies, error };
};
