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
        const month = new Date(date).toLocaleString("default", { month: "long" });
        const points = calculateRewardPoints(amount);

        // use customerId as the key to ensure uniqueness
        if (!rewards[customerId]) {
            rewards[customerId] = { 
              customerName, 
                customerId, 
                months: {}, 
                totalAmount: 0, 
                totalRewards: 0 
            };
        }

        // If the month entry doesn't exist, initialize it
        if (!rewards[customerId].months[month]) {
            rewards[customerId].months[month] = { 
                id: generateShortId(), 
                amount: 0, 
                rewards: 0 
            };
        }

        // calculating monthly amount and rewards
        rewards[customerId].months[month].amount += amount;
        rewards[customerId].months[month].rewards += points;

        // Update total amount and total rewards for the customer
        rewards[customerId].totalAmount += amount;
        rewards[customerId].totalRewards += points;
    });
    // Convert rewards object to an array before returning
    return Object.values(rewards);
};

  