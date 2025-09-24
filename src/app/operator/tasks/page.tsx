"use client";
import React, { useState } from "react";
import {
  FileText,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2,
  Eye,
  Navigation,
  Target,
  Activity,
  User,
  Star,
  TrendingUp,
  BarChart3,
  Settings,
  Bell,
  ArrowLeft,
  Camera,
  Download,
  Upload,
  Send,
  Smartphone,
  Monitor,
  Globe,
  Zap,
  CheckSquare,
  Square,
  Flag,
  AlertTriangle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { ModeToggle } from "@/components/theme-toggle";
import { TaskAssignmentForm } from "@/components/forms/task-assignment-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function OperatorTasksPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [isRequestTaskOpen, setIsRequestTaskOpen] = useState(false);

  // Mock data for tasks
  const tasks = [
    {
      id: 1,
      title: "Register 5 new supporters in Hargeisa Central",
      description:
        "Visit Hargeisa Central district and register 5 new supporters with complete documentation",
      priority: "high",
      status: "in_progress",
      dueDate: "2025-01-20",
      assignedBy: "Admin",
      progress: 60,
      location: "Hargeisa Central",
      estimatedTime: "4 hours",
    },
    {
      id: 2,
      title: "Verify supporter documents in Berbera",
      description:
        "Review and verify uploaded documents for 10 supporters in Berbera district",
      priority: "medium",
      status: "pending",
      dueDate: "2025-01-22",
      assignedBy: "Admin",
      progress: 0,
      location: "Berbera",
      estimatedTime: "2 hours",
    },
    {
      id: 3,
      title: "Transport supporters to polling station",
      description:
        "Arrange transportation for 15 supporters to their assigned polling stations",
      priority: "high",
      status: "completed",
      dueDate: "2025-01-15",
      assignedBy: "Admin",
      progress: 100,
      location: "Hargeisa",
      estimatedTime: "6 hours",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "status-success";
      case "in_progress":
        return "status-info";
      case "pending":
        return "status-warning";
      case "overdue":
        return "status-danger";
      default:
        return "status-info";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-destructive";
      case "medium":
        return "text-warning";
      case "low":
        return "text-accent";
      default:
        return "text-muted-foreground";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-4 w-4" />;
      case "medium":
        return <Flag className="h-4 w-4" />;
      case "low":
        return <CheckSquare className="h-4 w-4" />;
      default:
        return <Square className="h-4 w-4" />;
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarProvider>
      <AppSidebar userType="operator" />
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
                <BreadcrumbLink href="/operator">
                  Operator Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Tasks</BreadcrumbPage>
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
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">My Tasks</h2>
                <p className="text-muted-foreground">
                  Manage your assigned tasks and track progress
                </p>
              </div>
              <Dialog
                open={isRequestTaskOpen}
                onOpenChange={setIsRequestTaskOpen}
              >
                <DialogTrigger asChild>
                  <Button className="btn-gradient">
                    <Plus className="mr-2 h-4 w-4" />
                    Request Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Request New Task</DialogTitle>
                  </DialogHeader>
                  <TaskAssignmentForm
                    onSuccess={() => setIsRequestTaskOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid auto-rows-min gap-4 grid-cols-2 lg:grid-cols-4">
            <Card className="card-professional">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Total Tasks
                </CardTitle>
                <FileText className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-foreground">12</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Completed
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-foreground">8</div>
                <p className="text-xs text-muted-foreground">
                  67% completion rate
                </p>
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  In Progress
                </CardTitle>
                <Activity className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-foreground">3</div>
                <p className="text-xs text-muted-foreground">Active tasks</p>
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Overdue
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-foreground">1</div>
                <p className="text-xs text-muted-foreground">Needs attention</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Recent Tasks */}
                <Card className="card-professional">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-accent" />
                      Recent Tasks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tasks.slice(0, 3).map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center space-x-4 py-3 border-b last:border-b-0"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                            <FileText className="h-4 w-4 text-accent" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm text-foreground truncate">
                              {task.title}
                            </h3>
                            <p className="text-xs text-muted-foreground truncate">
                              {task.location} • Due: {task.dueDate}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge className={getStatusColor(task.status)}>
                                {task.status}
                              </Badge>
                              <span
                                className={`text-xs ${getPriorityColor(
                                  task.priority
                                )}`}
                              >
                                {task.priority} priority
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="card-professional">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button
                        className="w-full justify-start"
                        variant="outline"
                      >
                        <CheckSquare className="mr-2 h-4 w-4" />
                        Mark Task Complete
                      </Button>
                      <Button
                        className="w-full justify-start"
                        variant="outline"
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        Upload Evidence
                      </Button>
                      <Button
                        className="w-full justify-start"
                        variant="outline"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Request Help
                      </Button>
                      <Button
                        className="w-full justify-start"
                        variant="outline"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Export Tasks
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Tasks Tab */}
            <TabsContent value="tasks" className="space-y-4">
              <Card className="card-professional">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      All Tasks
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search tasks..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8 w-64"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <FileText className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground">
                              {task.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {task.description}
                            </p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-xs text-muted-foreground">
                                {task.location}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                Due: {task.dueDate}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {task.estimatedTime}
                              </span>
                              <span
                                className={`text-xs ${getPriorityColor(
                                  task.priority
                                )}`}
                              >
                                {task.priority} priority
                              </span>
                            </div>
                            <div className="mt-2">
                              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                                <span>Progress</span>
                                <span>{task.progress}%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${task.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
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
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Progress Tab */}
            <TabsContent value="progress" className="space-y-4">
              <Card className="card-professional">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    Task Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Progress Tracking
                    </h3>
                    <p className="text-muted-foreground">
                      Detailed progress tracking will be available here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-4">
              <Card className="card-professional">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-secondary" />
                    Task Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Performance Reports
                    </h3>
                    <p className="text-muted-foreground">
                      Task performance reports will be available here
                    </p>
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
