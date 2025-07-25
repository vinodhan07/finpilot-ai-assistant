import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { FloatingChatbot } from "@/components/FloatingChatbot";
import { 
  TrendingUp, 
  TrendingDown, 
  Download,
  Calendar,
  DollarSign,
  PieChart,
  BarChart3,
  Target
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";

export default function Analytics() {
  // Net Worth Growth Data
  const netWorthData = [
    { month: 'Jan', netWorth: -120000, sip: 45000, loan: 365000 },
    { month: 'Feb', netWorth: -115000, sip: 50000, loan: 360000 },
    { month: 'Mar', netWorth: -108000, sip: 52000, loan: 355000 },
    { month: 'Apr', netWorth: -102000, sip: 55000, loan: 350000 },
    { month: 'May', netWorth: -95000, sip: 58000, loan: 345000 },
    { month: 'Jun', netWorth: -90000, sip: 60000, loan: 340000 },
  ];

  // Expense Breakdown Data
  const expenseData = [
    { name: 'Home Loan EMI', value: 28500, color: '#3b82f6' },
    { name: 'SIP Investments', value: 5000, color: '#10b981' },
    { name: 'Rent & Utilities', value: 8000, color: '#f59e0b' },
    { name: 'Food & Dining', value: 6000, color: '#ef4444' },
    { name: 'Transportation', value: 3000, color: '#8b5cf6' },
    { name: 'Shopping', value: 4000, color: '#06b6d4' },
    { name: 'Others', value: 2500, color: '#84cc16' },
  ];

  // SIP Performance Data
  const sipData = [
    { fund: 'HDFC Large Cap', invested: 20000, current: 22400, returns: 12 },
    { fund: 'Axis Mid Cap', invested: 25000, current: 26250, returns: 5 },
    { fund: 'SBI Small Cap', invested: 15000, current: 14100, returns: -6 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Financial Analytics</h1>
              <p className="text-muted-foreground">Deep insights into your financial health and growth patterns</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Last 6 months
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-scale-in">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Portfolio Growth</p>
                  <p className="text-2xl font-bold text-success">+8.2%</p>
                  <p className="text-xs text-muted-foreground">vs last quarter</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Monthly Savings</p>
                  <p className="text-2xl font-bold text-primary">₹30,000</p>
                  <p className="text-xs text-muted-foreground">40% of income</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Debt Reduction</p>
                  <p className="text-2xl font-bold text-warning">₹25,000</p>
                  <p className="text-xs text-muted-foreground">this quarter</p>
                </div>
                <TrendingDown className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Goal Progress</p>
                  <p className="text-2xl font-bold text-accent">73%</p>
                  <p className="text-xs text-muted-foreground">to positive net worth</p>
                </div>
                <Target className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Net Worth Trend */}
          <Card className="shadow-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Net Worth Progression
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={netWorthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      `₹${Math.abs(Number(value)).toLocaleString()}`, 
                      name === 'netWorth' ? 'Net Worth' : name === 'sip' ? 'SIP Value' : 'Loan Balance'
                    ]}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="netWorth" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    name="Net Worth"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sip" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="SIP Portfolio"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Expense Breakdown */}
          <Card className="shadow-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                Monthly Expense Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Amount']} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* SIP Performance */}
        <Card className="shadow-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              SIP Fund Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sipData.map((fund, index) => (
                <div key={fund.fund} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{fund.fund}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-muted-foreground">
                        Invested: ₹{fund.invested.toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Current: ₹{fund.current.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <Badge 
                    variant={fund.returns >= 0 ? "secondary" : "destructive"}
                    className="ml-4"
                  >
                    {fund.returns >= 0 ? '+' : ''}{fund.returns}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="mt-6 shadow-card animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🤖 AI Financial Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <h4 className="font-medium text-success mb-2">✅ Positive Trends</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• SIP investments showing consistent growth</li>
                  <li>• Debt-to-income ratio improving monthly</li>
                  <li>• Emergency fund target 60% achieved</li>
                </ul>
              </div>
              
              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <h4 className="font-medium text-warning mb-2">⚠️ Areas to Optimize</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Consider rebalancing small-cap allocation</li>
                  <li>• Monthly discretionary spending increased 15%</li>
                  <li>• Home loan prepayment opportunity available</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <FloatingChatbot />
    </div>
  );
}