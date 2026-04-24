import { ai } from './genkit';
import { z } from 'genkit';
import { getProducts, getOrders, getCustomers } from '../lib/local-db';

export const checkStockLevelTool = ai.defineTool(
  {
    name: 'checkStockLevel',
    description: 'Retrieves the current stock level, cost price, and status of a specific product from the inventory database.',
    inputSchema: z.object({
      productNameOrSku: z.string().describe('The exact or partial name/SKU of the product to look up.'),
    }),
    outputSchema: z.object({
      productName: z.string(),
      sku: z.string(),
      currentStock: z.number(),
      lowStockThreshold: z.number(),
      status: z.string(),
      costPrice: z.number(),
      sellingPrice: z.number(),
    }),
  },
  async (input) => {
    const products = await getProducts();
    const query = input.productNameOrSku.toLowerCase();
    
    const product = products.find(p => 
      p.name.toLowerCase().includes(query) || p.sku.toLowerCase().includes(query)
    );

    if (!product) {
      throw new Error(`Product not found matching: ${input.productNameOrSku}`);
    }

    const isLowStock = product.currentStock <= product.lowStockThreshold;

    return {
      productName: product.name,
      sku: product.sku,
      currentStock: product.currentStock,
      lowStockThreshold: product.lowStockThreshold,
      status: isLowStock ? 'LOW STOCK WARNING' : 'HEALTHY',
      costPrice: product.costPrice,
      sellingPrice: product.sellingPrice,
    };
  }
);

export const getFinancialSummaryTool = ai.defineTool(
  {
    name: 'getFinancialSummary',
    description: 'Aggregates sales revenue and expenses to calculate real-time net profit.',
    inputSchema: z.object({}), // No inputs needed
    outputSchema: z.object({
      totalRevenue: z.number(),
      totalExpenses: z.number(),
      netProfit: z.number(),
      salesOrderCount: z.number(),
      purchaseOrderCount: z.number(),
    }),
  },
  async () => {
    const orders = await getOrders();
    
    const salesOrders = orders.filter(o => o.type === "sales_order" && o.status === "confirmed");
    const purchaseOrders = orders.filter(o => o.type === "purchase_order" && o.status === "fulfilled");
    
    const totalRevenue = salesOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalExpenses = purchaseOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    
    return {
      totalRevenue,
      totalExpenses,
      netProfit: totalRevenue - totalExpenses,
      salesOrderCount: salesOrders.length,
      purchaseOrderCount: purchaseOrders.length,
    };
  }
);

export const getCustomerInsightsTool = ai.defineTool(
  {
    name: 'getCustomerInsights',
    description: 'Retrieves CRM profile for a specific customer.',
    inputSchema: z.object({
      customerName: z.string().describe('The name or email of the customer to look up.'),
    }),
    outputSchema: z.object({
      name: z.string(),
      email: z.string(),
      industry: z.string(),
      status: z.string(),
    }),
  },
  async (input) => {
    const customers = await getCustomers();
    const query = input.customerName.toLowerCase();
    
    const customer = customers.find(c => 
      c.name.toLowerCase().includes(query) || c.email.toLowerCase().includes(query)
    );

    if (!customer) {
      throw new Error(`Customer not found matching: ${input.customerName}`);
    }

    return {
      name: customer.name,
      email: customer.email,
      industry: customer.industry,
      status: customer.status,
    };
  }
);
