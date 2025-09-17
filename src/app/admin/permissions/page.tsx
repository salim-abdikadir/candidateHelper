"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Shield,
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Settings,
  UserCheck,
  UserX,
  RefreshCw,
} from "lucide-react";

interface Operator {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  status: "active" | "inactive" | "pending";
  permissions: {
    canManageSupporters: boolean;
    canManageFunds: boolean;
    canSendMessages: boolean;
    canViewReports: boolean;
    canManageEvents: boolean;
    canManageTransport: boolean;
    canAccessAdmin: boolean;
    canManageOperators: boolean;
  };
  lastActive: string;
}

const mockOperators: Operator[] = [
  {
    id: "OP001",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@campaign.com",
    position: "Manager",
    department: "Operations",
    status: "active",
    permissions: {
      canManageSupporters: true,
      canManageFunds: true,
      canSendMessages: true,
      canViewReports: true,
      canManageEvents: true,
      canManageTransport: true,
      canAccessAdmin: false,
      canManageOperators: false,
    },
    lastActive: "2024-01-20",
  },
  {
    id: "OP002",
    name: "Fatima Ali",
    email: "fatima.ali@campaign.com",
    position: "Supervisor",
    department: "Communication",
    status: "active",
    permissions: {
      canManageSupporters: true,
      canManageFunds: false,
      canSendMessages: true,
      canViewReports: true,
      canManageEvents: false,
      canManageTransport: false,
      canAccessAdmin: false,
      canManageOperators: false,
    },
    lastActive: "2024-01-19",
  },
  {
    id: "OP003",
    name: "Omar Mohamed",
    email: "omar.mohamed@campaign.com",
    position: "Field Operator",
    department: "Logistics",
    status: "pending",
    permissions: {
      canManageSupporters: false,
      canManageFunds: false,
      canSendMessages: false,
      canViewReports: false,
      canManageEvents: false,
      canManageTransport: false,
      canAccessAdmin: false,
      canManageOperators: false,
    },
    lastActive: "2024-01-18",
  },
];

const permissionLabels = {
  canManageSupporters: "Manage Supporters",
  canManageFunds: "Manage Funds",
  canSendMessages: "Send Messages",
  canViewReports: "View Reports",
  canManageEvents: "Manage Events",
  canManageTransport: "Manage Transport",
  canAccessAdmin: "Access Admin Panel",
  canManageOperators: "Manage Operators",
};

