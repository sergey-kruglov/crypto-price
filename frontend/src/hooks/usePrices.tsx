import { useEffect, useRef, useState } from "react";
import { fetchPrices } from "../services/api/prices";

export const usePrices = (fromCurrency: string, toCurrency: string) => {
  const [result, setResult] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const pricesAbortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const getPrices = async (): Promise<void> => {
      if (!fromCurrency || !toCurrency) return;

      pricesAbortControllerRef.current?.abort();
      pricesAbortControllerRef.current = new AbortController();

      if (fromCurrency === toCurrency) {
        setIsLoading(false);
        return setResult(1);
      }

      setIsLoading(true);

      try {
        const data = await fetchPrices(
          fromCurrency,
          toCurrency,
          pricesAbortControllerRef.current.signal
        );
        setResult(data.price);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        console.error("Error fetching price data", error);
        setError("Error fetching price data");
      }

      setIsLoading(false);
    };

    getPrices();
  }, [fromCurrency, toCurrency]);

  return { result, isLoading, error };
};
