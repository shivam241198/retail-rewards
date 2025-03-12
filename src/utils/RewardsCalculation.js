import { generateShortId } from "./Helper"; // Import function to generate a short unique ID

// Function to calculate reward points based on the transaction amount
export const calculateRewardPoints = (amount) => {
    let points = 0;

    if (amount > 100) {
        points += (amount - 100) * 2 + 50; // 2 points for every $ over 100 + 1 point for $50-$100
    } else if (amount > 50) {
        points += amount - 50; // 1 point for every dollar between $50-$100
    }

    return points; // Return the total calculated points
};

// Function to calculate customer rewards from transaction data
export const calculateCustomerRewards = (transactions) => {
    const rewards = {}; // Store rewards using customerId as the key

    // Iterate over each transaction to process rewards
    transactions.forEach(({ customerName, amount, date, customerId }) => {
        const transactionDate = new Date(date); // Convert transaction date string to Date object
        const year = transactionDate.getFullYear(); // Extract the year from the date
        const month = transactionDate.toLocaleString("default", { month: "long" }); // Extract month name
        const points = calculateRewardPoints(amount); // Calculate reward points for this transaction

        // Ensure customer entry exists in rewards data
        if (!rewards[customerId]) {
            rewards[customerId] = {
                customerName, // Store customer name
                customerId, // Store customer ID
                years: {},  // Structure data by year
                totalAmount: 0, // Initialize total amount spent by customer
                totalRewards: 0 // Initialize total rewards earned by customer
            };
        }

        // Ensure year entry exists for the customer
        if (!rewards[customerId].years[year]) {
            rewards[customerId].years[year] = { 
                months: {},  // Structure data by months within the year
                totalYearlyRewards: 0, // Initialize yearly rewards
                totalYearlyAmount: 0    // Initialize yearly amount spent
            };
        }

        // Ensure month entry exists within the year
        if (!rewards[customerId].years[year].months[month]) {
            rewards[customerId].years[year].months[month] = {
                id: generateShortId(), // Generate a unique ID for the monthly record
                amount: 0, // Initialize amount spent in this month
                rewards: 0 // Initialize reward points for this month
            };
        }

        // Update monthly rewards and amount
        rewards[customerId].years[year].months[month].amount += amount; // Add transaction amount to monthly total
        rewards[customerId].years[year].months[month].rewards += points; // Add reward points to monthly total

        // Update yearly rewards and amount
        rewards[customerId].years[year].totalYearlyRewards += points; // Add points to yearly total
        rewards[customerId].years[year].totalYearlyAmount += amount; // Add amount to yearly total

        // Update total amount and total rewards for the customer
        rewards[customerId].totalAmount += amount; // Update customer's total amount spent
        rewards[customerId].totalRewards += points; // Update customer's total reward points
    });

    // Convert rewards object to an array before returning
    return Object.values(rewards);
};
