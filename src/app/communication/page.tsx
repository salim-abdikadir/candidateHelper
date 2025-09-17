"use client";
import React, { useState } from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  Send,
  Users,
  Target,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  BarChart3,
  Home,
  User,
  Bell,
  Settings,
  Plus,
  Search,
  Filter,
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
  Download,
  Upload,
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
  SortAsc,
  SortDesc,
  Navigation,
  MapPin,
  Truck,
  DollarSign,
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ModeToggle } from "@/components/theme-toggle";
import { CHART_COLORS, getChartColor } from "@/lib/chart-colors";

export default function CommunicationDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedChannel, setSelectedChannel] = useState("all");

  // Mock data for charts
  const messageStatsData = [
    { month: "Jan", sms: 1200, whatsapp: 800, email: 400 },
    { month: "Feb", sms: 1500, whatsapp: 1000, email: 500 },
    { month: "Mar", sms: 1800, whatsapp: 1200, email: 600 },
    { month: "Apr", sms: 2000, whatsapp: 1400, email: 700 },
    { month: "May", sms: 2200, whatsapp: 1600, email: 800 },
    { month: "Jun", sms: 2500, whatsapp: 1800, email: 900 },
  ];

  const channelDistributionData = [
    { name: "SMS", value: 45, color: "var(--color-chart-1)" },
    { name: "WhatsApp", value: 35, color: "var(--color-chart-2)" },
    { name: "Email", value: 20, color: "var(--color-chart-3)" },
  ];

  const campaignPerformanceData = [
    {
      campaign: "Election Reminder",
      sent: 5000,
      delivered: 4800,
      opened: 3600,
      clicked: 1200,
    },
    {
      campaign: "Rally Invitation",
      sent: 3000,
      delivered: 2900,
      opened: 2200,
      clicked: 800,
    },
    {
      campaign: "Voter Education",
      sent: 2000,
      delivered: 1950,
      opened: 1500,
      clicked: 600,
    },
    {
      campaign: "Transport Info",
      sent: 1500,
      delivered: 1450,
      opened: 1100,
      clicked: 400,
    },
  ];

  const recentMessages = [
    {
      id: 1,
      type: "sms",
      recipient: "Ahmed Hassan",
      phone: "+252 61 234 5678",
      message: "Don't forget to vote on November 15th! Your voice matters.",
      status: "delivered",
      timestamp: "2 minutes ago",
      channel: "SMS",
    },
    {
      id: 2,
      type: "whatsapp",
      recipient: "Fatima Ali",
      phone: "+252 61 234 5679",
      message:
        "Join us for the campaign rally at Hargeisa Stadium tomorrow at 2 PM.",
      status: "read",
      timestamp: "5 minutes ago",
      channel: "WhatsApp",
    },
    {
      id: 3,
      type: "email",
      recipient: "Omar Mohamed",
      phone: "+252 61 234 5680",
      message:
        "Your voter registration is complete. Check your polling station details.",
      status: "opened",
      timestamp: "10 minutes ago",
      channel: "Email",
    },
    {
      id: 4,
      type: "sms",
      recipient: "Aisha Ahmed",
      phone: "+252 61 234 5681",
      message:
        "Free transport will be available on Election Day from your area.",
      status: "failed",
      timestamp: "15 minutes ago",
      channel: "SMS",
    },
  ];

  const messageTemplates = [
    {
      id: 1,
      name: "Election Reminder",
      content:
        "Don't forget to vote on November 15th! Your voice matters for our future.",
      channel: "SMS",
      category: "Reminder",
      usage: 150,
    },
    {
      id: 2,
      name: "Rally Invitation",
      content:
        "Join us for an inspiring campaign rally at Hargeisa Stadium. Tomorrow at 2 PM.",
      channel: "WhatsApp",
      category: "Event",
      usage: 89,
    },
    {
      id: 3,
      name: "Voter Education",
      content:
        "Learn about the voting process and your rights. Visit our website for details.",
      channel: "Email",
      category: "Education",
      usage: 67,
    },
    {
      id: 4,
      name: "Transport Information",
      content:
        "Free bus service available on Election Day. Check your pickup location.",
      channel: "SMS",
      category: "Logistics",
      usage: 45,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
      case "read":
      case "opened":
        return "status-success";
      case "sent":
        return "status-info";
      case "failed":
        return "status-danger";
      case "pending":
        return "status-warning";
      default:
        return "status-info";
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel.toLowerCase()) {
      case "sms":
        return <Phone className="h-4 w-4 text-primary" />;
      case "whatsapp":
        return <MessageCircle className="h-4 w-4 text-accent" />;
      case "email":
        return <Mail className="h-4 w-4 text-secondary" />;
      default:
        return <MessageCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar userType="admin" />
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
                <BreadcrumbLink href="/admin">Admin Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Communication Center</BreadcrumbPage>
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
            <h2 className="text-2xl font-bold text-foreground">
              Communication Center
            </h2>
            <p className="text-muted-foreground">
              Manage mass messaging and communication campaigns
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid auto-rows-min gap-4 grid-cols-2 lg:grid-cols-4">
            <Card className="card-professional">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Total Messages
                </CardTitle>
                <MessageCircle className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-foreground">12,450</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Delivery Rate
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-foreground">96.2%</div>
                <p className="text-xs text-muted-foreground">
                  +2.1% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Open Rate
                </CardTitle>
                <Eye className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-foreground">78.5%</div>
                <p className="text-xs text-muted-foreground">
                  +5.3% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Active Campaigns
                </CardTitle>
                <Target className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-foreground">8</div>
                <p className="text-xs text-muted-foreground">3 scheduled</p>
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
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Message Statistics Chart */}
                <Card className="card-professional">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-accent" />
                      Message Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        sms: { label: "SMS", color: "var(--color-chart-1)" },
                        whatsapp: {
                          label: "WhatsApp",
                          color: "var(--color-chart-2)",
                        },
                        email: {
                          label: "Email",
                          color: "var(--color-chart-3)",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={messageStatsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="sms"
                            stackId="1"
                            stroke="var(--color-chart-1)"
                            fill="var(--color-chart-1)"
                            fillOpacity={0.6}
                          />
                          <Area
                            type="monotone"
                            dataKey="whatsapp"
                            stackId="2"
                            stroke="var(--color-chart-2)"
                            fill="var(--color-chart-2)"
                            fillOpacity={0.6}
                          />
                          <Area
                            type="monotone"
                            dataKey="email"
                            stackId="3"
                            stroke="var(--color-chart-3)"
                            fill="var(--color-chart-3)"
                            fillOpacity={0.6}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Channel Distribution Chart */}
                <Card className="card-professional">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      Channel Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={{}} className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={channelDistributionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) =>
                              `${name} ${(percent * 100).toFixed(0)}%`
                            }
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {channelDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Messages */}
              <Card className="card-professional">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-info" />
                    Recent Messages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentMessages.map((message) => (
                      <div
                        key={message.id}
                        className="flex items-center space-x-4 p-4 border rounded-lg"
                      >
                        {getChannelIcon(message.channel)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-sm text-foreground truncate">
                              {message.recipient}
                            </h3>
                            <Badge className={getStatusColor(message.status)}>
                              {message.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">
                            {message.phone} • {message.channel}
                          </p>
                          <p className="text-sm text-foreground truncate">
                            {message.message}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground flex-shrink-0">
                          {message.timestamp}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Campaigns Tab */}
            <TabsContent value="campaigns" className="space-y-4">
              <Card className="card-professional">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-accent" />
                      Campaign Performance
                    </CardTitle>
                    <Button className="btn-gradient">
                      <Plus className="mr-2 h-4 w-4" />
                      New Campaign
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaignPerformanceData.map((campaign, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-foreground">
                            {campaign.campaign}
                          </h3>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-foreground">
                              {campaign.sent.toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Sent
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-accent">
                              {campaign.delivered.toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Delivered
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-warning">
                              {campaign.opened.toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Opened
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-primary">
                              {campaign.clicked.toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Clicked
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Delivery Rate</span>
                            <span>
                              {(
                                (campaign.delivered / campaign.sent) *
                                100
                              ).toFixed(1)}
                              %
                            </span>
                          </div>
                          <Progress
                            value={(campaign.delivered / campaign.sent) * 100}
                            className="h-2"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Templates Tab */}
            <TabsContent value="templates" className="space-y-4">
              <Card className="card-professional">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-secondary" />
                      Message Templates
                    </CardTitle>
                    <Button className="btn-gradient">
                      <Plus className="mr-2 h-4 w-4" />
                      New Template
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {messageTemplates.map((template) => (
                      <div key={template.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-foreground">
                                {template.name}
                              </h3>
                              <Badge variant="outline">
                                {template.category}
                              </Badge>
                              <Badge variant="outline">
                                {template.channel}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {template.content}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <span>Used {template.usage} times</span>
                              <span>•</span>
                              <span>Created 2 days ago</span>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="space-y-4">
              <Card className="card-professional">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-primary" />
                      Message Center
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                      </Button>
                      <Button className="btn-gradient">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Search messages..."
                        className="flex-1"
                      />
                      <Button variant="outline">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {recentMessages.map((message) => (
                        <div
                          key={message.id}
                          className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                        >
                          {getChannelIcon(message.channel)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-sm text-foreground truncate">
                                {message.recipient}
                              </h3>
                              <Badge className={getStatusColor(message.status)}>
                                {message.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">
                              {message.phone} • {message.channel} •{" "}
                              {message.timestamp}
                            </p>
                            <p className="text-sm text-foreground truncate">
                              {message.message}
                            </p>
                          </div>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="card-professional">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-accent" />
                      Message Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        sms: { label: "SMS", color: "var(--color-chart-1)" },
                        whatsapp: {
                          label: "WhatsApp",
                          color: "var(--color-chart-2)",
                        },
                        email: {
                          label: "Email",
                          color: "var(--color-chart-3)",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={messageStatsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="sms"
                            stroke="var(--color-chart-1)"
                            strokeWidth={2}
                          />
                          <Line
                            type="monotone"
                            dataKey="whatsapp"
                            stroke="var(--color-chart-2)"
                            strokeWidth={2}
                          />
                          <Line
                            type="monotone"
                            dataKey="email"
                            stroke="var(--color-chart-3)"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card className="card-professional">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      Campaign Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        sent: { label: "Sent", color: "var(--color-chart-1)" },
                        delivered: {
                          label: "Delivered",
                          color: "var(--color-chart-2)",
                        },
                        opened: {
                          label: "Opened",
                          color: "var(--color-chart-3)",
                        },
                        clicked: {
                          label: "Clicked",
                          color: "var(--color-chart-4)",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={campaignPerformanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="campaign" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="sent" fill="var(--color-chart-1)" />
                          <Bar
                            dataKey="delivered"
                            fill="var(--color-chart-2)"
                          />
                          <Bar dataKey="opened" fill="var(--color-chart-3)" />
                          <Bar dataKey="clicked" fill="var(--color-chart-4)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
