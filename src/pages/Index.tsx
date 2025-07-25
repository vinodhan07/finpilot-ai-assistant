import { FinancialCard } from "@/components/FinancialCard";
import { ChatInterface } from "@/components/ChatInterface";
import { AlertsPanel } from "@/components/AlertsPanel";
import { ScenarioSimulator } from "@/components/ScenarioSimulator";
import { Navigation } from "@/components/Navigation";
import { FloatingChatbot } from "@/components/FloatingChatbot";
import { 
  Wallet, 
  TrendingUp, 
  Home, 
  CreditCard,
  Activity,
  DollarSign
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <Navigation />

      <div className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Good morning, Priya! 👋
              </h1>
              <p className="text-muted-foreground">
                Here's your financial overview and AI-powered insights.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Portfolio Performance</p>
                <p className="text-lg font-bold text-success">+8.2% ↗</p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                <Activity className="h-6 w-6 text-success" />
              </div>
            </div>
          </div>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-scale-in">
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Monthly Savings Rate</p>
                <p className="text-xl font-bold text-primary">40%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-success/5 border border-success/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Investment Growth</p>
                <p className="text-xl font-bold text-success">+12.5%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Home className="h-8 w-8 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Loan Progress</p>
                <p className="text-xl font-bold text-accent">27%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <FloatingChatbot />
    </div>
  );
}


