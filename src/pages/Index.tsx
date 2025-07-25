import { FinancialCard } from "@/components/FinancialCard";
import { ChatInterface } from "@/components/ChatInterface";
import { AlertsPanel } from "@/components/AlertsPanel";
import { ScenarioSimulator } from "@/components/ScenarioSimulator";
import { Button } from "@/components/ui/button";
import { 
  Wallet, 
  TrendingUp, 
  Home, 
  CreditCard, 
  Shield,
  Sparkles,
  User
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">FinPilot</h1>
                <p className="text-xs text-muted-foreground">AI Financial Assistant</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Secured</span>
              </div>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                Priya
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Good morning, Priya! 👋
          </h2>
          <p className="text-muted-foreground">
            Here's your financial overview and AI-powered insights.
          </p>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <FinancialCard
            title="Net Worth"
            amount="-₹90,000"
            change="+₹15,000 this month"
            trend="up"
            icon={<Wallet className="h-4 w-4" />}
            description="On track to positive by Q4 2025"
          />
          
          <FinancialCard
            title="Monthly SIP"
            amount="₹5,000"
            change="3 funds active"
            trend="up"
            icon={<TrendingUp className="h-4 w-4" />}
            description="Portfolio value: ₹60,000"
          />
          
          <FinancialCard
            title="Home Loan"
            amount="₹3.5L"
            change="₹28,500 EMI"
            trend="down"
            icon={<Home className="h-4 w-4" />}
            description="14.2 years remaining"
          />
          
          <FinancialCard
            title="Credit Score"
            amount="780"
            change="+5 points"
            trend="up"
            icon={<CreditCard className="h-4 w-4" />}
            description="Excellent rating"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Interface - Takes 2 columns */}
          <div className="lg:col-span-2">
            <ChatInterface />
          </div>
          
          {/* Right Sidebar */}
          <div className="space-y-6">
            <AlertsPanel />
            <ScenarioSimulator />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-border">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Your data is encrypted and never shared</span>
            </div>
            <div>
              FinPilot AI © 2024 • Powered by Advanced Financial Analytics
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
