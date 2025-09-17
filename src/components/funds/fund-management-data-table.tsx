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
  TrendingUp,
  TrendingDown,
  Receipt,
  FileText,
  Calendar,
  User,
  Building,
  Eye,
  Edit,
  Trash2,
  CreditCard,
  Banknote,
  DollarSign,
  Copy,
  Archive,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

export type FundTransaction = {
  id: string;
  transactionType: "income" | "expense" | "transfer" | "adjustment";
  category: string;
  subcategory?: string;
  amount: number;
  currency: "USD" | "SOS" | "EUR" | "GBP";
  paymentMethod:
    | "cash"
    | "bank_transfer"
    | "mobile_money"
    | "check"
    | "card"
    | "cryptocurrency";
  paymentReference?: string;
  bankAccount?: string;
  transactionId?: string;
  source: string;
  destination?: string;
  donorName?: string;
  donorContact?: string;
  donorEmail?: string;
  purpose: string;
  description: string;
  project?: string;
  campaign?: string;
  transactionDate: string;
  dueDate?: string;
  recurring: boolean;
  recurringFrequency?: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
  requiresApproval: boolean;
  approvedBy?: string;
  approvalDate?: string;
  authorizationLevel?: "low" | "medium" | "high" | "critical";
  receiptNumber?: string;
  invoiceNumber?: string;
  documentPath?: string;
  attachments?: string[];
  budgetCategory?: string;
  allocatedAmount?: number;
  remainingBudget?: number;
  isBudgeted: boolean;
  isTaxDeductible: boolean;
  reportingCategory?: string;
  complianceNotes?: string;
  auditTrail?: string;
  notes?: string;
  tags?: string[];
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "approved" | "rejected" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
};

const mockTransactions: FundTransaction[] = [
  {
    id: "TXN001",
    transactionType: "income",
    category: "Donations",
    subcategory: "Individual Contributions",
    amount: 5000,
    currency: "USD",
    paymentMethod: "bank_transfer",
    paymentReference: "REF001",
    bankAccount: "Somaliland Bank - 1234567890",
    transactionId: "TXN123456789",
    source: "Individual Donor",
    donorName: "Ahmed Hassan",
    donorContact: "+252 61 234 5678",
    donorEmail: "ahmed.hassan@email.com",
    purpose: "Campaign funding",
    description: "Individual donation for campaign activities",
    project: "Voter Registration Drive",
    campaign: "2024 Presidential Campaign",
    transactionDate: "2024-01-20",
    recurring: false,
    requiresApproval: false,
    isBudgeted: true,
    isTaxDeductible: true,
    priority: "medium",
    status: "completed",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
  },
  {
    id: "TXN002",
    transactionType: "expense",
    category: "Campaign Materials",
    subcategory: "Printing",
    amount: 1500,
    currency: "USD",
    paymentMethod: "cash",
    source: "Print Shop Hargeisa",
    purpose: "Print campaign materials",
    description: "Printing of flyers, posters, and banners for rally",
    project: "Rally Organization",
    campaign: "2024 Presidential Campaign",
    transactionDate: "2024-01-18",
    recurring: false,
    requiresApproval: true,
    approvedBy: "Finance Manager",
    approvalDate: "2024-01-17",
    authorizationLevel: "medium",
    receiptNumber: "RCP001",
    budgetCategory: "Marketing",
    allocatedAmount: 2000,
    remainingBudget: 500,
    isBudgeted: true,
    isTaxDeductible: false,
    priority: "high",
    status: "approved",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-18",
  },
  {
    id: "TXN003",
    transactionType: "income",
    category: "Fundraising Events",
    subcategory: "Gala Dinner",
    amount: 25000,
    currency: "USD",
    paymentMethod: "check",
    paymentReference: "CHK001",
    source: "Fundraising Gala",
    donorName: "Corporate Sponsor",
    donorContact: "+252 61 234 5679",
    donorEmail: "sponsor@company.com",
    purpose: "Event fundraising",
    description: "Proceeds from fundraising gala dinner",
    project: "Fundraising Gala",
    campaign: "2024 Presidential Campaign",
    transactionDate: "2024-01-15",
    recurring: false,
    requiresApproval: false,
    isBudgeted: true,
    isTaxDeductible: true,
    priority: "high",
    status: "completed",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "TXN004",
    transactionType: "expense",
    category: "Transportation",
    subcategory: "Vehicle Rental",
    amount: 800,
    currency: "USD",
    paymentMethod: "mobile_money",
    source: "Transport Company",
    purpose: "Campaign transportation",
    description: "Rental of vehicles for campaign events",
    project: "Rally Organization",
    campaign: "2024 Presidential Campaign",
    transactionDate: "2024-01-12",
    recurring: false,
    requiresApproval: true,
    approvedBy: "Operations Manager",
    approvalDate: "2024-01-11",
    authorizationLevel: "low",
    receiptNumber: "RCP002",
    budgetCategory: "Logistics",
    allocatedAmount: 1000,
    remainingBudget: 200,
    isBudgeted: true,
    isTaxDeductible: false,
    priority: "medium",
    status: "approved",
    createdAt: "2024-01-11",
    updatedAt: "2024-01-12",
  },
  {
    id: "TXN005",
    transactionType: "transfer",
    category: "Internal Transfer",
    subcategory: "Account Transfer",
    amount: 10000,
    currency: "USD",
    paymentMethod: "bank_transfer",
    paymentReference: "TRF001",
    source: "Main Campaign Account",
    destination: "Operations Account",
    purpose: "Fund allocation",
    description: "Transfer of funds to operations account for daily expenses",
    project: "General Operations",
    campaign: "2024 Presidential Campaign",
    transactionDate: "2024-01-10",
    recurring: false,
    requiresApproval: true,
    approvedBy: "Finance Director",
    approvalDate: "2024-01-09",
    authorizationLevel: "high",
    isBudgeted: true,
    isTaxDeductible: false,
    priority: "high",
    status: "completed",
    createdAt: "2024-01-09",
    updatedAt: "2024-01-10",
  },
];

