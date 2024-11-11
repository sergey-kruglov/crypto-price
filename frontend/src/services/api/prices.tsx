const API_URL = process.env.REACT_APP_PRICE_API_URL;

interface ApiResponse<T> {
  data?: T;
  success: boolean;
  error?: string;
}

function handleResponse<T>({ data, error }: ApiResponse<T>): T {
  if (error) throw new Error(error);
  if (!data) throw new Error("No data");

  return data;
}

export async function fetchCurrencies(): Promise<string[]> {
  const url = `${API_URL}/prices/currencies`;
  const response = await fetch(url);
  const data = (await response.json()) as ApiResponse<string[]>;

  return handleResponse<string[]>(data);
}

export interface PricesData {
  fromCurrency: string;
  toCurrency: string;
  price: number;
}

export async function fetchPrices(
  fromCurrency: string,
  toCurrency: string,
  signal?: AbortSignal | null
): Promise<PricesData> {
  const url = `${API_URL}/prices?from=${fromCurrency}&to=${toCurrency}`;
  const response = await fetch(url, { signal });
  const data = (await response.json()) as ApiResponse<PricesData>;

  return handleResponse<PricesData>(data);
}
