
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(104,84,198,0.1),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(46,110,181,0.1),transparent_50%)]" />
      
      <Card className="w-full max-w-md relative z-10 border-none shadow-2xl overflow-hidden bg-card/80 backdrop-blur">
        <div className="h-2 bg-primary w-full" />
        <CardHeader className="space-y-1 text-center pt-10">
          <div className="flex justify-center mb-6">
            <div className="size-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-4xl shadow-xl shadow-primary/20">
              S
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">Synocre Connect</CardTitle>
          <CardDescription>
            Secure enterprise access to Synocre ERP
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="alex.sterling@synocre.com" 
                required 
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs text-primary font-semibold hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                className="h-12"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 bg-primary hover:bg-primary/90 text-md font-semibold"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="mr-2 size-5" /> Sign In Securely
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 bg-muted/30 p-8 pt-6 border-t">
          <p className="text-xs text-center text-muted-foreground leading-relaxed">
            By logging in, you agree to Synocre's <span className="font-semibold text-foreground underline cursor-pointer">Security Policy</span> and <span className="font-semibold text-foreground underline cursor-pointer">Terms of Use</span>.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
