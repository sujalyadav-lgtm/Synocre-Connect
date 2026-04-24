
"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { erpAgent } from "@/ai/flows/erp-agent";
import { cn } from "@/lib/utils";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I am your Synocre AI co-pilot. How can I help you manage your business today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await erpAgent({ message: userText, history });
      setMessages(prev => [...prev, { role: 'assistant', content: result.reply }]);
      setHistory(result.history);
    } catch (error) {
      console.error("AI Agent Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 size-14 rounded-full shadow-2xl transition-all duration-300 z-50",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
      >
        <Sparkles className="size-6 mr-1" />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl flex flex-col z-50 border-primary/20 animate-in slide-in-from-bottom-5 duration-300">
          <CardHeader className="p-4 border-b bg-primary flex flex-row items-center justify-between">
            <div className="flex items-center gap-2 text-primary-foreground">
              <Sparkles className="size-5" />
              <CardTitle className="text-lg">Synocre AI</CardTitle>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="size-8 text-primary-foreground hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              <X className="size-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 p-0 overflow-hidden bg-muted/30">
            <ScrollArea className="h-full p-4" viewportRef={scrollRef}>
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "flex flex-col max-w-[85%]",
                      msg.role === 'user' ? "ml-auto items-end" : "items-start"
                    )}
                  >
                    <div className={cn(
                      "p-3 rounded-2xl text-sm shadow-sm",
                      msg.role === 'user' 
                        ? "bg-primary text-primary-foreground rounded-tr-none" 
                        : "bg-background text-foreground border rounded-tl-none"
                    )}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start gap-2">
                    <div className="bg-background border rounded-2xl rounded-tl-none p-3 shadow-sm">
                      <Loader2 className="size-4 animate-spin text-primary" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-4 border-t">
            <form onSubmit={handleSend} className="flex w-full gap-2">
              <Input
                placeholder="Ask about sales, stock, or CRM..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="size-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
