"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Download,
  Filter,
  X,
  RotateCcw,
  Plus,
  CheckCircle,
  AlertCircle,
  Clock,
  UserCheck,
  UserX,
  Send,
  Archive,
  RefreshCw,
  User,
  Shield,
  Phone,
  Mail,
  MapPin,
  Building,
  Calendar,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/ui/data-table";

export type Operator = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: "field_operator" | "supervisor" | "coordinator" | "manager";
  department:
    | "operations"
    | "logistics"
    | "communication"
    | "finance"
    | "security";
  status: "active" | "inactive" | "pending" | "suspended";
  district: string;
  region: string;
  startDate: string;
  salary?: number;
  systemAccess: string[];
  permissions: {
    canManageSupporters: boolean;
    canManageFunds: boolean;
    canSendMessages: boolean;
    canViewReports: boolean;
  };
  lastActive: string;
  createdAt: string;
};

const mockOperators: Operator[] = [
  {
    id: "OP001",
    firstName: "Ahmed",
    lastName: "Hassan",
    email: "ahmed.hassan@campaign.com",
    phone: "+252 61 234 5678",
    position: "manager",
    department: "operations",
    status: "active",
    district: "Hargeisa Central",
    region: "Maroodi Jeex",
    startDate: "2024-01-15",
    salary: 1200,
    systemAccess: ["basic", "intermediate", "advanced"],
    permissions: {
      canManageSupporters: true,
      canManageFunds: true,
      canSendMessages: true,
      canViewReports: true,
    },
    lastActive: "2024-01-20",
    createdAt: "2024-01-15",
  },
  {
    id: "OP002",
    firstName: "Fatima",
    lastName: "Ali",
    email: "fatima.ali@campaign.com",
    phone: "+252 61 234 5679",
    position: "supervisor",
    department: "communication",
    status: "active",
    district: "Berbera",
    region: "Sahil",
    startDate: "2024-01-10",
    salary: 800,
    systemAccess: ["basic", "intermediate"],
    permissions: {
      canManageSupporters: true,
      canManageFunds: false,
      canSendMessages: true,
      canViewReports: true,
    },
    lastActive: "2024-01-19",
    createdAt: "2024-01-10",
  },
  {
    id: "OP003",
    firstName: "Omar",
    lastName: "Mohamed",
    email: "omar.mohamed@campaign.com",
    phone: "+252 61 234 5680",
    position: "field_operator",
    department: "logistics",
    status: "pending",
    district: "Burao",
    region: "Togdheer",
    startDate: "2024-01-18",
    systemAccess: ["basic"],
    permissions: {
      canManageSupporters: false,
      canManageFunds: false,
      canSendMessages: false,
      canViewReports: false,
    },
    lastActive: "2024-01-18",
    createdAt: "2024-01-18",
  },
  {
    id: "OP004",
    firstName: "Aisha",
    lastName: "Ahmed",
    email: "aisha.ahmed@campaign.com",
    phone: "+252 61 234 5681",
    position: "coordinator",
    department: "finance",
    status: "active",
    district: "Borama",
    region: "Awdal",
    startDate: "2024-01-12",
    salary: 1000,
    systemAccess: ["basic", "intermediate", "advanced"],
    permissions: {
      canManageSupporters: false,
      canManageFunds: true,
      canSendMessages: false,
      canViewReports: true,
    },
    lastActive: "2024-01-20",
    createdAt: "2024-01-12",
  },
  {
    id: "OP005",
    firstName: "Hassan",
    lastName: "Ibrahim",
    email: "hassan.ibrahim@campaign.com",
    phone: "+252 61 234 5682",
    position: "field_operator",
    department: "security",
    status: "suspended",
    district: "Las Anod",
    region: "Sool",
    startDate: "2024-01-05",
    systemAccess: ["basic"],
    permissions: {
      canManageSupporters: false,
      canManageFunds: false,
      canSendMessages: false,
      canViewReports: false,
    },
    lastActive: "2024-01-15",
    createdAt: "2024-01-05",
  },
];

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getStatusColor = (status: Operator["status"]) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "inactive":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "suspended":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

