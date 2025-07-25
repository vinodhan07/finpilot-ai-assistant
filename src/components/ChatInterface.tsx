import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Shield } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi Priya! I'm FinPilot, your AI financial assistant. I can help you with your investments, track expenses, and provide financial insights. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const mockResponses = {
    "net worth": "Based on your current financial position:\n\n💰 **Total Assets:** ₹2,00,000 (EPF)\n📈 **Investments:** ₹60,000 (SIP portfolio)\n🏠 **Liabilities:** ₹3,50,000 (Home loan)\n\n**Net Worth: -₹90,000**\n\nDon't worry! Your consistent SIP investments of ₹5,000/month are building wealth. With your income of ₹75,000, you're on track to positive net worth within 2 years.",
    "sip": "Great question! Let me simulate increasing your SIP by ₹2,000:\n\n📊 **Current SIP:** ₹5,000/month\n📊 **Proposed SIP:** ₹7,000/month\n\n**10-year projection (12% returns):**\n• Current path: ₹11.6 lakhs\n• With increase: ₹16.2 lakhs\n• **Extra wealth:** ₹4.6 lakhs!\n\nThis ₹2,000 increase could add significant value to your portfolio. Would you like me to show which funds to prioritize?",
    "expenses": "I noticed some unusual patterns in your expenses last month:\n\n⚠️ **Anomaly Alert:** Your expenses spiked to ₹52,000 (vs usual ₹45,000)\n\n**Breakdown:**\n• Food & Dining: ₹8,000 (+₹2,500)\n• Shopping: ₹12,000 (+₹4,000)\n• Entertainment: ₹5,000 (+₹500)\n\nThe increase seems to be from festival shopping and dining out. This is normal for the season, but let's monitor it going forward.",
    "default": "I can help you with:\n\n💰 Financial planning & net worth analysis\n📈 Investment simulations & SIP optimization\n🔍 Expense tracking & anomaly detection\n📊 Credit score monitoring\n⚠️ Payment reminders & alerts\n\nTry asking: 'What's my net worth?' or 'Simulate increasing my SIP'"
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

    // Generate bot response
    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase();
      let response = mockResponses.default;

      if (lowerInput.includes("net worth")) {
        response = mockResponses["net worth"];
      } else if (lowerInput.includes("sip") || lowerInput.includes("investment")) {
        response = mockResponses.sip;
      } else if (lowerInput.includes("expense") || lowerInput.includes("spike")) {
        response = mockResponses.expenses;
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputValue("");
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            FinPilot AI Assistant
          </CardTitle>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Shield className="h-3 w-3" />
            Encrypted & Secure
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "bot" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                
                {message.sender === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-accent text-accent-foreground">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ask about your finances, investments, or expenses..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              size="sm"
              variant="fintech"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Try: "What's my net worth?" or "Simulate my SIP returns"
          </p>
        </div>
      </CardContent>
    </Card>
  );
}