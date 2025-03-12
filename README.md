
# Rewards Calculation System

## Project Overview

This project is a Rewards Calculation System built using React.js. It calculates reward points for customers based on their transactions and displays yearly reward summaries in a tabular format. The system includes pagination, sorting, and data organization for better usability.

## Features

1. Calculate rewards based on transaction amounts
2. Display reward summaries by month and year
3. Custom reusable table component with sorting and pagination
4. Debouncing mechanism for optimizing user inputs
5. Data transformation utilities for structured information

## Project Structure

/rewards-system
├── src
│   ├── components
│   │   ├── Table.js
│   │   ├── RewardYearTable.js
│   ├── pages
│   │   ├── Rewards.js
│   ├── utils
│   │   ├── Helper.js
│   ├── hooks
│   │   ├── useDebounce.js
│   ├── App.js
│   ├── index.js
│   ├── styles
│   │   ├── table.scss
│   │   ├── rewardYearTable.scss
└── README.md

## Logic Explanation

1. Rewards Calculation Logic (calculateCustomerRewards)
Uses a tiered points system:
   1. $50-$100 → 1 point per $1
   2. Over $100 → 2 points per $1
Structures data by year and month for tabular representation.

2. Reusable Table Component (Table.js)
   1. Displays dynamic columns and data
   2. Supports sorting and pagination

3. Rewards Page (Rewards.js)
   1. Fetches transaction data
   2. Uses calculateCustomerRewards() to generate structured reward data 
   3. Passes data to RewardYearTable.js for display

4. Debouncing Hook (useDebounce.js)
Used for optimizing search inputs to prevent unnecessary API calls.


This project efficiently calculates and displays customer rewards using a tiered points system, ensuring fair and structured reward distribution. By organizing data by year and month, it provides a clear breakdown of customer transactions and earned points. The implementation of reusable components (such as Table and RewardYearTable) and optimized state management ensures scalability and maintainability

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.