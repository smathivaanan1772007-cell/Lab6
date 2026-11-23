// Step 1: Switch to Retail Database
use retailDB;

// Step 2: Insert Sample Sales Data
db.sales.insertMany([
  { storeId: "STORE_01", category: "Electronics", amount: 1200, date: new Date("2026-08-01") },
  { storeId: "STORE_01", category: "Apparel", amount: 300, date: new Date("2026-08-02") },
  { storeId: "STORE_02", category: "Electronics", amount: 1500, date: new Date("2026-08-02") },
  { storeId: "STORE_01", category: "Electronics", amount: 800, date: new Date("2026-08-03") },
  { storeId: "STORE_02", category: "Apparel", amount: 450, date: new Date("2026-08-04") }
]);

// Step 3: Aggregation Pipeline for Store Sales Insights
db.sales.aggregate([
  // Stage 1: Filter sales for Electronics category
  { $match: { category: "Electronics" } },
  
  // Stage 2: Group by store ID and compute aggregated metrics
  {
    $group: {
      _id: "$storeId",
      totalRevenue: { $sum: "$amount" },
      averageSale: { $avg: "$amount" },
      totalOrders: { $sum: 1 }
    }
  },
  
  // Stage 3: Sort by highest total revenue
  { $sort: { totalRevenue: -1 } }
]);
