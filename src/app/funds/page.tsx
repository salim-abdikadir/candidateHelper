"use client";
import React, { useState } from "react";
import {
  DollarSign,
  Gift,
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
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  Clock,
  MapPin,
  Truck,
  Navigation,
  Save,
  Download as DownloadIcon,
  CreditCard,
  Banknote,
  Wallet,
  Receipt,
  TrendingDown,
  PieChart,
  Activity,
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
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";
import { ModeToggle } from "@/components/theme-toggle";
import { CHART_COLORS, getChartColor } from "@/lib/chart-colors";

export default function FundsDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  // Mock data for charts
  const fundFlowData = [
    { month: "Jan", income: 45000, expenses: 32000, balance: 13000 },
    { month: "Feb", income: 52000, expenses: 38000, balance: 14000 },
    { month: "Mar", income: 48000, expenses: 35000, balance: 13000 },
    { month: "Apr", income: 55000, expenses: 42000, balance: 13000 },
    { month: "May", income: 60000, expenses: 45000, balance: 15000 },
    { month: "Jun", income: 58000, expenses: 40000, balance: 18000 },
  ];

  const expenseCategoriesData = [
    {
      category: "Campaign Materials",
      amount: 15000,
      percentage: 30,
      color: "var(--color-chart-1)",
    },
    {
      category: "Transportation",
      amount: 12000,
      percentage: 24,
      color: "var(--color-chart-2)",
    },
    {
      category: "Staff Salaries",
      amount: 10000,
      percentage: 20,
      color: "var(--color-chart-3)",
    },
    {
      category: "Events & Rallies",
      amount: 8000,
      percentage: 16,
      color: "var(--color-chart-4)",
    },
    {
      category: "Technology",
      amount: 5000,
      percentage: 10,
      color: "var(--color-chart-5)",
    },
  ];

  const supporterBenefitsData = [
    {
      district: "Hargeisa Central",
      allocated: 25000,
      distributed: 20000,
      remaining: 5000,
    },
    {
      district: "Hargeisa North",
      allocated: 20000,
      distributed: 15000,
      remaining: 5000,
    },
    {
      district: "Hargeisa South",
      allocated: 18000,
      distributed: 12000,
      remaining: 6000,
    },
    {
      district: "Hargeisa East",
      allocated: 15000,
      distributed: 10000,
      remaining: 5000,
    },
    {
      district: "Hargeisa West",
      allocated: 12000,
      distributed: 8000,
      remaining: 4000,
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      type: "income",
      description: "Campaign Donation - Ahmed Hassan",
      amount: 5000,
      category: "Donation",
      date: "2025-11-08",
      status: "completed",
      method: "Bank Transfer",
    },
    {
      id: 2,
      type: "expense",
      description: "Campaign Materials - Banners & Flyers",
      amount: 2500,
      category: "Materials",
      date: "2025-11-07",
      status: "completed",
      method: "Cash",
    },
    {
      id: 3,
      type: "expense",
      description: "Transportation - Bus Rental",
      amount: 1800,
      category: "Transport",
      date: "2025-11-06",
      status: "pending",
      method: "Check",
    },
    {
      id: 4,
      type: "income",
      description: "Fundraising Event - Hargeisa Stadium",
      amount: 12000,
      category: "Event",
      date: "2025-11-05",
      status: "completed",
      method: "Cash",
    },
    {
      id: 5,
      type: "expense",
      description: "Supporter Benefits - Central District",
      amount: 3000,
      category: "Benefits",
      date: "2025-11-04",
      status: "completed",
      method: "Bank Transfer",
    },
  ];

  const giftDistribution = [
    {
      id: 1,
      recipient: "Ahmed Hassan",
      phone: "+252 61 234 5678",
      district: "Hargeisa Central",
      gift: "Food Package",
      value: 150,
      status: "delivered",
      date: "2025-11-08",
    },
    {
      id: 2,
      recipient: "Fatima Ali",
      phone: "+252 61 234 5679",
      district: "Hargeisa North",
      gift: "Transport Voucher",
      value: 100,
      status: "delivered",
      date: "2025-11-07",
    },
    {
      id: 3,
      recipient: "Omar Mohamed",
      phone: "+252 61 234 5680",
      district: "Hargeisa South",
      gift: "Campaign T-Shirt",
      value: 25,
      status: "pending",
      date: "2025-11-06",
    },
    {
      id: 4,
      recipient: "Aisha Ahmed",
      phone: "+252 61 234 5681",
      district: "Hargeisa East",
      gift: "Phone Credit",
      value: 50,
      status: "delivered",
      date: "2025-11-05",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "status-success";
      case "pending":
        return "status-warning";
      case "failed":
        return "status-danger";
      case "delivered":
        return "status-success";
      default:
        return "status-info";
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "income":
        return <TrendingUp className="h-4 w-4 text-accent" />;
      case "expense":
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <DollarSign className="h-4 w-4 text-muted-foreground" />;
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
                <BreadcrumbPage>Funds & Resources</BreadcrumbPage>
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
              Funds & Resources
            </h2>
            <p className="text-muted-foreground">
              Manage campaign finances and resource distribution
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid auto-rows-min gap-4 grid-cols-2 lg:grid-cols-4">
            <Card className="card-professional">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Total Balance
                </CardTitle>
                <Wallet className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-foreground">$85,000</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Monthly Income
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-foreground">$58,000</div>
                <p className="text-xs text-muted-foreground">
                  +8% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Monthly Expenses
                </CardTitle>
                <TrendingDown className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-foreground">$40,000</div>
                <p className="text-xs text-muted-foreground">
                  +5% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Supporter Benefits
                </CardTitle>
                <Gift className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-foreground">$65,000</div>
                <p className="text-xs text-muted-foreground">
                  Distributed this month
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
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
              <TabsTrigger value="budget">Budget</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Fund Flow Chart */}
                <Card className="card-professional">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-accent" />
                      Fund Flow
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        income: {
                          label: "Income",
                          color: "var(--color-chart-1)",
                        },
                        expenses: {
                          label: "Expenses",
                          color: "var(--color-chart-2)",
                        },
                        balance: {
                          label: "Balance",
                          color: "var(--color-chart-3)",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={fundFlowData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="income"
                            stackId="1"
                            stroke="var(--color-chart-1)"
                            fill="var(--color-chart-1)"
                            fillOpacity={0.6}
                          />
                          <Area
                            type="monotone"
                            dataKey="expenses"
                            stackId="2"
                            stroke="var(--color-chart-2)"
                            fill="var(--color-chart-2)"
                            fillOpacity={0.6}
                          />
                          <Area
                            type="monotone"
                            dataKey="balance"
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

                {/* Expense Categories Chart */}
                <Card className="card-professional">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-primary" />
                      Expense Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={{}} className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={expenseCategoriesData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percentage }) =>
                              `${name} ${percentage}%`
                            }
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="amount"
                          >
                            {expenseCategoriesData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Supporter Benefits Distribution */}
              <Card className="card-professional">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-secondary" />
                    Supporter Benefits Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      allocated: {
                        label: "Allocated",
                        color: "var(--color-chart-1)",
                      },
                      distributed: {
                        label: "Distributed",
                        color: "var(--color-chart-2)",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={supporterBenefitsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="district" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="allocated" fill="var(--color-chart-1)" />
                        <Bar
                          dataKey="distributed"
                          fill="var(--color-chart-2)"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Transactions Tab */}
            <TabsContent value="transactions" className="space-y-4">
              <Card className="card-professional">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Receipt className="h-5 w-5 text-primary" />
                      Recent Transactions
                    </CardTitle>
                    <Button className="btn-gradient">
                      <Plus className="mr-2 h-4 w-4" />
                      New Transaction
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Search transactions..."
                        className="flex-1"
                      />
                      <Button variant="outline">
                        <Search className="h-4 w-4" />
                      </Button>
                      <Button variant="outline">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {recentTransactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                        >
                          {getTransactionIcon(transaction.type)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-sm text-foreground truncate">
                                {transaction.description}
                              </h3>
                              <div className="flex items-center space-x-2">
                                <span
                                  className={`font-semibold ${
                                    transaction.type === "income"
                                      ? "text-accent"
                                      : "text-destructive"
                                  }`}
                                >
                                  {transaction.type === "income" ? "+" : "-"}$
                                  {transaction.amount.toLocaleString()}
                                </span>
                                <Badge
                                  className={getStatusColor(transaction.status)}
                                >
                                  {transaction.status}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>
                                {transaction.category} • {transaction.method}
                              </span>
                              <span>{transaction.date}</span>
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

            {/* Benefits Tab */}
            <TabsContent value="benefits" className="space-y-4">
              <Card className="card-professional">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="h-5 w-5 text-secondary" />
                      Gift Distribution
                    </CardTitle>
                    <Button className="btn-gradient">
                      <Plus className="mr-2 h-4 w-4" />
                      Distribute Gift
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Input placeholder="Search gifts..." className="flex-1" />
                      <Button variant="outline">
                        <Search className="h-4 w-4" />
                      </Button>
                      <Button variant="outline">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {giftDistribution.map((gift) => (
                        <div
                          key={gift.id}
                          className="p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold text-foreground">
                                  {gift.recipient}
                                </h3>
                                <Badge className={getStatusColor(gift.status)}>
                                  {gift.status}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                                <div>
                                  <span className="font-medium">Phone:</span>{" "}
                                  {gift.phone}
                                </div>
                                <div>
                                  <span className="font-medium">District:</span>{" "}
                                  {gift.district}
                                </div>
                                <div>
                                  <span className="font-medium">Gift:</span>{" "}
                                  {gift.gift}
                                </div>
                                <div>
                                  <span className="font-medium">Value:</span> $
                                  {gift.value}
                                </div>
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
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Distributed on {gift.date}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Budget Tab */}
            <TabsContent value="budget" className="space-y-4">
              <Card className="card-professional">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-warning" />
                    Budget Planning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h3 className="font-semibold text-foreground mb-2">
                          Total Budget
                        </h3>
                        <div className="text-2xl font-bold text-foreground">
                          $100,000
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Allocated for campaign
                        </div>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h3 className="font-semibold text-foreground mb-2">
                          Spent
                        </h3>
                        <div className="text-2xl font-bold text-destructive">
                          $40,000
                        </div>
                        <div className="text-xs text-muted-foreground">
                          40% of total budget
                        </div>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h3 className="font-semibold text-foreground mb-2">
                          Remaining
                        </h3>
                        <div className="text-2xl font-bold text-accent">
                          $60,000
                        </div>
                        <div className="text-xs text-muted-foreground">
                          60% remaining
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">
                        Budget Categories
                      </h4>
                      {expenseCategoriesData.map((category, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium text-foreground">
                              {category.category}
                            </span>
                            <span className="text-muted-foreground">
                              ${category.amount.toLocaleString()}
                            </span>
                          </div>
                          <Progress
                            value={category.percentage}
                            className="h-2"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Button className="btn-gradient">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Category
                      </Button>
                      <Button variant="outline">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Budget
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-4">
              <Card className="card-professional">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-info" />
                    Financial Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold text-foreground mb-2">
                          Monthly Report
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Comprehensive financial summary for the current month
                        </p>
                        <Button variant="outline" className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold text-foreground mb-2">
                          Expense Report
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Detailed breakdown of all expenses by category
                        </p>
                        <Button variant="outline" className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download Excel
                        </Button>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold text-foreground mb-2">
                          Benefits Report
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Supporter benefits distribution summary
                        </p>
                        <Button variant="outline" className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download CSV
                        </Button>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold text-foreground mb-2">
                          Audit Report
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Complete audit trail of all transactions
                        </p>
                        <Button variant="outline" className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
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
