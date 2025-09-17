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
  HelpCircle,
  BookOpen,
  FileText,
  ExternalLink,
  Activity,
  CheckCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/theme-toggle";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const errorDetails = {
    message: error.message || "An unexpected error occurred",
    digest: error.digest || "Unknown",
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

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            We encountered an error while loading this page. Don't worry, this
            has been logged and our team will look into it.
          </p>
        </div>

        {/* Error Details */}
        <Card className="card-professional mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bug className="h-5 w-5 text-destructive" />
              Error Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Error Message
                </label>
                <p className="text-sm text-muted-foreground font-mono bg-muted/30 p-2 rounded mt-1">
                  {errorDetails.message}
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Error ID
                  </label>
                  <p className="text-sm text-muted-foreground font-mono bg-muted/30 p-2 rounded mt-1">
                    {errorDetails.digest}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Time
                  </label>
                  <p className="text-sm text-muted-foreground font-mono bg-muted/30 p-2 rounded mt-1">
                    {new Date(errorDetails.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <Card key={index} className="card-professional">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${action.color}`}
                  >
                    {action.icon}
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {action.title}
                  </h3>
                </div>
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

        {/* Support Section */}
        <Card className="card-professional">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-info" />
              Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center space-x-3 mb-2">
                  <Bug className="h-5 w-5 text-destructive" />
                  <h3 className="font-semibold text-foreground">Report Bug</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Help us fix this issue by reporting it
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Report Issue
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Button>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center space-x-3 mb-2">
                  <BookOpen className="h-5 w-5 text-accent" />
                  <h3 className="font-semibold text-foreground">
                    Documentation
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Check our troubleshooting guide
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  View Docs
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
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

