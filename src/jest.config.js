module.exports = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    moduleNameMapper: {
        "^@pages/(.*)$": "<rootDir>/src/pages/rewards/Rewards.js", // Example alias
      }
  };
  