const getStatusColor = (status: Operator["status"]) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "inactive":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export default function OperatorPermissionsPage() {
  const [operators, setOperators] = useState<Operator[]>(mockOperators);
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(
    null
  );
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");

  const filteredOperators = operators.filter((operator) => {
    const matchesSearch =
      operator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      operator.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || operator.status === statusFilter;
    const matchesDepartment =
      departmentFilter === "all" || operator.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const handlePermissionChange = (
    operatorId: string,
    permission: keyof Operator["permissions"],
    value: boolean
  ) => {
    setOperators((prev) =>
      prev.map((op) =>
        op.id === operatorId
          ? { ...op, permissions: { ...op.permissions, [permission]: value } }
          : op
      )
    );
  };

  const handleSavePermissions = (operator: Operator) => {
    setOperators((prev) =>
      prev.map((op) => (op.id === operator.id ? operator : op))
    );
    setIsEditDialogOpen(false);
    setSelectedOperator(null);
  };

  const getUniqueDepartments = () => {
    return Array.from(new Set(operators.map((op) => op.department))).sort();
  };

  const getPermissionStats = () => {
    const total = operators.length;
    const active = operators.filter((op) => op.status === "active").length;
    const withAdminAccess = operators.filter(
      (op) => op.permissions.canAccessAdmin
    ).length;
    const withFullAccess = operators.filter((op) =>
      Object.values(op.permissions).every((p) => p === true)
    ).length;

    return { total, active, withAdminAccess, withFullAccess };
  };

  const stats = getPermissionStats();

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground">
          Operator Permissions
        </h2>
        <p className="text-muted-foreground">
          Manage operator access levels and permissions across the system
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="operators">Operators</TabsTrigger>
          <TabsTrigger value="permissions">Permission Matrix</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Total Operators</span>
                </div>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center space-x-2">
                  <UserCheck className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Active</span>
                </div>
                <div className="text-2xl font-bold">{stats.active}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">Admin Access</span>
                </div>
                <div className="text-2xl font-bold">
                  {stats.withAdminAccess}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium">Full Access</span>
                </div>
                <div className="text-2xl font-bold">{stats.withFullAccess}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Permission Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(permissionLabels).map(([key, label]) => {
                    const count = operators.filter(
                      (op) =>
                        op.permissions[key as keyof Operator["permissions"]]
                    ).length;
                    const percentage = (count / operators.length) * 100;
                    return (
                      <div key={key} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{label}</span>
                          <span>
                            {count}/{operators.length}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Recent Changes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Ahmed Hassan</p>
                      <p className="text-xs text-muted-foreground">
                        Granted admin access
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      2 hours ago
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Fatima Ali</p>
                      <p className="text-xs text-muted-foreground">
                        Permission updated
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      1 day ago
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Omar Mohamed</p>
                      <p className="text-xs text-muted-foreground">
                        New operator added
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      3 days ago
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Operators Tab */}
        <TabsContent value="operators" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search operators..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={departmentFilter}
                    onValueChange={setDepartmentFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Departments" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {getUniqueDepartments().map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Actions</Label>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchTerm("");
                        setStatusFilter("all");
                        setDepartmentFilter("all");
                      }}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Operators Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Operators ({filteredOperators.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Operator</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOperators.map((operator) => (
                    <TableRow key={operator.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/avatars/${operator.id}.jpg`} />
                            <AvatarFallback className="text-xs">
                              {getInitials(operator.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{operator.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {operator.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{operator.position}</TableCell>
                      <TableCell>{operator.department}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(operator.status)}>
                          {operator.status.charAt(0).toUpperCase() +
                            operator.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(operator.permissions)
                            .filter(([_, value]) => value)
                            .slice(0, 3)
                            .map(([key, _]) => (
                              <Badge
                                key={key}
                                variant="outline"
                                className="text-xs"
                              >
                                {
                                  permissionLabels[
                                    key as keyof typeof permissionLabels
                                  ].split(" ")[0]
                                }
                              </Badge>
                            ))}
                          {Object.values(operator.permissions).filter(Boolean)
                            .length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +
                              {Object.values(operator.permissions).filter(
                                Boolean
                              ).length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedOperator(operator)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>
                                Edit Permissions - {operator.name}
                              </DialogTitle>
                              <DialogDescription>
                                Manage permissions for {operator.name} (
                                {operator.position})
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid gap-4 md:grid-cols-2">
                                {Object.entries(permissionLabels).map(
                                  ([key, label]) => (
                                    <div
                                      key={key}
                                      className="flex items-center justify-between"
                                    >
                                      <Label
                                        htmlFor={key}
                                        className="text-sm font-medium"
                                      >
                                        {label}
                                      </Label>
                                      <Button
                                        variant={
                                          operator.permissions[
                                            key as keyof Operator["permissions"]
                                          ]
                                            ? "default"
                                            : "outline"
                                        }
                                        size="sm"
                                        onClick={() =>
                                          handlePermissionChange(
                                            operator.id,
                                            key as keyof Operator["permissions"],
                                            !operator.permissions[
                                              key as keyof Operator["permissions"]
                                            ]
                                          )
                                        }
                                      >
                                        {operator.permissions[
                                          key as keyof Operator["permissions"]
                                        ] ? (
                                          <Unlock className="h-4 w-4" />
                                        ) : (
                                          <Lock className="h-4 w-4" />
                                        )}
                                      </Button>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => setSelectedOperator(null)}
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={() => handleSavePermissions(operator)}
                              >
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permission Matrix Tab */}
        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Permission Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Operator</TableHead>
                      {Object.values(permissionLabels).map((label) => (
                        <TableHead key={label} className="text-center">
                          {label}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {operators.map((operator) => (
                      <TableRow key={operator.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={`/avatars/${operator.id}.jpg`}
                              />
                              <AvatarFallback className="text-xs">
                                {getInitials(operator.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">
                                {operator.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {operator.position}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        {Object.keys(permissionLabels).map((key) => (
                          <TableCell key={key} className="text-center">
                            {operator.permissions[
                              key as keyof Operator["permissions"]
                            ] ? (
                              <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                            ) : (
                              <X className="h-4 w-4 text-red-600 mx-auto" />
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
