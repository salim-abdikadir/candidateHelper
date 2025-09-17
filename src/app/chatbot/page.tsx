"use client";
import React, { useState } from "react";
import {
  Bot,
  MessageCircle,
  Send,
  Mic,
  Phone,
  Mail,
  Users,
  Target,
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
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  Clock,
  MapPin,
  Truck,
  DollarSign,
  Navigation,
  Save,
  Download as DownloadIcon,
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

export default function ChatbotDashboard() {
  const [activeTab, setActiveTab] = useState("chat");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content:
        "Hello! I'm your AI campaign assistant. How can I help you today?",
      timestamp: "2 minutes ago",
      category: "greeting",
    },
    {
      id: 2,
      type: "user",
      content: "What's the status of voter registration in Hargeisa Central?",
      timestamp: "1 minute ago",
      category: "query",
    },
    {
      id: 3,
      type: "bot",
      content:
        "Based on the latest data, Hargeisa Central has 450 registered voters out of 500 capacity (90% utilization). The registration is progressing well with 3 active routes serving the area.",
      timestamp: "1 minute ago",
      category: "response",
    },
  ]);

  // Mock data for charts
  const chatbotUsageData = [
    { day: "Mon", queries: 45, resolved: 42, satisfaction: 4.2 },
    { day: "Tue", queries: 52, resolved: 48, satisfaction: 4.5 },
    { day: "Wed", queries: 38, resolved: 35, satisfaction: 4.1 },
    { day: "Thu", queries: 61, resolved: 58, satisfaction: 4.3 },
    { day: "Fri", queries: 48, resolved: 45, satisfaction: 4.4 },
    { day: "Sat", queries: 35, resolved: 32, satisfaction: 4.0 },
    { day: "Sun", queries: 28, resolved: 26, satisfaction: 4.2 },
  ];

  const queryCategoriesData = [
    { category: "Voter Registration", count: 45, percentage: 35 },
    { category: "Election Information", count: 32, percentage: 25 },
    { category: "Transport & Logistics", count: 28, percentage: 22 },
    { category: "Campaign Updates", count: 15, percentage: 12 },
    { category: "Technical Support", count: 8, percentage: 6 },
  ];

  const fraudDetectionData = [
    { type: "Duplicate Registrations", detected: 12, resolved: 10, pending: 2 },
    { type: "Invalid Documents", detected: 8, resolved: 6, pending: 2 },
    { type: "Suspicious Patterns", detected: 5, resolved: 3, pending: 2 },
    { type: "Data Inconsistencies", detected: 3, resolved: 2, pending: 1 },
  ];

  const quickActions = [
    {
      icon: <Users className="h-5 w-5 text-primary" />,
      title: "Voter Registration Status",
      description: "Check registration progress and statistics",
      action: "Check Status",
    },
    {
      icon: <MapPin className="h-5 w-5 text-accent" />,
      title: "Polling Station Locator",
      description: "Find your nearest polling station",
      action: "Find Station",
    },
    {
      icon: <Truck className="h-5 w-5 text-warning" />,
      title: "Transport Information",
      description: "Get transportation details for election day",
      action: "Get Info",
    },
    {
      icon: <Calendar className="h-5 w-5 text-secondary" />,
      title: "Election Schedule",
      description: "View important dates and events",
      action: "View Schedule",
    },
    {
      icon: <HelpCircle className="h-5 w-5 text-info" />,
      title: "Voting Process Guide",
      description: "Learn how to vote and what to expect",
      action: "Learn More",
    },
    {
      icon: <Shield className="h-5 w-5 text-destructive" />,
      title: "Report Issues",
      description: "Report fraud or suspicious activities",
      action: "Report Now",
    },
  ];

  const recentQueries = [
    {
      id: 1,
      query: "What's the voter registration deadline?",
      category: "Election Information",
      status: "resolved",
      timestamp: "5 minutes ago",
      response: "The voter registration deadline is November 10, 2025.",
    },
    {
      id: 2,
      query: "How do I find my polling station?",
      category: "Polling Station Locator",
      status: "resolved",
      timestamp: "10 minutes ago",
      response:
        "You can find your polling station by entering your address or using the locator tool.",
    },
    {
      id: 3,
      query: "Is there free transport on election day?",
      category: "Transport & Logistics",
      status: "resolved",
      timestamp: "15 minutes ago",
      response:
        "Yes, free bus service will be available on election day from designated pickup points.",
    },
    {
      id: 4,
      query: "What documents do I need to vote?",
      category: "Voting Process Guide",
      status: "pending",
      timestamp: "20 minutes ago",
      response: "You need a valid ID and your voter registration card.",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "status-success";
      case "pending":
        return "status-warning";
      case "failed":
        return "status-danger";
      default:
        return "status-info";
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: "user",
        content: message,
        timestamp: "Just now",
        category: "query",
      };
      setMessages([...messages, newMessage]);
      setMessage("");

      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          type: "bot",
          content:
            "I understand your query. Let me help you with that information.",
          timestamp: "Just now",
          category: "response",
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 1000);
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
                <BreadcrumbPage>AI Chatbot</BreadcrumbPage>
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
              AI Chatbot Center
            </h2>
            <p className="text-muted-foreground">
              Intelligent assistant for campaign management and voter support
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid auto-rows-min gap-4 grid-cols-2 lg:grid-cols-4">
            <Card className="card-professional">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Total Queries
                </CardTitle>
                <MessageCircle className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-foreground">1,247</div>
                <p className="text-xs text-muted-foreground">
                  +18% from last week
                </p>
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Resolution Rate
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-foreground">94.2%</div>
                <p className="text-xs text-muted-foreground">
                  +2.1% from last week
                </p>
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Satisfaction Score
                </CardTitle>
                <Star className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-foreground">4.3/5</div>
                <p className="text-xs text-muted-foreground">
                  +0.2 from last week
                </p>
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Active Sessions
                </CardTitle>
                <Bot className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-foreground">23</div>
                <p className="text-xs text-muted-foreground">
                  Currently online
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
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="fraud">Fraud Detection</TabsTrigger>
              <TabsTrigger value="queries">Queries</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Chat Tab */}
            <TabsContent value="chat" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                {/* Chat Interface */}
                <Card className="card-professional md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5 text-primary" />
                      AI Assistant
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Messages */}
                      <div className="h-96 overflow-y-auto space-y-3">
                        {messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${
                              msg.type === "user"
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                msg.type === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-foreground"
                              }`}
                            >
                              <p className="text-sm">{msg.content}</p>
                              <p className="text-xs opacity-70 mt-1">
                                {msg.timestamp}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Message Input */}
                      <div className="flex space-x-2">
                        <Input
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Type your message..."
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleSendMessage()
                          }
                        />
                        <Button
                          onClick={handleSendMessage}
                          className="btn-gradient"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                        <Button variant="outline">
                          <Mic className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="card-professional">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-accent" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {quickActions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start h-auto p-3"
                        >
                          <div className="flex items-center space-x-3">
                            {action.icon}
                            <div className="text-left">
                              <div className="font-medium text-sm">
                                {action.title}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {action.description}
                              </div>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Usage Statistics Chart */}
                <Card className="card-professional">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-accent" />
                      Usage Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        queries: {
                          label: "Queries",
                          color: "var(--color-chart-1)",
                        },
                        resolved: {
                          label: "Resolved",
                          color: "var(--color-chart-2)",
                        },
                        satisfaction: {
                          label: "Satisfaction",
                          color: "var(--color-chart-3)",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chatbotUsageData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="queries"
                            stroke="var(--color-chart-1)"
                            strokeWidth={2}
                          />
                          <Line
                            type="monotone"
                            dataKey="resolved"
                            stroke="var(--color-chart-2)"
                            strokeWidth={2}
                          />
                          <Line
                            type="monotone"
                            dataKey="satisfaction"
                            stroke="var(--color-chart-3)"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Query Categories Chart */}
                <Card className="card-professional">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      Query Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={{}} className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={queryCategoriesData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percentage }) =>
                              `${name} ${percentage}%`
                            }
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="count"
                          >
                            {queryCategoriesData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={`var(--color-chart-${index + 1}))`}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Fraud Detection Tab */}
            <TabsContent value="fraud" className="space-y-4">
              <Card className="card-professional">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-destructive" />
                    Fraud Detection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {fraudDetectionData.map((item, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-foreground">
                            {item.type}
                          </h3>
                          <Badge className="status-warning">
                            {item.pending} pending
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-foreground">
                              {item.detected}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Detected
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-accent">
                              {item.resolved}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Resolved
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-warning">
                              {item.pending}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Pending
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Resolution Rate</span>
                            <span>
                              {((item.resolved / item.detected) * 100).toFixed(
                                1
                              )}
                              %
                            </span>
                          </div>
                          <Progress
                            value={(item.resolved / item.detected) * 100}
                            className="h-2"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Queries Tab */}
            <TabsContent value="queries" className="space-y-4">
              <Card className="card-professional">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-primary" />
                      Recent Queries
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Search queries..."
                        className="flex-1"
                      />
                      <Button variant="outline">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {recentQueries.map((query) => (
                        <div
                          key={query.id}
                          className="p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-foreground">
                              {query.query}
                            </h3>
                            <Badge className={getStatusColor(query.status)}>
                              {query.status}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                            <span>{query.category}</span>
                            <span>{query.timestamp}</span>
                          </div>
                          <p className="text-sm text-foreground">
                            {query.response}
                          </p>
                          <div className="flex space-x-1 mt-3">
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
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4">
              <Card className="card-professional">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-secondary" />
                    Chatbot Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">
                        General Settings
                      </h4>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            Bot Name
                          </label>
                          <Input value="Campaign AI Assistant" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            Language
                          </label>
                          <Input value="English" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            Response Time
                          </label>
                          <Input value="2 seconds" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            Max Queries per Session
                          </label>
                          <Input value="50" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">
                        AI Configuration
                      </h4>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            Model Version
                          </label>
                          <Input value="GPT-4" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            Temperature
                          </label>
                          <Input value="0.7" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            Max Tokens
                          </label>
                          <Input value="1000" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            Context Window
                          </label>
                          <Input value="4000" />
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button className="btn-gradient">
                        <Save className="mr-2 h-4 w-4" />
                        Save Settings
                      </Button>
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export Config
                      </Button>
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
