import { useState, useEffect } from "react";

// Custom hook to debounce a value, delaying updates until a specified time has passed
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value); // State to store the debounced value

    useEffect(() => {
        // Set a timeout to update the debounced value after the specified delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup function to clear the timeout if value or delay changes
        return () => clearTimeout(handler);
    }, [value, delay]); // Re-run effect when `value` or `delay` changes

    return debouncedValue; // Return the debounced value
};

export default useDebounce; // Export the custom hook
