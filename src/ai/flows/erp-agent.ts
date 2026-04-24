
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { 
  predictStockDemandTool, 
  getSalesSummaryTool, 
  getCustomerInsightsTool 
} from '../tools';

export const erpAgent = ai.defineFlow(
  {
    name: 'erpAgent',
    inputSchema: z.object({
      message: z.string(),
      history: z.array(z.any()).optional(),
    }),
    outputSchema: z.object({
      reply: z.string(),
      history: z.array(z.any()),
    }),
  },
  async (input) => {
    const { history, text } = await ai.chat({
      model: 'googleai/gemini-1.5-flash',
      system: `You are the Synocre ERP Assistant. Today is ${new Date().toISOString().split('T')[0]}. 
      You have access to tools that fetch live business data (Sales, Inventory, CRM).
      Use them to answer user questions about business performance, stock levels, and customer insights.
      Always encourage reorder drafts if stock is low.`,
      history: input.history,
      tools: [predictStockDemandTool, getSalesSummaryTool, getCustomerInsightsTool],
    }).send(input.message);

    return {
      reply: text,
      history: history,
    };
  }
);
