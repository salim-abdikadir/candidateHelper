"use client";
import React from "react";
import Link from "next/link";
import {
  Home,
  ArrowLeft,
  Search,
  AlertCircle,
  RefreshCw,
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

export default function NotFound() {
  const quickLinks = [
    {
      icon: <Home className="h-5 w-5 text-primary" />,
      title: "Home",
      description: "Return to the main dashboard",
      href: "/",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: <Shield className="h-5 w-5 text-accent" />,
      title: "Admin Dashboard",
      description: "Campaign management and oversight",
      href: "/admin",
      color: "bg-accent/10 text-accent",
    },
    {
      icon: <Users className="h-5 w-5 text-secondary" />,
      title: "Operator App",
      description: "Field operations and supporter management",
      href: "/operator",
      color: "bg-secondary/10 text-secondary",
    },
    {
      icon: <Target className="h-5 w-5 text-warning" />,
      title: "Supporter Portal",
      description: "Community engagement and information",
      href: "/supporter",
      color: "bg-warning/10 text-warning",
    },
    {
      icon: <MessageCircle className="h-5 w-5 text-info" />,
      title: "Communication",
      description: "Mass messaging and notifications",
      href: "/communication",
      color: "bg-info/10 text-info",
    },
    {
      icon: <MapPin className="h-5 w-5 text-destructive" />,
      title: "Transport & Routing",
      description: "Logistics and route planning",
      href: "/transport",
      color: "bg-destructive/10 text-destructive",
    },
  ];

  const supportOptions = [
    {
      icon: <HelpCircle className="h-5 w-5 text-primary" />,
      title: "Help Center",
      description: "Find answers to common questions",
      action: "Browse Help",
    },
    {
      icon: <BookOpen className="h-5 w-5 text-accent" />,
      title: "Documentation",
      description: "Detailed guides and tutorials",
      action: "Read Docs",
    },
    {
      icon: <MessageCircle className="h-5 w-5 text-secondary" />,
      title: "Contact Support",
      description: "Get help from our team",
      action: "Contact Us",
    },
    {
      icon: <FileText className="h-5 w-5 text-warning" />,
      title: "Report Issue",
      description: "Report bugs or problems",
      action: "Report Bug",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary">
              <Target className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            The page you're looking for doesn't exist or has been moved. Don't
            worry, we'll help you find what you need.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="card-professional">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowLeft className="h-5 w-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full btn-gradient">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Page
              </Button>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-accent" />
                Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Looking for something specific? Try searching our platform.
                </p>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <Button variant="outline">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <Card className="card-professional mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-warning" />
              Popular Pages
            </CardTitle>
            <p className="text-muted-foreground">
              Here are some popular pages you might be looking for
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="p-4 border rounded-lg hover:bg-muted/30 transition-colors group"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${link.color}`}
                    >
                      {link.icon}
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {link.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Support Options */}
        <Card className="card-professional">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-info" />
              Need Help?
            </CardTitle>
            <p className="text-muted-foreground">
              We're here to help you get back on track
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
