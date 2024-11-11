import { renderHook, waitFor } from "@testing-library/react";
import { fetchCurrencies } from "../services/api/prices";
import { useCurrencies } from "./useCurrencies";

jest.mock("../services/api/prices", () => ({
  fetchCurrencies: jest.fn(),
}));

describe("useCurrencies", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and sets currencies correctly", async () => {
    const mockCurrencies = ["USDT", "TON"];
    (fetchCurrencies as jest.Mock).mockResolvedValue(mockCurrencies);
    const { result } = renderHook(() => useCurrencies());
    await waitFor(() =>
      expect(result.current.currencies).toEqual(mockCurrencies)
    );
    await waitFor(() => expect(result.current.error).toBe(""));
  });

  it("sets error message when fetchCurrencies fails", async () => {
    (fetchCurrencies as jest.Mock).mockRejectedValue(new Error("API Error"));
    const { result } = renderHook(() => useCurrencies());
    await waitFor(() => expect(result.current.currencies).toEqual([]));
    await waitFor(() =>
      expect(result.current.error).toBe("Error fetching currencies data")
    );
  });
});
