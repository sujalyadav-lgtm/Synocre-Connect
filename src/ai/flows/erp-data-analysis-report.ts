'use server';
/**
 * @fileOverview This file implements a Genkit flow for analyzing Synocre ERP data.
 * It generates an intelligent summary, identifies key trends, and highlights anomalies.
 *
 * - erpDataAnalysisReport - A function that triggers the ERP data analysis process.
 * - ErpDataAnalysisReportInput - The input type for the erpDataAnalysisReport function.
 * - ErpDataAnalysisReportOutput - The return type for the erpDataAnalysisReport function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ErpDataAnalysisReportInputSchema = z.object({
  erpData: z.string().describe('The raw or structured Synocre ERP data for analysis.'),
  reportType: z.string().optional().describe('Optional: The type of report or data being analyzed (e.g., "Sales Report", "Inventory Levels").'),
});
export type ErpDataAnalysisReportInput = z.infer<typeof ErpDataAnalysisReportInputSchema>;

const ErpDataAnalysisReportOutputSchema = z.object({
  summary: z.string().describe('An intelligent summary of the provided ERP data.'),
  keyTrends: z.array(z.string()).describe('A list of key trends identified in the ERP data.'),
  anomalies: z.array(z.string()).describe('A list of anomalies or unusual patterns detected in the ERP data.'),
});
export type ErpDataAnalysisReportOutput = z.infer<typeof ErpDataAnalysisReportOutputSchema>;

export async function erpDataAnalysisReport(input: ErpDataAnalysisReportInput): Promise<ErpDataAnalysisReportOutput> {
  return erpDataAnalysisReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'erpDataAnalysisReportPrompt',
  input: { schema: ErpDataAnalysisReportInputSchema },
  output: { schema: ErpDataAnalysisReportOutputSchema },
  prompt: `You are an AI business intelligence analyst for Synocre ERP data. Your task is to analyze the provided ERP data and generate an intelligent summary, identify key trends, and highlight any anomalies.

{{#if reportType}}
The data provided is for a {{reportType}}.
{{/if}}

ERP Data:
{{{erpData}}}

Please provide:
1. An intelligent summary of the data.
2. A list of key trends you observe.
3. A list of any anomalies or unusual patterns.`,
});

const erpDataAnalysisReportFlow = ai.defineFlow(
  {
    name: 'erpDataAnalysisReportFlow',
    inputSchema: ErpDataAnalysisReportInputSchema,
    outputSchema: ErpDataAnalysisReportOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
