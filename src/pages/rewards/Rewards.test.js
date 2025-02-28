import { render, screen } from "@testing-library/react";
import Rewards from "./Rewards";

describe("Rewards Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state initially", () => {
    render(<Rewards />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