const getPositionColor = (position: Operator["position"]) => {
  switch (position) {
    case "manager":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
    case "supervisor":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
    case "coordinator":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400";
    case "field_operator":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

const getDepartmentIcon = (department: Operator["department"]) => {
  switch (department) {
    case "operations":
      return <Shield className="h-4 w-4 text-blue-600" />;
    case "logistics":
      return <Building className="h-4 w-4 text-green-600" />;
    case "communication":
      return <Send className="h-4 w-4 text-purple-600" />;
    case "finance":
      return <Archive className="h-4 w-4 text-orange-600" />;
    case "security":
      return <Shield className="h-4 w-4 text-red-600" />;
    default:
      return <Building className="h-4 w-4 text-gray-600" />;
  }
};

const getStatusIcon = (status: Operator["status"]) => {
  switch (status) {
    case "active":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "inactive":
      return <UserX className="h-4 w-4 text-gray-600" />;
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case "suspended":
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-600" />;
  }
};

export const columns: ColumnDef<Operator>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
          className="h-4 w-4 rounded border-gray-300"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={(e) => row.toggleSelected(!!e.target.checked)}
          className="h-4 w-4 rounded border-gray-300"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3"
        >
          Operator
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const operator = row.original;
      return (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`/avatars/${operator.id}.jpg`} />
            <AvatarFallback className="text-xs">
              {getInitials(`${operator.firstName} ${operator.lastName}`)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="font-medium">
              {operator.firstName} {operator.lastName}
            </div>
            <div className="text-sm text-muted-foreground">{operator.id}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => {
      const position = row.getValue("position") as Operator["position"];
      return (
        <div className="flex items-center space-x-2">
          <Badge className={getPositionColor(position)}>
            {position.replace("_", " ").toUpperCase()}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => {
      const department = row.getValue("department") as Operator["department"];
      return (
        <div className="flex items-center space-x-2">
          {getDepartmentIcon(department)}
          <span className="capitalize">{department}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => {
      const operator = row.original;
      return (
        <div className="space-y-1">
          <div className="flex items-center space-x-1 text-sm">
            <Mail className="h-3 w-3 text-muted-foreground" />
            <span className="truncate max-w-[120px]">{operator.email}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Phone className="h-3 w-3" />
            <span>{operator.phone}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const operator = row.original;
      return (
        <div className="space-y-1">
          <div className="flex items-center space-x-1 text-sm">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <span>{operator.district}</span>
          </div>
          <div className="text-sm text-muted-foreground">{operator.region}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as Operator["status"];
      return (
        <div className="flex items-center space-x-2">
          {getStatusIcon(status)}
          <Badge className={getStatusColor(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "permissions",
    header: "Permissions",
    cell: ({ row }) => {
      const permissions = row.getValue(
        "permissions"
      ) as Operator["permissions"];
      const activePermissions = Object.entries(permissions)
        .filter(([_, value]) => value)
        .map(([key, _]) => key.replace("can", "").toLowerCase());

      return (
        <div className="flex flex-wrap gap-1">
          {activePermissions.slice(0, 2).map((permission) => (
            <Badge key={permission} variant="outline" className="text-xs">
              {permission}
            </Badge>
          ))}
          {activePermissions.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{activePermissions.length - 2}
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => {
      const salary = row.getValue("salary") as number | undefined;
      return salary ? (
        <div className="text-sm font-medium">${salary.toLocaleString()}</div>
      ) : (
        <span className="text-muted-foreground">Not set</span>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3"
        >
          Start Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("startDate"));
      return (
        <div className="flex items-center space-x-1 text-sm">
          <Calendar className="h-3 w-3 text-muted-foreground" />
          <span>{date.toLocaleDateString()}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "lastActive",
    header: "Last Active",
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastActive"));
      return (
        <div className="text-sm text-muted-foreground">
          {date.toLocaleDateString()}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const operator = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Operator Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(operator.id)}
            >
              <User className="mr-2 h-4 w-4" />
              Copy operator ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View full details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit operator info
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Phone className="mr-2 h-4 w-4" />
              Call operator
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              Send email
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Send className="mr-2 h-4 w-4" />
              Send message
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <CheckCircle className="mr-2 h-4 w-4" />
              Activate operator
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserX className="mr-2 h-4 w-4" />
              Deactivate operator
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              Export data
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Archive className="mr-2 h-4 w-4" />
              Archive operator
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete operator
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface OperatorsDataTableProps {
  data?: Operator[];
}

export function OperatorsDataTable({
  data = mockOperators,
}: OperatorsDataTableProps) {
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = React.useState<string>("all");
  const [positionFilter, setPositionFilter] = React.useState<string>("all");

  const filteredData = React.useMemo(() => {
    return data.filter((operator) => {
      const statusMatch =
        statusFilter === "all" || operator.status === statusFilter;
      const departmentMatch =
        departmentFilter === "all" || operator.department === departmentFilter;
      const positionMatch =
        positionFilter === "all" || operator.position === positionFilter;

      return statusMatch && departmentMatch && positionMatch;
    });
  }, [data, statusFilter, departmentFilter, positionFilter]);

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on ${selectedRows.length} operators`);
    // Implement bulk actions here
  };

  const getUniqueDepartments = () => {
    return Array.from(new Set(data.map((o) => o.department))).sort();
  };

  const getUniquePositions = () => {
    return Array.from(new Set(data.map((o) => o.position))).sort();
  };

  return (
    <div className="w-full space-y-4">
      {/* Advanced Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Advanced Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="status-filter">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department-filter">Department</Label>
              <Select
                value={departmentFilter}
                onValueChange={setDepartmentFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {getUniqueDepartments().map((department) => (
                    <SelectItem key={department} value={department}>
                      {department.charAt(0).toUpperCase() + department.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="position-filter">Position</Label>
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Positions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  {getUniquePositions().map((position) => (
                    <SelectItem key={position} value={position}>
                      {position.replace("_", " ").toUpperCase()}
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
                    setStatusFilter("all");
                    setDepartmentFilter("all");
                    setPositionFilter("all");
                  }}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedRows.length > 0 && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">
                  {selectedRows.length} operator(s) selected
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedRows([])}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4 mr-2" />
                      Bulk Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Bulk Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleBulkAction("activate")}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Activate Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleBulkAction("deactivate")}
                    >
                      <UserX className="mr-2 h-4 w-4" />
                      Deactivate Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleBulkAction("suspend")}
                    >
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Suspend Selected
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleBulkAction("export")}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Export Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleBulkAction("message")}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleBulkAction("delete")}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Selected
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Data Table */}
      <div className="w-full overflow-hidden">
        <div className="overflow-x-auto">
          <DataTable columns={columns} data={filteredData} />
        </div>
      </div>
    </div>
  );
}
