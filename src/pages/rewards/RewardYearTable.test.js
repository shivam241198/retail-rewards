import { render, screen } from "@testing-library/react";
import {RewardYearTable} from "./RewardYearTable";

describe("RewardYearTable Component", () => {
    const mockYears = {
        2024: {
            months: {
                January: { rewards: 100 },
                February: { rewards: 200 },
                March: { rewards: 300 },
            },
            totalYearlyRewards: 600
        },
        2023: {
            months: {
                April: { rewards: 150 },
                May: { rewards: 250 },
            },
            totalYearlyRewards: 400
        }
    };

    test("renders RewardYearTable correctly", () => {
        render(<RewardYearTable years={mockYears} />);

        // Check if the table is in the document
        expect(screen.getByTestId("reward-year-table")).toBeInTheDocument();

        // Check if column headers are rendered
        expect(screen.getByText("Year")).toBeInTheDocument();
        expect(screen.getByText("January")).toBeInTheDocument();
        expect(screen.getByText("February")).toBeInTheDocument();
        expect(screen.getByText("Total Rewards")).toBeInTheDocument();

        // Check if year rows are displayed
        expect(screen.getByText("2024")).toBeInTheDocument();
        expect(screen.getByText("2023")).toBeInTheDocument();

        // Check if rewards values are displayed correctly
        expect(screen.getByText("100")).toBeInTheDocument(); // January 2024
        expect(screen.getByText("200")).toBeInTheDocument(); // February 2024
        expect(screen.getByText("300")).toBeInTheDocument(); // March 2024
   
    });

});
