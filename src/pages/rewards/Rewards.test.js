import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Rewards from "./Rewards";
import { fetchCustomerTransactions } from "../../server/RewardsCustomerApi";

jest.mock("../../server/RewardsCustomerApi", () => ({
  fetchCustomerTransactions: jest.fn(),
}));

jest.mock("../../utils/Usedebounce", () => (value) => value);

describe("Rewards Component", () => {
  const mockData = {
    "data": [
      {
        "customerName": "Anjali",
        "customerId": 4,
        "totalAmount": 345,
        "totalRewards": 395,
        "years": {
          "2024": {
            "months": {
              "February": { "id": "yhot7m9b0", "amount": 120, "rewards": 95 },
              "March": { "id": "e1zgqcchs", "amount": 225, "rewards": 300 }
            },
            "totalYearlyAmount": 345,
            "totalYearlyRewards": 395
          }
        }
      }
    ],
    "currentPage": 1,
    "totalPages": 1,
    "totalRecords": 1,
    "pageSize": 5
  };
  
  beforeEach(() => {
    fetchCustomerTransactions.mockResolvedValue(mockData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing and shows loading initially", async () => {
    render(<Rewards />);
    expect(screen.getByText("Rewards Offers")).toBeInTheDocument();
    await waitFor(() => expect(fetchCustomerTransactions).toHaveBeenCalled());
  });

  test("renders rewards table after data is fetched", async () => {
    render(<Rewards />);
    await waitFor(() => expect(fetchCustomerTransactions).toHaveBeenCalled());

    expect(screen.getByText("Rewards Offers")).toBeInTheDocument();
    expect(screen.getByText("Anjali")).toBeInTheDocument();
    
  });

  test("updates search input and triggers API call", async () => {
    render(<Rewards />);
    await waitFor(() => expect(fetchCustomerTransactions).toHaveBeenCalled());

    const searchInput = screen.getByPlaceholderText("Search customer name...");
    fireEvent.change(searchInput, { target: { value: "Anjali" } });

    await waitFor(() => expect(fetchCustomerTransactions).toHaveBeenCalledWith(
      expect.objectContaining({ search: "Anjali" })
    ));
  });

});
