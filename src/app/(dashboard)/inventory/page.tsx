"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, PackagePlus, AlertTriangle, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getProducts, createProduct } from "@/lib/firebase/db";
import { Product } from "@/lib/types/schema";
import { useToast } from "@/hooks/use-toast";

const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  sku: z.string().min(3, "SKU is required"),
  costPrice: z.coerce.number().min(0, "Must be a positive number"),
  sellingPrice: z.coerce.number().min(0, "Must be a positive number"),
  currentStock: z.coerce.number().min(0, "Cannot be negative"),
  lowStockThreshold: z.coerce.number().min(0),
});

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      sku: "",
      costPrice: 0,
      sellingPrice: 0,
      currentStock: 0,
      lowStockThreshold: 10,
    },
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data as Product[]);
    } catch (error) {
      console.error("Failed to fetch products", error);
      toast({ title: "Error", description: "Failed to load products.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    try {
      await createProduct({
        ...values,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      toast({ title: "Success", description: "Product added successfully." });
      setDialogOpen(false);
      form.reset();
      fetchProducts();
    } catch (error) {
      toast({ title: "Error", description: "Failed to add product.", variant: "destructive" });
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground mt-1">Track products, stock levels, and set low-stock thresholds.</p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-foreground hover:bg-foreground/90 text-background">
              <PackagePlus className="size-4 mr-2" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Enter the details of the new item being added to the catalog.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl><Input placeholder="Ergonomic Chair" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="sku" render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl><Input placeholder="FURN-CHR-001" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="costPrice" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cost Price ($)</FormLabel>
                      <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="sellingPrice" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Selling Price ($)</FormLabel>
                      <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="currentStock" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Initial Stock</FormLabel>
                      <FormControl><Input type="number" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="lowStockThreshold" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Low Stock Alert At</FormLabel>
                      <FormControl><Input type="number" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Product
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Product Catalog</CardTitle>
            <CardDescription>All items currently tracked in your warehouse.</CardDescription>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name or SKU..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">SKU</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead className="text-right">Cost Price</TableHead>
                <TableHead className="text-right">Selling Price</TableHead>
                <TableHead className="text-right">Current Stock</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <Loader2 className="size-6 animate-spin mx-auto text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ) : filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    No products found.
                  </TableCell>
                </TableRow>
              ) : filteredProducts.map((product) => {
                const isLowStock = product.currentStock <= product.lowStockThreshold;
                return (
                  <TableRow key={product.id}>
                    <TableCell className="font-mono text-xs">{product.sku}</TableCell>
                    <TableCell className="font-semibold">{product.name}</TableCell>
                    <TableCell className="text-right">${Number(product.costPrice).toFixed(2)}</TableCell>
                    <TableCell className="text-right">${Number(product.sellingPrice).toFixed(2)}</TableCell>
                    <TableCell className="text-right font-medium">
                      {product.currentStock}
                    </TableCell>
                    <TableCell className="text-center">
                      {isLowStock ? (
                        <Badge variant="destructive" className="flex w-fit mx-auto items-center gap-1">
                          <AlertTriangle className="size-3" /> Low Stock
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-background">In Stock</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
