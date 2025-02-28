export const purchaseTransactions = async () => {
    // fetching customer purchase data
    const data = new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          
            { "id": 1, "customerId": 10, "customerName": "Keerthi", "amount": 145, "date": "2024-01-12" },
            { "id": 2, "customerId": 3, "customerName": "Rashid", "amount": 200, "date": "2024-01-10" },
            { "id": 3, "customerId": 1, "customerName": "Shiva", "amount": 120, "date": "2024-01-15" },
            { "id": 4, "customerId": 7, "customerName": "Rahul", "amount": 200, "date": "2024-01-18" },
            { "id": 5, "customerId": 13, "customerName": "Deepa", "amount": 105, "date": "2024-01-19" },
            { "id": 6, "customerId": 3, "customerName": "Rashid", "amount": 180, "date": "2024-01-22" },
            { "id": 7, "customerId": 2, "customerName": "Karthi", "amount": 110, "date": "2024-01-25" },
            { "id": 8, "customerId": 14, "customerName": "Jatin", "amount": 195, "date": "2024-01-27" },
            { "id": 9, "customerId": 11, "customerName": "Pooja", "amount": 100, "date": "2024-01-28" },
            { "id": 10, "customerId": 5, "customerName": "Vikram", "amount": 130, "date": "2024-01-30" },
            { "id": 11, "customerId": 8, "customerName": "Meera", "amount": 190, "date": "2024-02-02" },
            { "id": 12, "customerId": 5, "customerName": "Vikram", "amount": 160, "date": "2024-02-05" },
            { "id": 13, "customerId": 10, "customerName": "Keerthi", "amount": 125, "date": "2024-02-08" },
            { "id": 14, "customerId": 12, "customerName": "Arjun", "amount": 185, "date": "2024-02-12" },
            { "id": 15, "customerId": 15, "customerName": "Kavya", "amount": 115, "date": "2024-02-15" },
            { "id": 16, "customerId": 2, "customerName": "Karthi", "amount": 150, "date": "2024-02-18" },
            { "id": 17, "customerId": 1, "customerName": "Shiva", "amount": 75, "date": "2024-02-20" },
            { "id": 18, "customerId": 9, "customerName": "Surya", "amount": 95, "date": "2024-02-22" },
            { "id": 19, "customerId": 13, "customerName": "Deepa", "amount": 250, "date": "2024-02-25" },
            { "id": 20, "customerId": 4, "customerName": "Anjali", "amount": 95, "date": "2024-02-28" },
            { "id": 21, "customerId": 2, "customerName": "Karthi", "amount": 90, "date": "2024-03-05" },
            { "id": 22, "customerId": 7, "customerName": "Rahul", "amount": 175, "date": "2024-03-08" },
            { "id": 23, "customerId": 4, "customerName": "Anjali", "amount": 250, "date": "2024-03-10" },
            { "id": 24, "customerId": 6, "customerName": "Divya", "amount": 140, "date": "2024-03-12" },
            { "id": 25, "customerId": 7, "customerName": "Rahul", "amount": 210, "date": "2024-03-18" },
            { "id": 26, "customerId": 1, "customerName": "Shiva", "amount": 140, "date": "2024-03-22" },
            { "id": 27, "customerId": 11, "customerName": "Pooja", "amount": 170, "date": "2024-03-25" },
            { "id": 28, "customerId": 11, "customerName": "Pooja", "amount": 230, "date": "2024-03-28" },
            { "id": 29, "customerId": 12, "customerName": "Arjun", "amount": 220, "date": "2024-03-30" }
          ]
        );
      }, 1000); 
    });

    return data;
  };
  