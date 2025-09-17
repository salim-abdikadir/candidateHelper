"use client";
import React, { useState } from "react";
import {
  Shield,
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
  FileText,
  Camera,
  Download,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ModeToggle } from "@/components/theme-toggle";
import { SupporterRegistrationForm } from "@/components/forms/supporter-registration-form";
import { SupportersDataTable } from "@/components/supporters/supporters-data-table";

export default function AdminSupportersPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddSupporterOpen, setIsAddSupporterOpen] = useState(false);

  // Mock data for supporters
  const supporters = [
    {
      id: 1,
      name: "Ahmed Hassan",
      phone: "+252 61 234 5678",
      email: "ahmed.hassan@email.com",
      district: "Hargeisa Central",
      status: "verified",
      registrationDate: "2025-01-15",
      pollingStation: "Hargeisa Central Polling Center",
      documentsUploaded: true,
      lastActive: "2 hours ago",
      operator: "Ahmed Ali",
      benefits: "Eligible",
    },
    {
      id: 2,
      name: "Fatima Ali",
      phone: "+252 61 234 5679",
      email: "fatima.ali@email.com",
      district: "Hargeisa North",
      status: "pending",
      registrationDate: "2025-01-20",
      pollingStation: "Hargeisa North Polling Center",
      documentsUploaded: false,
      lastActive: "1 day ago",
      operator: "Omar Mohamed",
      benefits: "Under Review",
    },
    {
      id: 3,
      name: "Omar Mohamed",
      phone: "+252 61 234 5680",
      email: "omar.mohamed@email.com",
      district: "Berbera",
      status: "rejected",
      registrationDate: "2025-01-10",
      pollingStation: "Berbera Polling Center",
      documentsUploaded: true,
      lastActive: "3 days ago",
      operator: "Fatima Ali",
      benefits: "Not Eligible",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "status-success";
      case "pending":
        return "status-warning";
      case "rejected":
        return "status-danger";
      default:
        return "status-info";
    }
  };

  const filteredSupporters = supporters.filter(
    (supporter) =>
      supporter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supporter.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Supporters</h2>
            <p className="text-muted-foreground">
              Manage supporter registrations and verification
            </p>
          </div>
          <Dialog
            open={isAddSupporterOpen}
            onOpenChange={setIsAddSupporterOpen}
          >
            <DialogTrigger asChild>
              <Button className="btn-gradient">
                <Plus className="mr-2 h-4 w-4" />
                Add Supporter
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Register New Supporter</DialogTitle>
              </DialogHeader>
              <SupporterRegistrationForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid auto-rows-min gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="card-professional">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Total Supporters
            </CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-foreground">12,450</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="card-professional">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Verified
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-foreground">8,920</div>
            <p className="text-xs text-muted-foreground">72% of total</p>
          </CardContent>
        </Card>

        <Card className="card-professional">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Pending Review
            </CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-foreground">2,340</div>
            <p className="text-xs text-muted-foreground">
              Awaiting verification
            </p>
          </CardContent>
        </Card>

        <Card className="card-professional">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Rejected
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-foreground">1,190</div>
            <p className="text-xs text-muted-foreground">9% of total</p>
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
          <TabsTrigger value="supporters">Supporters</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Recent Registrations */}
            <Card className="card-professional">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-accent" />
                  Recent Registrations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Ahmed Hassan",
                      district: "Hargeisa Central",
                      status: "verified",
                      time: "2 hours ago",
                    },
                    {
                      name: "Fatima Ali",
                      district: "Hargeisa North",
                      status: "pending",
                      time: "4 hours ago",
                    },
                    {
                      name: "Omar Mohamed",
                      district: "Berbera",
                      status: "rejected",
                      time: "1 day ago",
                    },
                  ].map((supporter, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 py-3 border-b last:border-b-0"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                        <User className="h-4 w-4 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-foreground truncate">
                          {supporter.name}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate">
                          {supporter.district}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(supporter.status)}>
                          {supporter.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {supporter.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Verification Status */}
            <Card className="card-professional">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Verification Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      status: "Verified",
                      count: 8920,
                      percentage: 72,
                      color: "text-accent",
                    },
                    {
                      status: "Pending",
                      count: 2340,
                      percentage: 19,
                      color: "text-warning",
                    },
                    {
                      status: "Rejected",
                      count: 1190,
                      percentage: 9,
                      color: "text-destructive",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            item.status === "Verified"
                              ? "bg-accent/10"
                              : item.status === "Pending"
                              ? "bg-warning/10"
                              : "bg-destructive/10"
                          }`}
                        >
                          <CheckCircle
                            className={`h-4 w-4 ${
                              item.status === "Verified"
                                ? "text-accent"
                                : item.status === "Pending"
                                ? "text-warning"
                                : "text-destructive"
                            }`}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm text-foreground">
                            {item.status}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {item.count.toLocaleString()} supporters
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-bold ${item.color}`}>
                          {item.percentage}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Supporters Tab */}
        <TabsContent value="supporters" className="space-y-4">
          <Card className="card-professional">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                All Supporters
              </CardTitle>
              <p className="text-muted-foreground">
                View and manage all registered supporters with advanced
                filtering and sorting
              </p>
            </CardHeader>
            <CardContent>
              <SupportersDataTable />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Register Tab */}
        <TabsContent value="register" className="space-y-4">
          <SupporterRegistrationForm />
        </TabsContent>

        {/* Verification Tab */}
        <TabsContent value="verification" className="space-y-4">
          <Card className="card-professional">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-accent" />
                Document Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Document Verification
                </h3>
                <p className="text-muted-foreground">
                  Document verification tools will be available here
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
                Supporter Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Detailed Reports
                </h3>
                <p className="text-muted-foreground">
                  Comprehensive supporter reports will be available here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
