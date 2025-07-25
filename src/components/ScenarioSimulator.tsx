import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingUp, PiggyBank } from "lucide-react";

export function ScenarioSimulator() {
  const [sipAmount, setSipAmount] = useState(5000);
  const [investmentYears, setInvestmentYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const months = investmentYears * 12;
    const futureValue = sipAmount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    const totalInvestment = sipAmount * months;
    const returns = futureValue - totalInvestment;
    
    return {
      futureValue: Math.round(futureValue),
      totalInvestment,
      returns: Math.round(returns),
    };
  };

  const result = calculateSIP();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Financial Scenarios
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sip" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sip">SIP Calculator</TabsTrigger>
            <TabsTrigger value="loan">Loan Impact</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sip" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="sipAmount">Monthly SIP Amount (₹)</Label>
                  <Input
                    id="sipAmount"
                    type="number"
                    value={sipAmount}
                    onChange={(e) => setSipAmount(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="years">Investment Period (Years)</Label>
                  <Input
                    id="years"
                    type="number"
                    value={investmentYears}
                    onChange={(e) => setInvestmentYears(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="returns">Expected Returns (%)</Label>
                  <Input
                    id="returns"
                    type="number"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                
                <Button variant="fintech" className="w-full">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Simulate Investment
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-4 rounded-lg border">
                  <h4 className="font-semibold text-foreground mb-3">Projection Results</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Investment:</span>
                      <span className="font-medium">₹{result.totalInvestment.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Expected Returns:</span>
                      <span className="font-medium text-success">₹{result.returns.toLocaleString()}</span>
                    </div>
                    
                    <div className="border-t pt-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Future Value:</span>
                        <span className="font-bold text-lg text-primary">₹{result.futureValue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
                  💡 <strong>Smart Tip:</strong> Increasing your SIP by just ₹1,000 could add 
                  ₹{Math.round((calculateSIP().futureValue - result.futureValue) / 1000).toLocaleString()}K 
                  to your wealth!
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="loan" className="space-y-4">
            <div className="bg-gradient-to-br from-destructive/5 to-warning/5 p-4 rounded-lg border">
              <h4 className="font-semibold text-foreground mb-3">Current Loan Impact</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Outstanding Amount:</span>
                  <span className="font-medium">₹3,50,000</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Monthly EMI:</span>
                  <span className="font-medium">₹28,500</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Interest Rate:</span>
                  <span className="font-medium">8.5% p.a.</span>
                </div>
                
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Remaining Tenure:</span>
                    <span className="font-bold">14 years 2 months</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
              💡 <strong>Prepayment Tip:</strong> An extra ₹5,000 annually could save ₹1.2L in interest 
              and reduce tenure by 2 years!
            </div>
            
            <Button variant="outline" className="w-full">
              <PiggyBank className="h-4 w-4 mr-2" />
              Explore Prepayment Options
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}