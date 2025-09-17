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
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Video,
  Mic,
  Image,
  ExternalLink,
  Copy,
  Share,
  Archive,
  RefreshCw,
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

export type Event = {
  id: string;
  title: string;
  description: string;
  eventType:
    | "rally"
    | "meeting"
    | "conference"
    | "workshop"
    | "fundraiser"
    | "other";
  category: "public" | "private" | "invitation_only" | "media_event";
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  timezone: string;
  venue: string;
  address: string;
  city: string;
  district: string;
  region: string;
  maxAttendees: number;
  expectedAttendees: number;
  registeredAttendees: number;
  budget?: number;
  estimatedCost?: number;
  status:
    | "draft"
    | "scheduled"
    | "ongoing"
    | "completed"
    | "cancelled"
    | "postponed";
  organizerName: string;
  organizerPhone: string;
  organizerEmail: string;
  mediaCoverage: boolean;
  liveStreaming: boolean;
  recordingAllowed: boolean;
  socialMediaPromotion: boolean;
  pressRelease: boolean;
  securityRequired: boolean;
  medicalSupport: boolean;
  createdAt: string;
  updatedAt: string;
};

const mockEvents: Event[] = [
  {
    id: "EVT001",
    title: "Presidential Campaign Rally",
    description:
      "Major campaign rally in Hargeisa with keynote speeches and supporter engagement",
    eventType: "rally",
    category: "public",
    startDate: "2024-02-15",
    endDate: "2024-02-15",
    startTime: "14:00",
    endTime: "18:00",
    timezone: "Africa/Mogadishu",
    venue: "Hargeisa Stadium",
    address: "Hargeisa Stadium, Hargeisa, Somaliland",
    city: "Hargeisa",
    district: "Hargeisa Central",
    region: "Maroodi Jeex",
    maxAttendees: 5000,
    expectedAttendees: 3500,
    registeredAttendees: 2800,
    budget: 15000,
    estimatedCost: 12000,
    status: "scheduled",
    organizerName: "Ahmed Hassan",
    organizerPhone: "+252 61 234 5678",
    organizerEmail: "ahmed.hassan@campaign.com",
    mediaCoverage: true,
    liveStreaming: true,
    recordingAllowed: true,
    socialMediaPromotion: true,
    pressRelease: true,
    securityRequired: true,
    medicalSupport: true,
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
  },
  {
    id: "EVT002",
    title: "Youth Engagement Workshop",
    description:
      "Interactive workshop focusing on youth participation in politics",
    eventType: "workshop",
    category: "invitation_only",
    startDate: "2024-02-10",
    endDate: "2024-02-10",
    startTime: "09:00",
    endTime: "16:00",
    timezone: "Africa/Mogadishu",
    venue: "Hargeisa University",
    address: "Hargeisa University, Hargeisa, Somaliland",
    city: "Hargeisa",
    district: "Hargeisa North",
    region: "Maroodi Jeex",
    maxAttendees: 200,
    expectedAttendees: 150,
    registeredAttendees: 120,
    budget: 5000,
    estimatedCost: 4500,
    status: "completed",
    organizerName: "Fatima Ali",
    organizerPhone: "+252 61 234 5679",
    organizerEmail: "fatima.ali@campaign.com",
    mediaCoverage: false,
    liveStreaming: false,
    recordingAllowed: false,
    socialMediaPromotion: true,
    pressRelease: false,
    securityRequired: false,
    medicalSupport: false,
    createdAt: "2024-01-15",
    updatedAt: "2024-02-10",
  },
  {
    id: "EVT003",
    title: "Fundraising Gala Dinner",
    description: "Elegant fundraising event for campaign supporters and donors",
    eventType: "fundraiser",
    category: "private",
    startDate: "2024-02-20",
    endDate: "2024-02-20",
    startTime: "19:00",
    endTime: "23:00",
    timezone: "Africa/Mogadishu",
    venue: "Hargeisa Hotel",
    address: "Hargeisa Hotel, Hargeisa, Somaliland",
    city: "Hargeisa",
    district: "Hargeisa Central",
    region: "Maroodi Jeex",
    maxAttendees: 300,
    expectedAttendees: 250,
    registeredAttendees: 200,
    budget: 25000,
    estimatedCost: 20000,
    status: "scheduled",
    organizerName: "Omar Mohamed",
    organizerPhone: "+252 61 234 5680",
    organizerEmail: "omar.mohamed@campaign.com",
    mediaCoverage: true,
    liveStreaming: false,
    recordingAllowed: false,
    socialMediaPromotion: false,
    pressRelease: true,
    securityRequired: true,
    medicalSupport: false,
    createdAt: "2024-01-18",
    updatedAt: "2024-01-18",
  },
  {
    id: "EVT004",
    title: "Community Meeting - Berbera",
    description:
      "Community engagement meeting to discuss local issues and campaign promises",
    eventType: "meeting",
    category: "public",
    startDate: "2024-02-05",
    endDate: "2024-02-05",
    startTime: "16:00",
    endTime: "19:00",
    timezone: "Africa/Mogadishu",
    venue: "Berbera Community Center",
    address: "Berbera Community Center, Berbera, Somaliland",
    city: "Berbera",
    district: "Berbera",
    region: "Sahil",
    maxAttendees: 500,
    expectedAttendees: 300,
    registeredAttendees: 250,
    budget: 3000,
    estimatedCost: 2500,
    status: "ongoing",
    organizerName: "Aisha Ahmed",
    organizerPhone: "+252 61 234 5681",
    organizerEmail: "aisha.ahmed@campaign.com",
    mediaCoverage: false,
    liveStreaming: false,
    recordingAllowed: true,
    socialMediaPromotion: true,
    pressRelease: false,
    securityRequired: false,
    medicalSupport: false,
    createdAt: "2024-01-12",
    updatedAt: "2024-02-05",
  },
  {
    id: "EVT005",
    title: "Media Conference",
    description: "Press conference to announce new campaign initiatives",
    eventType: "conference",
    category: "media_event",
    startDate: "2024-02-08",
    endDate: "2024-02-08",
    startTime: "10:00",
    endTime: "12:00",
    timezone: "Africa/Mogadishu",
    venue: "Campaign Headquarters",
    address: "Campaign Headquarters, Hargeisa, Somaliland",
    city: "Hargeisa",
    district: "Hargeisa Central",
    region: "Maroodi Jeex",
    maxAttendees: 100,
    expectedAttendees: 50,
    registeredAttendees: 45,
    budget: 2000,
    estimatedCost: 1500,
    status: "cancelled",
    organizerName: "Hassan Ibrahim",
    organizerPhone: "+252 61 234 5682",
    organizerEmail: "hassan.ibrahim@campaign.com",
    mediaCoverage: true,
    liveStreaming: true,
    recordingAllowed: true,
    socialMediaPromotion: true,
    pressRelease: true,
    securityRequired: false,
    medicalSupport: false,
    createdAt: "2024-01-25",
    updatedAt: "2024-02-07",
  },
];

