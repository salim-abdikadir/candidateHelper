"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Download,
  Filter,
  X,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Clock,
  UserCheck,
  UserX,
  Send,
  Archive,
  RefreshCw,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export type Supporter = {
  id: string;
  name: string;
  email: string;
  phone: string;
  district: string;
  region: string;
  status: "active" | "inactive" | "pending" | "verified";
  registrationDate: string;
  lastActivity: string;
  communicationMethod: "sms" | "email" | "phone" | "whatsapp";
  preferredLanguage: "somali" | "arabic" | "english";
  occupation?: string;
  education?: string;
  age: number;
  gender: "male" | "female" | "other";
};

const mockSupporters: Supporter[] = [
  {
    id: "1",
    name: "Ahmed Hassan Ali",
    email: "ahmed.hassan@email.com",
    phone: "+252 61 234 5678",
    district: "Hargeisa Central",
    region: "Maroodi Jeex",
    status: "verified",
    registrationDate: "2024-01-15",
    lastActivity: "2024-01-20",
    communicationMethod: "whatsapp",
    preferredLanguage: "somali",
    occupation: "Teacher",
    education: "bachelor",
    age: 28,
    gender: "male",
  },
  {
    id: "2",
    name: "Fatima Mohamed",
    email: "fatima.mohamed@email.com",
    phone: "+252 61 345 6789",
    district: "Hargeisa North",
    region: "Maroodi Jeex",
    status: "active",
    registrationDate: "2024-01-18",
    lastActivity: "2024-01-19",
    communicationMethod: "sms",
    preferredLanguage: "somali",
    occupation: "Nurse",
    education: "diploma",
    age: 32,
    gender: "female",
  },
  {
    id: "3",
    name: "Omar Abdullahi",
    email: "omar.abdullahi@email.com",
    phone: "+252 61 456 7890",
    district: "Berbera",
    region: "Sahil",
    status: "pending",
    registrationDate: "2024-01-20",
    lastActivity: "2024-01-20",
    communicationMethod: "email",
    preferredLanguage: "english",
    occupation: "Engineer",
    education: "master",
    age: 35,
    gender: "male",
  },
  {
    id: "4",
    name: "Amina Said",
    email: "amina.said@email.com",
    phone: "+252 61 567 8901",
    district: "Burao",
    region: "Togdheer",
    status: "verified",
    registrationDate: "2024-01-12",
    lastActivity: "2024-01-21",
    communicationMethod: "phone",
    preferredLanguage: "arabic",
    occupation: "Doctor",
    education: "phd",
    age: 29,
    gender: "female",
  },
  {
    id: "5",
    name: "Hassan Ibrahim",
    email: "hassan.ibrahim@email.com",
    phone: "+252 61 678 9012",
    district: "Borama",
    region: "Awdal",
    status: "inactive",
    registrationDate: "2024-01-05",
    lastActivity: "2024-01-10",
    communicationMethod: "whatsapp",
    preferredLanguage: "somali",
    occupation: "Business Owner",
    education: "secondary",
    age: 45,
    gender: "male",
  },
  {
    id: "6",
    name: "Khadija Ali",
    email: "khadija.ali@email.com",
    phone: "+252 61 789 0123",
    district: "Las Anod",
    region: "Sool",
    status: "active",
    registrationDate: "2024-01-22",
    lastActivity: "2024-01-22",
    communicationMethod: "sms",
    preferredLanguage: "somali",
    occupation: "Student",
    education: "secondary",
    age: 22,
    gender: "female",
  },
  {
    id: "7",
    name: "Mohamed Yusuf",
    email: "mohamed.yusuf@email.com",
    phone: "+252 61 890 1234",
    district: "Erigavo",
    region: "Sanaag",
    status: "verified",
    registrationDate: "2024-01-08",
    lastActivity: "2024-01-21",
    communicationMethod: "email",
    preferredLanguage: "english",
    occupation: "Government Official",
    education: "bachelor",
    age: 38,
    gender: "male",
  },
  {
    id: "8",
    name: "Asha Ahmed",
    email: "asha.ahmed@email.com",
    phone: "+252 61 901 2345",
    district: "Hargeisa South",
    region: "Maroodi Jeex",
    status: "pending",
    registrationDate: "2024-01-23",
    lastActivity: "2024-01-23",
    communicationMethod: "whatsapp",
    preferredLanguage: "somali",
    occupation: "Teacher",
    education: "diploma",
    age: 26,
    gender: "female",
  },
];

