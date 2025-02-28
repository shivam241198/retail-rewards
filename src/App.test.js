import { render, screen } from "@testing-library/react";
import App from "./App";
// import Rewards from "./pages/rewards";

// jest.mock("./pages/rewards", () => () => <div data-testid="rewards-component">Rewards Component</div>);

test("renders Rewards component inside App", () => {
  render(<App />);
  
  // Check if the Rewards component is rendered
  const rewardsElement = screen.getByText("Rewards Offers");
  expect(rewardsElement).toBeInTheDocument();
});
