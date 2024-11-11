import { render, screen } from "@testing-library/react";
import CurrencySelector from "./CurrencySelector";

describe("CurrencySelector", () => {
  test("renders all items", async () => {
    const items = ["TON", "USDT"];
    render(<CurrencySelector items={items} value="TON" onChange={() => {}} />);
    items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});
