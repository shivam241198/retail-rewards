import { generateShortId } from "./Helper";

export const calculateRewardPoints = (amount) => {
    let points = 0;

    if (amount > 100) {
        points += (amount - 100) * 2 + 50; // 2 points for every $ over 100 + 1 point for $50-$100
    } else if (amount > 50) {
        points += amount - 50; // 1 point for every $50-$100
    }

    return points;
};

export const calculateCustomerRewards = (transactions) => {
  const rewards = {}; // Store rewards using customerId as the key

  transactions.forEach(({ customerName, amount, date, customerId }) => {
      const transactionDate = new Date(date);
      const year = transactionDate.getFullYear();
      const month = transactionDate.toLocaleString("default", { month: "long" });
      const points = calculateRewardPoints(amount);

      // Ensure customer entry exists
      if (!rewards[customerId]) {
          rewards[customerId] = {
              customerName,
              customerId,
              years: {},  // Structure data by year
              totalAmount: 0,
              totalRewards: 0
          };
      }

      // Ensure year entry exists for the customer
      if (!rewards[customerId].years[year]) {
          rewards[customerId].years[year] = { 
              months: {}, 
              totalYearlyRewards: 0, // Initialize yearly rewards
              totalYearlyAmount: 0    // Initialize yearly amount
          };
      }

      // Ensure month entry exists within the year
      if (!rewards[customerId].years[year].months[month]) {
          rewards[customerId].years[year].months[month] = {
              id: generateShortId(),
              amount: 0,
              rewards: 0
          };
      }

      // Update monthly rewards
      rewards[customerId].years[year].months[month].amount += amount;
      rewards[customerId].years[year].months[month].rewards += points;

      // Update yearly rewards and amount
      rewards[customerId].years[year].totalYearlyRewards += points;
      rewards[customerId].years[year].totalYearlyAmount += amount;

      // Update total amount and total rewards for the customer
      rewards[customerId].totalAmount += amount;
      rewards[customerId].totalRewards += points;
  });

  // Convert rewards object to an array before returning
  return Object.values(rewards);
};

