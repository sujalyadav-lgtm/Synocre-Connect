"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, ShieldCheck } from "lucide-react";
import { setSession } from "@/lib/local-db";
import { useToast } from "@/hooks/use-toast";

// Default admin credentials — change these as needed
const ADMIN_EMAIL = "admin@synocre.com";
const ADMIN_PASSWORD = "admin123";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate a small delay for UX
    await new Promise(r => setTimeout(r, 600));

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setSession({ uid: "admin-uid-001", email: ADMIN_EMAIL });
      router.push("/");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Try admin@synocre.com / admin123",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

      <Card className="w-full max-w-md relative shadow-xl border border-border bg-background/95 backdrop-blur-sm">
        <CardHeader className="p-8 pb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 bg-foreground text-background flex items-center justify-center font-bold text-xl">
              S
            </div>
            <span className="font-bold text-xl tracking-tight">Synocre Connect</span>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription className="mt-1">
            Sign in to access your ERP dashboard.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-6">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                className="h-11"
                placeholder="admin@synocre.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                className="h-11"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full h-11 bg-foreground hover:bg-foreground/90 text-background font-semibold"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="mr-2 size-4" /> Sign In Securely
                </>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="px-8 py-5 border-t bg-muted/30">
          <p className="text-xs text-muted-foreground text-center w-full">
            Default credentials: <span className="font-semibold text-foreground">admin@synocre.com</span> / <span className="font-semibold text-foreground">admin123</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
