
import { ai } from './genkit';
import { z } from 'genkit';

export const predictStockDemandTool = ai.defineTool(
  {
    name: 'predictStockDemand',
    description: 'Predicts the future demand for a specific product based on historical sales velocity.',
    inputSchema: z.object({
      productName: z.string().describe('The name of the product to forecast.'),
      forecastPeriodDays: z.number().default(30).describe('The number of days into the future to forecast (e.g., 30, 90).'),
    }),
    outputSchema: z.object({
      productName: z.string(),
      currentStock: z.number(),
      predictedDemand: z.number(),
      suggestedReorder: z.number(),
      dailyVelocity: z.string(),
      message: z.string(),
    }),
  },
  async (input) => {
    // In a real app, this would query a database. 
    // For this prototype, we'll use deterministic logic based on mock data patterns.
    const dailyVelocity = (Math.random() * 2 + 0.5).toFixed(2);
    const dailyVelocityNum = parseFloat(dailyVelocity);
    const predictedDemand = Math.ceil(dailyVelocityNum * input.forecastPeriodDays);
    
    // Using some fixed stock values for simulation
    const currentStock = Math.floor(Math.random() * 200);
    const deficit = predictedDemand > currentStock ? predictedDemand - currentStock : 0;

    return {
      productName: input.productName,
      currentStock,
      predictedDemand,
      suggestedReorder: deficit,
      dailyVelocity,
      message: deficit > 0 
        ? `Warning: Current stock of ${currentStock} is insufficient for predicted demand of ${predictedDemand}.` 
        : `Stock levels for ${input.productName} are healthy for the next ${input.forecastPeriodDays} days.`,
    };
  }
);

export const getSalesSummaryTool = ai.defineTool(
  {
    name: 'getSalesSummary',
    description: 'Aggregates sales revenue and order counts for a specific date range.',
    inputSchema: z.object({
      startDate: z.string().describe('The start date of the period in YYYY-MM-DD format.'),
      endDate: z.string().describe('The end date of the period in YYYY-MM-DD format.'),
    }),
    outputSchema: z.object({
      period: z.string(),
      orderCount: z.number(),
      totalRevenue: z.string(),
      topCustomer: z.string(),
    }),
  },
  async (input) => {
    // Simulated aggregation
    return {
      period: `${input.startDate} to ${input.endDate}`,
      orderCount: Math.floor(Math.random() * 50) + 10,
      totalRevenue: `$${(Math.random() * 50000 + 10000).toLocaleString()}`,
      topCustomer: 'Initech',
    };
  }
);

export const getCustomerInsightsTool = ai.defineTool(
  {
    name: 'getCustomerInsights',
    description: 'Retrieves CRM profile and lifetime value for a specific customer.',
    inputSchema: z.object({
      customerName: z.string().describe('The name of the customer to look up.'),
    }),
    outputSchema: z.object({
      name: z.string(),
      industry: z.string(),
      lifetimeValue: z.string(),
      totalOrders: z.number(),
      lastPurchaseDate: z.string(),
    }),
  },
  async (input) => {
    return {
      name: input.customerName,
      industry: 'Technology',
      lifetimeValue: '$145,000',
      totalOrders: 12,
      lastPurchaseDate: '2023-10-25',
    };
  }
);