const getTransactionTypeColor = (type: FundTransaction["transactionType"]) => {
  switch (type) {
    case "income":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "expense":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    case "transfer":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
    case "adjustment":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

const getStatusColor = (status: FundTransaction["status"]) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "approved":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "rejected":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    case "cancelled":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

const getPriorityColor = (priority: FundTransaction["priority"]) => {
  switch (priority) {
    case "urgent":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    case "high":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

const getTransactionTypeIcon = (type: FundTransaction["transactionType"]) => {
  switch (type) {
    case "income":
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    case "expense":
      return <TrendingDown className="h-4 w-4 text-red-600" />;
    case "transfer":
      return <CreditCard className="h-4 w-4 text-blue-600" />;
    case "adjustment":
      return <FileText className="h-4 w-4 text-orange-600" />;
    default:
      return <DollarSign className="h-4 w-4 text-gray-600" />;
  }
};

const getStatusIcon = (status: FundTransaction["status"]) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "approved":
      return <CheckCircle className="h-4 w-4 text-blue-600" />;
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case "rejected":
      return <X className="h-4 w-4 text-red-600" />;
    case "cancelled":
      return <X className="h-4 w-4 text-gray-600" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-600" />;
  }
};

const getPaymentMethodIcon = (method: FundTransaction["paymentMethod"]) => {
  switch (method) {
    case "cash":
      return <Banknote className="h-4 w-4 text-green-600" />;
    case "bank_transfer":
      return <Building className="h-4 w-4 text-blue-600" />;
    case "mobile_money":
      return <CreditCard className="h-4 w-4 text-purple-600" />;
    case "check":
      return <FileText className="h-4 w-4 text-orange-600" />;
    case "card":
      return <CreditCard className="h-4 w-4 text-indigo-600" />;
    case "cryptocurrency":
      return <DollarSign className="h-4 w-4 text-yellow-600" />;
    default:
      return <DollarSign className="h-4 w-4 text-gray-600" />;
  }
};

export const columns: ColumnDef<FundTransaction>[] = [
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
    accessorKey: "transactionType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3"
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const type = row.getValue(
        "transactionType"
      ) as FundTransaction["transactionType"];
      return (
        <div className="flex items-center space-x-2">
          {getTransactionTypeIcon(type)}
          <Badge className={getTransactionTypeColor(type)}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3"
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const transaction = row.original;
      const isIncome = transaction.transactionType === "income";
      return (
        <div className="space-y-1">
          <div
            className={`text-sm font-medium ${
              isIncome ? "text-green-600" : "text-red-600"
            }`}
          >
            {isIncome ? "+" : "-"}${transaction.amount.toLocaleString()}{" "}
            {transaction.currency}
          </div>
          <div className="text-xs text-muted-foreground">
            {transaction.category}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "purpose",
    header: "Purpose",
    cell: ({ row }) => {
      const purpose = row.getValue("purpose") as string;
      const description = row.original.description;
      return (
        <div className="space-y-1">
          <div className="font-medium max-w-[200px] truncate">{purpose}</div>
          <div className="text-sm text-muted-foreground max-w-[200px] truncate">
            {description}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "source",
    header: "Source/Destination",
    cell: ({ row }) => {
      const transaction = row.original;
      return (
        <div className="space-y-1">
          <div className="text-sm font-medium">{transaction.source}</div>
          {transaction.destination && (
            <div className="text-sm text-muted-foreground">
              → {transaction.destination}
            </div>
          )}
          {transaction.donorName && (
            <div className="text-sm text-muted-foreground">
              {transaction.donorName}
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row }) => {
      const method = row.getValue(
        "paymentMethod"
      ) as FundTransaction["paymentMethod"];
      return (
        <div className="flex items-center space-x-2">
          {getPaymentMethodIcon(method)}
          <span className="capitalize text-sm">{method.replace("_", " ")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
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
      const status = row.getValue("status") as FundTransaction["status"];
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
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as FundTransaction["priority"];
      return (
        <Badge className={getPriorityColor(priority)}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "transactionDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("transactionDate"));
      return (
        <div className="flex items-center space-x-1 text-sm">
          <Calendar className="h-3 w-3 text-muted-foreground" />
          <span>{date.toLocaleDateString()}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "project",
    header: "Project/Campaign",
    cell: ({ row }) => {
      const transaction = row.original;
      return (
        <div className="space-y-1">
          {transaction.project && (
            <div className="text-sm font-medium">{transaction.project}</div>
          )}
          {transaction.campaign && (
            <div className="text-sm text-muted-foreground">
              {transaction.campaign}
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "budget",
    header: "Budget Info",
    cell: ({ row }) => {
      const transaction = row.original;
      if (!transaction.isBudgeted) {
        return (
          <span className="text-muted-foreground text-sm">Not budgeted</span>
        );
      }
      return (
        <div className="space-y-1">
          {transaction.budgetCategory && (
            <div className="text-sm font-medium">
              {transaction.budgetCategory}
            </div>
          )}
          {transaction.allocatedAmount && (
            <div className="text-sm text-muted-foreground">
              ${transaction.allocatedAmount.toLocaleString()} allocated
            </div>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Transaction Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(transaction.id)}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy transaction ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View full details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit transaction
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Receipt className="mr-2 h-4 w-4" />
              View receipt
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4" />
              Download invoice
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve transaction
            </DropdownMenuItem>
            <DropdownMenuItem>
              <X className="mr-2 h-4 w-4" />
              Reject transaction
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Archive className="mr-2 h-4 w-4" />
              Archive transaction
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete transaction
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface FundManagementDataTableProps {
  data?: FundTransaction[];
}

export function FundManagementDataTable({
  data = mockTransactions,
}: FundManagementDataTableProps) {
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [typeFilter, setTypeFilter] = React.useState<string>("all");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [priorityFilter, setPriorityFilter] = React.useState<string>("all");

  const filteredData = React.useMemo(() => {
    return data.filter((transaction) => {
      const typeMatch =
        typeFilter === "all" || transaction.transactionType === typeFilter;
      const statusMatch =
        statusFilter === "all" || transaction.status === statusFilter;
      const priorityMatch =
        priorityFilter === "all" || transaction.priority === priorityFilter;

      return typeMatch && statusMatch && priorityMatch;
    });
  }, [data, typeFilter, statusFilter, priorityFilter]);

  const handleBulkAction = (action: string) => {
    console.log(
      `Bulk action: ${action} on ${selectedRows.length} transactions`
    );
    // Implement bulk actions here
  };

  const getUniqueTypes = () => {
    return Array.from(new Set(data.map((t) => t.transactionType))).sort();
  };

  const getUniqueStatuses = () => {
    return Array.from(new Set(data.map((t) => t.status))).sort();
  };

  const getUniquePriorities = () => {
    return Array.from(new Set(data.map((t) => t.priority))).sort();
  };

  // Calculate totals
  const totalIncome = data
    .filter((t) => t.transactionType === "income" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = data
    .filter((t) => t.transactionType === "expense" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const netAmount = totalIncome - totalExpenses;

  return (
    <div className="w-full space-y-4">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Total Income</span>
            </div>
            <div className="text-2xl font-bold text-green-600">
              ${totalIncome.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium">Total Expenses</span>
            </div>
            <div className="text-2xl font-bold text-red-600">
              ${totalExpenses.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Net Amount</span>
            </div>
            <div
              className={`text-2xl font-bold ${
                netAmount >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              ${netAmount.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

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
              <Label htmlFor="type-filter">Transaction Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {getUniqueTypes().map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status-filter">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {getUniqueStatuses().map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority-filter">Priority</Label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  {getUniquePriorities().map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
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
                    setTypeFilter("all");
                    setStatusFilter("all");
                    setPriorityFilter("all");
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
                  {selectedRows.length} transaction(s) selected
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
                      onClick={() => handleBulkAction("approve")}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleBulkAction("reject")}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Reject Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleBulkAction("export")}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Export Selected
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleBulkAction("archive")}
                    >
                      <Archive className="mr-2 h-4 w-4" />
                      Archive Selected
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
