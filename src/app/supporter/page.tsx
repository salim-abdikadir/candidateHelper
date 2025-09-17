"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  DollarSign,
  Truck,
  MessageCircle,
  Camera,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Target,
  Home,
  User,
  BarChart3,
  Bell,
  Save,
  Settings,
  Phone,
  Mail,
  Navigation,
  Upload,
  Download,
  Eye,
  Edit,
  Share,
  Star,
  Heart,
  ThumbsUp,
  Share2,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  Plus,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  MoreHorizontal,
  Zap,
  Globe,
  Smartphone,
  Monitor,
  Shield,
  Lock,
  Unlock,
  Info,
  HelpCircle,
  BookOpen,
  FileText,
  Image,
  Video,
  Mic,
  Send,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ModeToggle } from "@/components/theme-toggle";
import { CHART_COLORS, getChartColor } from "@/lib/chart-colors";
import { SupporterRegistrationForm } from "@/components/forms/supporter-registration-form";
import { SupportersDataTable } from "@/components/supporters/supporters-data-table";

export default function SupporterDashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [isRegistered, setIsRegistered] = useState(true);

  // Mock data for charts
  const campaignProgressData = [
    {
      week: "Week 1",
      supporters: 120,
      events: 3,
      color: "var(--color-chart-1)",
    },
    {
      week: "Week 2",
      supporters: 180,
      events: 5,
      color: "var(--color-chart-2)",
    },
    {
      week: "Week 3",
      supporters: 250,
      events: 7,
      color: "var(--color-chart-3)",
    },
    {
      week: "Week 4",
      supporters: 320,
      events: 9,
      color: "var(--color-chart-4)",
    },
    {
      week: "Week 5",
      supporters: 380,
      events: 12,
      color: "var(--color-chart-5)",
    },
    {
      week: "Week 6",
      supporters: 456,
      events: 15,
      color: "var(--color-chart-6)",
    },
  ];

  const districtSupportData = [
    {
      district: "Hargeisa Central",
      supporters: 156,
      percentage: 34,
      color: "var(--color-chart-1)",
    },
    {
      district: "Hargeisa North",
      supporters: 98,
      percentage: 21,
      color: "var(--color-chart-2)",
    },
    {
      district: "Hargeisa South",
      supporters: 87,
      percentage: 19,
      color: "var(--color-chart-3)",
    },
    {
      district: "Hargeisa East",
      supporters: 78,
      percentage: 17,
      color: "var(--color-chart-4)",
    },
    {
      district: "Hargeisa West",
      supporters: 37,
      percentage: 8,
      color: "var(--color-chart-5)",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Election Day",
      date: "November 15, 2025",
      time: "6:00 AM - 6:00 PM",
      location: "Hargeisa Central Polling Center",
      status: "upcoming",
      type: "election",
      description: "Cast your vote for a better future",
    },
    {
      id: 2,
      title: "Campaign Rally",
      date: "November 10, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Hargeisa Stadium",
      status: "upcoming",
      type: "rally",
      description: "Join us for an inspiring campaign rally",
    },
    {
      id: 3,
      title: "Voter Education Session",
      date: "November 8, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "Community Center",
      status: "completed",
      type: "education",
      description: "Learn about the voting process and your rights",
    },
  ];

  const campaignDetails = [
    {
      icon: <MapPin className="text-primary" />,
      title: "Nearest Polling Station",
      description: "Hargeisa Central Polling Center",
      status: "verified",
      action: "View on Map",
    },
    {
      icon: <Truck className="text-accent" />,
      title: "Transport Information",
      description: "Free bus service available on Election Day",
      status: "confirmed",
      action: "Get Directions",
    },
    {
      icon: <DollarSign className="text-warning" />,
      title: "Supporter Benefits",
      description: "Eligible for campaign support funds",
      status: "eligible",
      action: "View Benefits",
    },
    {
      icon: <Shield className="text-info" />,
      title: "Security & Safety",
      description: "Your data is protected with advanced encryption",
      status: "secure",
      action: "Learn More",
    },
  ];

  const recentActivities = [
    {
      icon: <CheckCircle className="h-4 w-4 text-accent" />,
      title: "Registration Completed",
      description: "Your supporter registration is complete and verified",
      time: "2 days ago",
      type: "success",
    },
    {
      icon: <MessageCircle className="h-4 w-4 text-primary" />,
      title: "Welcome Message",
      description: "Welcome to the campaign! Check your inbox for updates.",
      time: "3 days ago",
      type: "info",
    },
    {
      icon: <Calendar className="h-4 w-4 text-secondary" />,
      title: "Event Invitation",
      description: "You're invited to the campaign rally on November 10th",
      time: "5 days ago",
      type: "invitation",
    },
    {
      icon: <Bell className="h-4 w-4 text-warning" />,
      title: "Election Reminder",
      description: "Don't forget to vote on November 15th!",
      time: "1 week ago",
      type: "reminder",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
      case "confirmed":
      case "eligible":
      case "secure":
      case "completed":
        return "status-success";
      case "upcoming":
        return "status-info";
      case "pending":
        return "status-warning";
      default:
        return "status-info";
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "election":
        return "text-destructive";
      case "rally":
        return "text-primary";
      case "education":
        return "text-accent";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar userType="supporter" />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/supporter">
                  Supporter Portal
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Campaign Hub</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Bell className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </Button>
            <ModeToggle />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">Campaign Hub</h2>
            <p className="text-muted-foreground">
              Your gateway to campaign information and engagement
            </p>
          </div>

          {/* Registration Status Banner */}
          {!isRegistered && (
            <Card className="card-gradient">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/20">
                      <User className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary-foreground">
                        Complete Your Registration
                      </h3>
                      <p className="text-primary-foreground/80">
                        Join thousands of supporters making a difference
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  >
                    Register Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Key Metrics */}
          <div className="grid auto-rows-min gap-4 grid-cols-2 lg:grid-cols-4">
            <Card className="card-professional">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Registration
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-accent">Complete</div>
                <p className="text-xs text-muted-foreground">
                  Profile verified
                </p>
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Polling Station
                </CardTitle>
                <MapPin className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-foreground">
                  Hargeisa Central
                </div>
                <p className="text-xs text-muted-foreground">
                  Assigned location
                </p>
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Transport
                </CardTitle>
                <Truck className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-foreground">
                  Available
                </div>
                <p className="text-xs text-muted-foreground">Election Day</p>
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Days to Election
                </CardTitle>
                <Calendar className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-foreground">7</div>
                <p className="text-xs text-muted-foreground">
                  November 15, 2025
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="home">Home</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
              <TabsTrigger value="supporters">Supporters</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>

            {/* Home Tab */}
            <TabsContent value="home" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Campaign Progress Chart */}
                <Card className="card-professional">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-accent" />
                      Campaign Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        supporters: {
                          label: "Supporters",
                          color: "var(--color-chart-1)",
                        },
                        events: {
                          label: "Events",
                          color: "var(--color-chart-2)",
                        },
                      }}
                      className="h-[250px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={campaignProgressData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="week" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="supporters"
                            stackId="1"
                            stroke="var(--color-chart-1)"
                            fill="var(--color-chart-1)"
                            fillOpacity={0.6}
                          />
                          <Area
                            type="monotone"
                            dataKey="events"
                            stackId="2"
                            stroke="var(--color-chart-2)"
                            fill="var(--color-chart-2)"
                            fillOpacity={0.6}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* District Support Chart */}
                <Card className="card-professional">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      District Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        supporters: {
                          label: "Supporters",
                          color: "var(--color-chart-3)",
                        },
                      }}
                      className="h-[250px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={districtSupportData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="district" />
                          <YAxis />
                          <Tooltip />
                          <Bar
                            dataKey="supporters"
                            fill="var(--color-chart-3)"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Campaign Information */}
              <Card className="card-professional">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-accent" />
                    Campaign Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {campaignDetails.map((detail, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg"
                      >
                        {detail.icon}
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">
                            {detail.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {detail.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge className={getStatusColor(detail.status)}>
                              {detail.status}
                            </Badge>
                            <Button
                              variant="link"
                              className="p-0 h-auto text-xs"
                            >
                              {detail.action}
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card className="card-professional">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-info" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 py-3 border-b last:border-b-0"
                      >
                        {activity.icon}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm text-foreground truncate">
                            {activity.title}
                          </h3>
                          <p className="text-xs text-muted-foreground truncate">
                            {activity.description}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground flex-shrink-0">
                          {activity.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register" className="space-y-4">
              <SupporterRegistrationForm />
            </TabsContent>

            {/* Supporters Tab */}
            <TabsContent value="supporters" className="space-y-4">
              <Card className="card-professional">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Registered Supporters
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Manage and view all registered supporters
                  </p>
                </CardHeader>
                <CardContent>
                  <SupportersDataTable />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-4">
              <Card className="card-professional">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-secondary" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                event.type === "election"
                                  ? "bg-destructive/10"
                                  : event.type === "rally"
                                  ? "bg-primary/10"
                                  : "bg-accent/10"
                              }`}
                            >
                              <Calendar
                                className={`h-5 w-5 ${
                                  event.type === "election"
                                    ? "text-destructive"
                                    : event.type === "rally"
                                    ? "text-primary"
                                    : "text-accent"
                                }`}
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {event.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {event.description}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {event.date} • {event.time}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {event.location}
                              </p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge
                            variant="outline"
                            className={getEventTypeColor(event.type)}
                          >
                            {event.type}
                          </Badge>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm">
                              <Calendar className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-4">
              <Card className="card-professional">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Profile Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          Ahmed Hassan
                        </h3>
                        <p className="text-muted-foreground">
                          +252 61 234 5678
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Hargeisa Central District
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Full Name
                        </label>
                        <Input value="Ahmed Hassan" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Phone Number
                        </label>
                        <Input value="+252 61 234 5678" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Email
                        </label>
                        <Input value="ahmed.hassan@email.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          District
                        </label>
                        <Input value="Hargeisa Central" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">
                        Document Upload
                      </h4>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            ID Document
                          </label>
                          <div className="flex items-center space-x-2">
                            <Input type="file" accept="image/*" />
                            <Button variant="outline" size="sm">
                              <Upload className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            Ballot Proof
                          </label>
                          <div className="flex items-center space-x-2">
                            <Input type="file" accept="image/*" />
                            <Button variant="outline" size="sm">
                              <Upload className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button className="btn-gradient">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export Data
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Support Tab */}
            <TabsContent value="support" className="space-y-4">
              <Card className="card-professional">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-info" />
                    Support & Help
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h3 className="font-semibold text-foreground mb-2">
                          Contact Support
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Get help from our support team
                        </p>
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                          >
                            <Phone className="mr-2 h-4 w-4" />
                            Call Support
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                          >
                            <Mail className="mr-2 h-4 w-4" />
                            Email Support
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h3 className="font-semibold text-foreground mb-2">
                          Resources
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Helpful guides and information
                        </p>
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                          >
                            <BookOpen className="mr-2 h-4 w-4" />
                            User Guide
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            FAQ
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-primary/10 rounded-lg">
                      <h3 className="font-semibold text-foreground mb-2">
                        Quick Help
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Need immediate assistance? Use our AI-powered help
                        system.
                      </p>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Ask a question..."
                          className="flex-1"
                        />
                        <Button className="btn-gradient">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