const getEventTypeColor = (eventType: Event["eventType"]) => {
  switch (eventType) {
    case "rally":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    case "meeting":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
    case "conference":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
    case "workshop":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "fundraiser":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "other":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

const getStatusColor = (status: Event["status"]) => {
  switch (status) {
    case "scheduled":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
    case "ongoing":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "completed":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    case "cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    case "postponed":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "draft":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

const getStatusIcon = (status: Event["status"]) => {
  switch (status) {
    case "scheduled":
      return <Clock className="h-4 w-4 text-blue-600" />;
    case "ongoing":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "completed":
      return <CheckCircle className="h-4 w-4 text-gray-600" />;
    case "cancelled":
      return <X className="h-4 w-4 text-red-600" />;
    case "postponed":
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case "draft":
      return <Edit className="h-4 w-4 text-orange-600" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-600" />;
  }
};

const getEventTypeIcon = (eventType: Event["eventType"]) => {
  switch (eventType) {
    case "rally":
      return <Mic className="h-4 w-4 text-red-600" />;
    case "meeting":
      return <Users className="h-4 w-4 text-blue-600" />;
    case "conference":
      return <Video className="h-4 w-4 text-purple-600" />;
    case "workshop":
      return <Edit className="h-4 w-4 text-green-600" />;
    case "fundraiser":
      return <DollarSign className="h-4 w-4 text-yellow-600" />;
    case "other":
      return <Calendar className="h-4 w-4 text-gray-600" />;
    default:
      return <Calendar className="h-4 w-4 text-gray-600" />;
  }
};

export const columns: ColumnDef<Event>[] = [
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
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3"
        >
          Event
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const event = row.original;
      return (
        <div className="space-y-1">
          <div className="font-medium max-w-[200px] truncate">
            {event.title}
          </div>
          <div className="text-sm text-muted-foreground">{event.id}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "eventType",
    header: "Type",
    cell: ({ row }) => {
      const eventType = row.getValue("eventType") as Event["eventType"];
      return (
        <div className="flex items-center space-x-2">
          {getEventTypeIcon(eventType)}
          <Badge className={getEventTypeColor(eventType)}>
            {eventType.charAt(0).toUpperCase() + eventType.slice(1)}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as Event["category"];
      return (
        <Badge variant="outline">
          {category.replace("_", " ").toUpperCase()}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "dateTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3"
        >
          Date & Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const event = row.original;
      const startDate = new Date(`${event.startDate}T${event.startTime}`);
      return (
        <div className="space-y-1">
          <div className="flex items-center space-x-1 text-sm">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <span>{startDate.toLocaleDateString()}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {event.startTime} - {event.endTime}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const event = row.original;
      return (
        <div className="space-y-1">
          <div className="flex items-center space-x-1 text-sm">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <span className="max-w-[150px] truncate">{event.venue}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {event.district}, {event.region}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "attendance",
    header: "Attendance",
    cell: ({ row }) => {
      const event = row.original;
      const attendanceRate =
        (event.registeredAttendees / event.maxAttendees) * 100;
      return (
        <div className="space-y-1">
          <div className="text-sm font-medium">
            {event.registeredAttendees}/{event.maxAttendees}
          </div>
          <div className="text-sm text-muted-foreground">
            {attendanceRate.toFixed(1)}% registered
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
      const status = row.getValue("status") as Event["status"];
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
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => {
      const budget = row.getValue("budget") as number | undefined;
      return budget ? (
        <div className="text-sm font-medium">${budget.toLocaleString()}</div>
      ) : (
        <span className="text-muted-foreground">Not set</span>
      );
    },
  },
  {
    accessorKey: "media",
    header: "Media",
    cell: ({ row }) => {
      const event = row.original;
      const mediaFeatures = [
        event.mediaCoverage && "Coverage",
        event.liveStreaming && "Live",
        event.recordingAllowed && "Recording",
        event.socialMediaPromotion && "Social",
        event.pressRelease && "Press",
      ].filter((feature): feature is string => Boolean(feature));

      return (
        <div className="flex flex-wrap gap-1">
          {mediaFeatures.slice(0, 2).map((feature) => (
            <Badge key={feature} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
          {mediaFeatures.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{mediaFeatures.length - 2}
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "organizer",
    header: "Organizer",
    cell: ({ row }) => {
      const event = row.original;
      return (
        <div className="space-y-1">
          <div className="text-sm font-medium">{event.organizerName}</div>
          <div className="text-sm text-muted-foreground">
            {event.organizerPhone}
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const event = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Event Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(event.id)}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy event ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View full details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit event
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ExternalLink className="mr-2 h-4 w-4" />
              View event page
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share className="mr-2 h-4 w-4" />
              Share event
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4" />
              Manage attendees
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DollarSign className="mr-2 h-4 w-4" />
              View budget
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Archive className="mr-2 h-4 w-4" />
              Archive event
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete event
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface EventsDataTableProps {
  data?: Event[];
}

export function EventsDataTable({ data = mockEvents }: EventsDataTableProps) {
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [typeFilter, setTypeFilter] = React.useState<string>("all");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");

  const filteredData = React.useMemo(() => {
    return data.filter((event) => {
      const statusMatch =
        statusFilter === "all" || event.status === statusFilter;
      const typeMatch = typeFilter === "all" || event.eventType === typeFilter;
      const categoryMatch =
        categoryFilter === "all" || event.category === categoryFilter;

      return statusMatch && typeMatch && categoryMatch;
    });
  }, [data, statusFilter, typeFilter, categoryFilter]);

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on ${selectedRows.length} events`);
    // Implement bulk actions here
  };

  const getUniqueTypes = () => {
    return Array.from(new Set(data.map((e) => e.eventType))).sort();
  };

  const getUniqueCategories = () => {
    return Array.from(new Set(data.map((e) => e.category))).sort();
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
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="postponed">Postponed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type-filter">Event Type</Label>
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
              <Label htmlFor="category-filter">Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {getUniqueCategories().map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.replace("_", " ").toUpperCase()}
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
                    setTypeFilter("all");
                    setCategoryFilter("all");
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
                  {selectedRows.length} event(s) selected
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
                      onClick={() => handleBulkAction("publish")}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Publish Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleBulkAction("cancel")}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleBulkAction("postpone")}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      Postpone Selected
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleBulkAction("export")}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Export Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAction("share")}>
                      <Share className="mr-2 h-4 w-4" />
                      Share Selected
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
      <div className="w-full">
        <DataTable columns={columns} data={filteredData} />
      </div>
    </div>
  );
}
