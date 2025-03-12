import Table from "../../components/table"; // Importing the custom Table component
import { months } from "../../utils/Helper";
import "./rewardYearTable.scss"; // Importing styles

export const RewardYearTable = ({ years }) => {
    // Defining table columns with month names and total rewards
    const columns = [
        { key: "year", label: "Year" }, // Column for the year
        ...months.map((month) => ({
            key: month,
            label: month,
            render: (value) => value || "-", // Render '-' if no reward data available
        })),
        { key: "totalYearlyRewards", label: "Total Rewards" } // Column for total rewards per year
    ];

    // Transforming the years object into an array for the Table component
    const data = Object.entries(years).map(([year, data]) => ({
        year, // Assigning the year value
        ...Object.fromEntries(
            Object.keys(data.months).map((month) => [month, data.months[month]?.rewards || "-"]) // Extracting monthly rewards, defaulting to '-'
        ),
        totalYearlyRewards: data.totalYearlyRewards // Assigning total yearly rewards
    }));

    return (
        <div className="rewardYearTable"> {/* Wrapper div for styling */}
            <Table
                columns={columns}
                data={data}
                testId="reward-year-table"
                controllerDisable={true} // Disabling sorting and pagination
            />
        </div>
    );
};
