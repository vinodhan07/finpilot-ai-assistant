import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  TrendingDown, 
  Calendar, 
  CheckCircle,
  X
} from "lucide-react";

interface Alert {
  id: string;
  type: "warning" | "error" | "info" | "success";
  title: string;
  description: string;
  timestamp: Date;
  actionable?: boolean;
}

export function AlertsPanel() {
  const alerts: Alert[] = [
    {
      id: "1",
      type: "warning",
      title: "SIP Performance Alert",
      description: "Your HDFC Small Cap fund has underperformed by 3% this quarter. Consider reviewing allocation.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      actionable: true,
    },
    {
      id: "2",
      type: "info",
      title: "EMI Reminder",
      description: "Home loan EMI of ₹28,500 is due in 3 days (March 1st). Ensure sufficient balance.",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      actionable: true,
    },
    {
      id: "3",
      type: "success",
      title: "Credit Score Update",
      description: "Great news! Your credit score improved from 775 to 780 this month.",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      actionable: false,
    },
    {
      id: "4",
      type: "error",
      title: "Expense Anomaly",
      description: "Your monthly expenses exceeded budget by ₹7,000. Check category breakdown.",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      actionable: true,
    },
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "error":
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      case "info":
        return <Calendar className="h-4 w-4 text-primary" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-success" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "warning":
        return "secondary";
      case "error":
        return "destructive";
      case "info":
        return "outline";
      case "success":
        return "secondary";
      default:
        return "outline";
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-primary" />
          Smart Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
          >
            <div className="flex-shrink-0 mt-0.5">
              {getAlertIcon(alert.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm font-medium text-foreground">
                  {alert.title}
                </h4>
                <Badge variant={getBadgeVariant(alert.type)} className="text-xs">
                  {alert.type}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">
                {alert.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {formatTimestamp(alert.timestamp)}
                </span>
                
                <div className="flex items-center gap-2">
                  {alert.actionable && (
                    <Button size="sm" variant="ghost" className="h-6 text-xs">
                      Review
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="text-center pt-2">
          <Button variant="ghost" size="sm" className="text-xs">
            View All Alerts
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}