const getStatusColor = (status: Supporter["status"]) => {
  switch (status) {
    case "verified":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "active":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "inactive":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

const getCommunicationIcon = (method: Supporter["communicationMethod"]) => {
  switch (method) {
    case "sms":
    case "whatsapp":
      return <Phone className="h-4 w-4" />;
    case "email":
      return <Mail className="h-4 w-4" />;
    case "phone":
      return <Phone className="h-4 w-4" />;
    default:
      return <Mail className="h-4 w-4" />;
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

const getStatusIcon = (status: Supporter["status"]) => {
  switch (status) {
    case "verified":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "active":
      return <UserCheck className="h-4 w-4 text-blue-600" />;
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case "inactive":
      return <UserX className="h-4 w-4 text-gray-600" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-600" />;
  }
};

export const columns: ColumnDef<Supporter>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
          className="h-4 w-4 rounded border-gray-300"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
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
          Supporter
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const supporter = row.original;
      return (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt={supporter.name} />
            <AvatarFallback className="text-xs">
              {getInitials(supporter.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-foreground">{supporter.name}</div>
            <div className="text-sm text-muted-foreground">
              {supporter.occupation || "No occupation"}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => {
      const supporter = row.original;
      return (
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-sm">
            <Mail className="h-3 w-3 text-muted-foreground" />
            <span className="text-foreground">{supporter.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Phone className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">{supporter.phone}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const supporter = row.original;
      return (
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <span className="text-foreground">{supporter.district}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {supporter.region}
          </div>
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
      const status = row.getValue("status") as Supporter["status"];
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
    accessorKey: "communicationMethod",
    header: "Communication",
    cell: ({ row }) => {
      const method = row.getValue(
        "communicationMethod"
      ) as Supporter["communicationMethod"];
      return (
        <div className="flex items-center space-x-2">
          {getCommunicationIcon(method)}
          <span className="text-sm capitalize">{method}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "preferredLanguage",
    header: "Language",
    cell: ({ row }) => {
      const language = row.getValue(
        "preferredLanguage"
      ) as Supporter["preferredLanguage"];
      return (
        <Badge variant="outline" className="text-xs">
          {language.charAt(0).toUpperCase() + language.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "age",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3"
        >
          Age
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const age = row.getValue("age") as number;
      return <div className="text-sm">{age} years</div>;
    },
  },
  {
    accessorKey: "registrationDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3"
        >
          Registered
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("registrationDate"));
      return <div className="text-sm">{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "lastActivity",
    header: "Last Activity",
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastActivity"));
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
      const supporter = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Supporter Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(supporter.id)}
            >
              <User className="mr-2 h-4 w-4" />
              Copy supporter ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View full details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit supporter info
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Phone className="mr-2 h-4 w-4" />
              Call supporter
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              Send email
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Send className="mr-2 h-4 w-4" />
              Send SMS
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <CheckCircle className="mr-2 h-4 w-4" />
              Verify supporter
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserCheck className="mr-2 h-4 w-4" />
              Activate supporter
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserX className="mr-2 h-4 w-4" />
              Deactivate supporter
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              Export data
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Archive className="mr-2 h-4 w-4" />
              Archive supporter
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete supporter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface SupportersDataTableProps {
  data?: Supporter[];
}

export function SupportersDataTable({
  data = mockSupporters,
}: SupportersDataTableProps) {
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [districtFilter, setDistrictFilter] = React.useState<string>("all");
  const [communicationFilter, setCommunicationFilter] =
    React.useState<string>("all");

  const filteredData = React.useMemo(() => {
    return data.filter((supporter) => {
      const statusMatch =
        statusFilter === "all" || supporter.status === statusFilter;
      const districtMatch =
        districtFilter === "all" || supporter.district === districtFilter;
      const communicationMatch =
        communicationFilter === "all" ||
        supporter.communicationMethod === communicationFilter;

      return statusMatch && districtMatch && communicationMatch;
    });
  }, [data, statusFilter, districtFilter, communicationFilter]);

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on ${selectedRows.length} supporters`);
    // Implement bulk actions here
  };

  const getUniqueDistricts = () => {
    return Array.from(new Set(data.map((s) => s.district))).sort();
  };

  const getUniqueCommunicationMethods = () => {
    return Array.from(new Set(data.map((s) => s.communicationMethod))).sort();
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
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="district-filter">District</Label>
              <Select value={districtFilter} onValueChange={setDistrictFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Districts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  {getUniqueDistricts().map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="communication-filter">Communication</Label>
              <Select
                value={communicationFilter}
                onValueChange={setCommunicationFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Methods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  {getUniqueCommunicationMethods().map((method) => (
                    <SelectItem key={method} value={method}>
                      {method.charAt(0).toUpperCase() + method.slice(1)}
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
                    setDistrictFilter("all");
                    setCommunicationFilter("all");
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
                  {selectedRows.length} supporter(s) selected
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
                      onClick={() => handleBulkAction("verify")}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Verify Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleBulkAction("activate")}
                    >
                      <UserCheck className="mr-2 h-4 w-4" />
                      Activate Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleBulkAction("deactivate")}
                    >
                      <UserX className="mr-2 h-4 w-4" />
                      Deactivate Selected
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
