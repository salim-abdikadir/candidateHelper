"use client";
import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  RefreshCw,
  Home,
  ArrowLeft,
  Bug,
  Target,
  Users,
  MessageCircle,
  MapPin,
  Bot,
  DollarSign,
  Shield,
  Zap,
  Globe,
  Smartphone,
  Monitor,
  HelpCircle,
  BookOpen,
  FileText,
  ExternalLink,
  Plus,
  Filter,
  MoreHorizontal,
  SortAsc,
  SortDesc,
  CheckCircle,
  TrendingUp,
  BarChart3,
  Calendar,
  Clock,
  Phone,
  Mail,
  Navigation,
  Gift,
  CreditCard,
  Activity,
  PieChart,
  Settings,
  Image,
  Video,
  Mic,
  Download,
  Upload,
  Eye,
  Edit,
  Share,
  Star,
  Heart,
  ThumbsUp,
  Share2,
  Lock,
  Unlock,
  Info,
  Truck,
  Route,
  Receipt,
  TrendingDown,
  Wallet,
  Banknote,
  Save,
  Download as DownloadIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/theme-toggle";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const errorDetails = {
    message: error.message || "An unexpected error occurred",
    digest: error.digest || "Unknown",
    stack: error.stack || "No stack trace available",
    timestamp: new Date().toISOString(),
  };

  const quickActions = [
    {
      icon: <RefreshCw className="h-5 w-5 text-primary" />,
      title: "Try Again",
      description: "Reload the page and try again",
      action: () => reset(),
      color: "bg-primary/10 text-primary",
    },
    {
      icon: <Home className="h-5 w-5 text-accent" />,
      title: "Go Home",
      description: "Return to the main dashboard",
      action: () => (window.location.href = "/"),
      color: "bg-accent/10 text-accent",
    },
    {
      icon: <ArrowLeft className="h-5 w-5 text-secondary" />,
      title: "Go Back",
      description: "Return to the previous page",
      action: () => window.history.back(),
      color: "bg-secondary/10 text-secondary",
    },
  ];

  const supportOptions = [
    {
      icon: <Bug className="h-5 w-5 text-destructive" />,
      title: "Report Bug",
      description: "Help us fix this issue",
      action: "Report Issue",
    },
    {
      icon: <HelpCircle className="h-5 w-5 text-primary" />,
      title: "Get Help",
      description: "Contact our support team",
      action: "Contact Support",
    },
    {
      icon: <BookOpen className="h-5 w-5 text-accent" />,
      title: "Documentation",
      description: "Check our troubleshooting guide",
      action: "View Docs",
    },
    {
      icon: <FileText className="h-5 w-5 text-secondary" />,
      title: "Status Page",
      description: "Check system status",
      action: "Check Status",
    },
  ];

  const troubleshootingSteps = [
    "Check your internet connection",
    "Clear your browser cache and cookies",
    "Try refreshing the page",
    "Disable browser extensions temporarily",
    "Try using a different browser",
    "Check if the issue persists in incognito mode",
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-foreground mb-4">500</h1>
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            Something Went Wrong
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We encountered an unexpected error. Our team has been notified and
            is working to fix it.
          </p>
        </div>

        {/* Error Details */}
        <Card className="card-professional mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bug className="h-5 w-5 text-destructive" />
              Error Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Error Message
                  </label>
                  <p className="text-sm text-muted-foreground font-mono bg-muted/30 p-2 rounded">
                    {errorDetails.message}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Error ID
                  </label>
                  <p className="text-sm text-muted-foreground font-mono bg-muted/30 p-2 rounded">
                    {errorDetails.digest}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Timestamp
                </label>
                <p className="text-sm text-muted-foreground font-mono bg-muted/30 p-2 rounded">
                  {new Date(errorDetails.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Card key={index} className="card-professional">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${action.color}`}
                  >
                    {action.icon}
                  </div>
                  {action.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {action.description}
                </p>
                <Button onClick={action.action} className="w-full btn-gradient">
                  {action.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Troubleshooting Steps */}
        <Card className="card-professional mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-warning" />
              Troubleshooting Steps
            </CardTitle>
            <p className="text-muted-foreground">
              Try these steps to resolve the issue
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {troubleshootingSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xs font-semibold text-primary">
                      {index + 1}
                    </span>
                  </div>
                  <span className="text-sm text-foreground">{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Support Options */}
        <Card className="card-professional mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-info" />
              Get Support
            </CardTitle>
            <p className="text-muted-foreground">
              Still having issues? We're here to help
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {supportOptions.map((option, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    {option.icon}
                    <h3 className="font-semibold text-foreground">
                      {option.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {option.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    {option.action}
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="card-professional">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-accent" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-3 w-3 rounded-full bg-accent"></div>
                <span className="text-sm text-foreground">API Services</span>
                <Badge className="status-success">Operational</Badge>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-3 w-3 rounded-full bg-accent"></div>
                <span className="text-sm text-foreground">Database</span>
                <Badge className="status-success">Operational</Badge>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-3 w-3 rounded-full bg-destructive"></div>
                <span className="text-sm text-foreground">CDN</span>
                <Badge className="status-danger">Degraded</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Target className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Somaliland Candidate Helper
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Empowering democratic participation through technology
          </p>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
