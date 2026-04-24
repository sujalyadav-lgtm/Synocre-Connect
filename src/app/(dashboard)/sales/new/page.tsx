"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCustomers, getProducts, createOrder } from "@/lib/firebase/db";
import { Customer, Product } from "@/lib/types/schema";
import { useAuth } from "@/components/providers/auth-provider";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2 } from "lucide-react";

export default function NewSalePage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [lineItems, setLineItems] = useState<{ productId: string, quantity: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      const [custData, prodData] = await Promise.all([getCustomers(), getProducts()]);
      setCustomers(custData as Customer[]);
      setProducts(prodData as Product[]);
      setLoading(false);
    }
    fetchData();
  }, []);

  const addLineItem = () => {
    setLineItems([...lineItems, { productId: "", quantity: 1 }]);
  };

  const removeLineItem = (index: number) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const updateLineItem = (index: number, field: string, value: any) => {
    const newItems = [...lineItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setLineItems(newItems);
  };

  const calculateTotal = () => {
    return lineItems.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + ((product?.sellingPrice || 0) * item.quantity);
    }, 0);
  };

  const handleSubmit = async () => {
    if (!selectedCustomerId || lineItems.length === 0 || lineItems.some(i => !i.productId || i.quantity <= 0)) {
      toast({ title: "Validation Error", description: "Please complete all fields correctly.", variant: "destructive" });
      return;
    }

    setSaving(true);
    try {
      const items = lineItems.map(item => {
        const product = products.find(p => p.id === item.productId)!;
        return {
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: product.sellingPrice,
          totalPrice: product.sellingPrice * item.quantity,
        };
      });

      await createOrder({
        type: "sales_order",
        status: "confirmed",
        items,
        totalAmount: calculateTotal(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        createdBy: user?.uid || "unknown",
      });

      toast({ title: "Success", description: "Sales Order created successfully." });
      router.push("/sales");
    } catch (error) {
      toast({ title: "Error", description: "Failed to create order.", variant: "destructive" });
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Sales Order</h1>
        <p className="text-muted-foreground mt-1">Create a new quote or tax invoice.</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Customer Details</CardTitle></CardHeader>
        <CardContent>
          <Select value={selectedCustomerId} onValueChange={setSelectedCustomerId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a Customer" />
            </SelectTrigger>
            <SelectContent>
              {customers.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Line Items</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {lineItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4 border p-4 rounded-md">
              <div className="flex-1">
                <Select value={item.productId} onValueChange={(val) => updateLineItem(index, "productId", val)}>
                  <SelectTrigger><SelectValue placeholder="Select Product" /></SelectTrigger>
                  <SelectContent>
                    {products.map(p => <SelectItem key={p.id} value={p.id}>{p.name} - ${p.sellingPrice}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-24">
                <Input 
                  type="number" 
                  min="1" 
                  value={item.quantity} 
                  onChange={(e) => updateLineItem(index, "quantity", parseInt(e.target.value) || 1)} 
                />
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeLineItem(index)} className="text-destructive">
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={addLineItem} className="w-full">Add Product Line</Button>
          
          <div className="pt-6 flex justify-end">
            <div className="text-xl font-bold border-t pt-4 w-64 flex justify-between">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={saving || lineItems.length === 0 || !selectedCustomerId}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Confirm Sales Order
        </Button>
      </div>
    </div>
  );
}
