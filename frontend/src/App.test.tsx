import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders crypto price", () => {
  render(<App />);
  const linkElement = screen.getByText(/crypto price/i);
  expect(linkElement).toBeInTheDocument();
});
