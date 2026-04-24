
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Loader2, FileText, TrendingUp, AlertCircle, RefreshCw } from "lucide-react";
import { erpDataAnalysisReport, ErpDataAnalysisReportOutput } from "@/ai/flows/erp-data-analysis-report";
import { erpSampleDataString } from "@/lib/mock-data";
import { toast } from "@/hooks/use-toast";

export default function ReportsPage() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<ErpDataAnalysisReportOutput | null>(null);
  const [erpData, setErpData] = useState(erpSampleDataString);
  const [reportType, setReportType] = useState("Monthly Performance");

  const generateReport = async () => {
    if (!erpData.trim()) {
      toast({
        title: "Input required",
        description: "Please provide ERP data for analysis.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await erpDataAnalysisReport({
        erpData,
        reportType
      });
      setReport(result);
    } catch (error) {
      console.error("Report generation failed:", error);
      toast({
        title: "Analysis Failed",
        description: "Could not generate report. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Intelligent Reporting</h1>
        <p className="text-muted-foreground mt-1">AI-driven insights, trends, and anomaly detection from Synocre ERP.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <Card className="shadow-sm border-primary/10">
            <CardHeader>
              <CardTitle className="text-lg">Data Source</CardTitle>
              <CardDescription>Input the ERP data segment you want to analyze.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">Report Type</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monthly Performance">Monthly Performance</SelectItem>
                    <SelectItem value="Inventory Health">Inventory Health</SelectItem>
                    <SelectItem value="Sales Trends">Sales Trends</SelectItem>
                    <SelectItem value="Customer Loyalty">Customer Loyalty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">Raw ERP Data</label>
                <Textarea 
                  value={erpData} 
                  onChange={(e) => setErpData(e.target.value)}
                  placeholder="Paste ERP data here..."
                  className="min-h-[250px] font-mono text-sm resize-none"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={generateReport} 
                className="w-full bg-primary hover:bg-primary/90 shadow-md h-12 text-md font-semibold"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" /> Generate AI Report
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="xl:col-span-3">
          {report ? (
            <div className="space-y-6 animate-in zoom-in-95 duration-500">
              <Card className="shadow-md border-primary/20 bg-white/50 backdrop-blur-sm">
                <CardHeader className="bg-primary/5 border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <Sparkles className="size-5" /> AI Insight Summary
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setReport(null)}>
                      <RefreshCw className="size-4 mr-2" /> Clear
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-bold flex items-center gap-2">
                      <FileText className="size-4 text-primary" /> Executive Summary
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {report.summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="font-bold flex items-center gap-2 text-emerald-600">
                        <TrendingUp className="size-4" /> Key Trends
                      </h3>
                      <ul className="space-y-2">
                        {report.keyTrends.map((trend, i) => (
                          <li key={i} className="text-sm bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/10 flex items-start gap-2">
                            <span className="size-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                            {trend}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-bold flex items-center gap-2 text-destructive">
                        <AlertCircle className="size-4" /> Anomalies Detected
                      </h3>
                      <ul className="space-y-2">
                        {report.anomalies.map((anomaly, i) => (
                          <li key={i} className="text-sm bg-destructive/5 p-3 rounded-lg border border-destructive/10 flex items-start gap-2">
                            <span className="size-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
                            {anomaly}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/30 pt-4 flex justify-end">
                  <Button variant="outline" size="sm">Download PDF</Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-xl bg-muted/30">
              <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
                <Sparkles className="size-10" />
              </div>
              <h2 className="text-xl font-bold">Ready to Analyze</h2>
              <p className="text-muted-foreground max-w-sm mt-2">
                Configure your data source on the left and click "Generate AI Report" to see intelligent business insights.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
