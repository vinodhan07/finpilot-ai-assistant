import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User,
  Minimize2,
  Maximize2
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi Priya! 👋 I'm your FinPilot AI assistant. I can help you with financial planning, investment analysis, and expense tracking. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const mockResponses = {
    "net worth": "📊 **Your Current Net Worth**: -₹90,000\n\n**Assets:**\n• EPF Balance: ₹2,00,000\n• SIP Portfolio: ₹60,000\n\n**Liabilities:**\n• Home Loan: ₹3,50,000\n\n💡 **Good news!** You're on track to reach positive net worth by Q3 2025 with your current SIP strategy.",
    "sip": "📈 **SIP Analysis & Simulation**\n\nCurrent: ₹5,000/month across 3 funds\nPortfolio Value: ₹60,000\n\n**If you increase to ₹7,000/month:**\n• 5-year projection: ₹6.2L (vs ₹4.4L current)\n• Extra wealth: ₹1.8L\n\nRecommendation: Increase allocation to large-cap funds for stability.",
    "expenses": "💰 **Expense Analysis**\n\nLast month spike: ₹52,000 (↑₹7,000)\n\n**Breakdown:**\n• Dining: +₹2,500\n• Shopping: +₹4,000\n• Entertainment: +₹500\n\n**Insight:** Festival season spending. Consider setting monthly budget alerts.",
    "credit": "🏆 **Credit Score: 780** (Excellent!)\n\n**Recent Changes:**\n• +5 points this month\n• On-time EMI payments\n• Low credit utilization\n\n**Tips:**\n• Keep utilization below 30%\n• Consider a premium credit card\n• Monitor monthly for fraud",
    "default": "I can help you with:\n\n💰 Net worth & portfolio analysis\n📈 SIP simulations & recommendations\n💳 Credit score insights\n📊 Expense tracking & alerts\n🎯 Financial goal planning\n\nTry asking: 'What's my net worth?' or 'Simulate SIP increase'"
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase();
      let response = mockResponses.default;

      if (lowerInput.includes("net worth") || lowerInput.includes("wealth")) {
        response = mockResponses["net worth"];
      } else if (lowerInput.includes("sip") || lowerInput.includes("investment") || lowerInput.includes("increase")) {
        response = mockResponses.sip;
      } else if (lowerInput.includes("expense") || lowerInput.includes("spending") || lowerInput.includes("budget")) {
        response = mockResponses.expenses;
      } else if (lowerInput.includes("credit") || lowerInput.includes("score")) {
        response = mockResponses.credit;
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1200);

    setInputValue("");
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-glow bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 animate-float"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-in-right">
      <Card className={`w-80 shadow-glow border-0 ${isMinimized ? 'h-16' : 'h-96'} transition-all duration-300`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              FinPilot AI
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            </CardTitle>
            
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8 p-0"
              >
                {isMinimized ? (
                  <Maximize2 className="h-3 w-3" />
                ) : (
                  <Minimize2 className="h-3 w-3" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="flex flex-col h-80 p-0">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.sender === "bot" && (
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          <Bot className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div
                      className={`max-w-[85%] rounded-lg p-2 text-xs ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>
                    
                    {message.sender === "user" && (
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                          <User className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="border-t p-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about finances..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="text-xs"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  size="sm"
                  className="px-3"
                >
                  <Send className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}