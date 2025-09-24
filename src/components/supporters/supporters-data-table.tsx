"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
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
import {
  Supporter,
  SupporterPhone,
  Region,
  District,
  PollingStation,
} from "@/types/supporter";

const mockSupporters: Supporter[] = [
  {
    id: 1,
    firstname: "Ahmed",
    middlename: "Hassan",
    lastname: "Ali",
    email: "ahmed.hassan@email.com",
    status: "approved",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-20T10:00:00Z",
    gender: "male",
    language: "somali",
    residency_address: "Hargeisa Central, Maroodi Jeex",
    voting_address: "Hargeisa Central, Maroodi Jeex",
    voter_id: "V001234567",
    fav_party: "Party A",
    phones: [
      {
        id: 1,
        supporter_id: 1,
        phone_number: "+252 61 234 5678",
        phone_type: "primary",
        is_verified: true,
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z",
      },
    ],
    emergency_contacts: [
      {
        id: 1,
        supporter_id: 1,
        name: "Hassan Ali",
        relationship: "Father",
        phone_number: "+252 61 234 5679",
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z",
      },
    ],
    region: {
      id: 1,
      name: "Maroodi Jeex",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    district: {
      id: 1,
      name: "Hargeisa Central",
      region_id: 1,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    pollingstation: {
      id: 1,
      name: "Hargeisa Central Primary School",
      district_id: 1,
      latitude: 9.5616,
      longitude: 44.065,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: 2,
    firstname: "Fatima",
    lastname: "Mohamed",
    email: "fatima.mohamed@email.com",
    status: "approved",
    created_at: "2024-01-18T10:00:00Z",
    updated_at: "2024-01-19T10:00:00Z",
    gender: "female",
    language: "somali",
    residency_address: "Hargeisa North, Maroodi Jeex",
    voting_address: "Hargeisa North, Maroodi Jeex",
    voter_id: "V001234568",
    fav_party: "Party B",
    phones: [
      {
        id: 2,
        supporter_id: 2,
        phone_number: "+252 61 345 6789",
        phone_type: "primary",
        is_verified: true,
        created_at: "2024-01-18T10:00:00Z",
        updated_at: "2024-01-18T10:00:00Z",
      },
    ],
    emergency_contacts: [
      {
        id: 2,
        supporter_id: 2,
        name: "Mohamed Ahmed",
        relationship: "Brother",
        phone_number: "+252 61 345 6790",
        created_at: "2024-01-18T10:00:00Z",
        updated_at: "2024-01-18T10:00:00Z",
      },
    ],
    region: {
      id: 1,
      name: "Maroodi Jeex",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    district: {
      id: 2,
      name: "Hargeisa North",
      region_id: 1,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    pollingstation: {
      id: 2,
      name: "Hargeisa North Secondary School",
      district_id: 2,
      latitude: 9.58,
      longitude: 44.08,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: 3,
    firstname: "Omar",
    lastname: "Abdullahi",
    email: "omar.abdullahi@email.com",
    status: "pending",
    created_at: "2024-01-20T10:00:00Z",
    updated_at: "2024-01-20T10:00:00Z",
    gender: "male",
    language: "english",
    residency_address: "Berbera, Sahil",
    voting_address: "Berbera, Sahil",
    voter_id: "V001234569",
    fav_party: "Party C",
    phones: [
      {
        id: 3,
        supporter_id: 3,
        phone_number: "+252 61 456 7890",
        phone_type: "primary",
        is_verified: false,
        created_at: "2024-01-20T10:00:00Z",
        updated_at: "2024-01-20T10:00:00Z",
      },
    ],
    emergency_contacts: [],
    region: {
      id: 2,
      name: "Sahil",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    district: {
      id: 3,
      name: "Berbera",
      region_id: 2,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    pollingstation: {
      id: 3,
      name: "Berbera Community Center",
      district_id: 3,
      latitude: 10.4356,
      longitude: 45.0164,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: 4,
    firstname: "Amina",
    lastname: "Said",
    email: "amina.said@email.com",
    status: "approved",
    created_at: "2024-01-12T10:00:00Z",
    updated_at: "2024-01-21T10:00:00Z",
    gender: "female",
    language: "arabic",
    residency_address: "Burao, Togdheer",
    voting_address: "Burao, Togdheer",
    voter_id: "V001234570",
    fav_party: "Party A",
    phones: [
      {
        id: 4,
        supporter_id: 4,
        phone_number: "+252 61 567 8901",
        phone_type: "primary",
        is_verified: true,
        created_at: "2024-01-12T10:00:00Z",
        updated_at: "2024-01-12T10:00:00Z",
      },
    ],
    emergency_contacts: [
      {
        id: 4,
        supporter_id: 4,
        name: "Said Mohamed",
        relationship: "Husband",
        phone_number: "+252 61 567 8902",
        created_at: "2024-01-12T10:00:00Z",
        updated_at: "2024-01-12T10:00:00Z",
      },
    ],
    region: {
      id: 3,
      name: "Togdheer",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    district: {
      id: 4,
      name: "Burao",
      region_id: 3,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    pollingstation: {
      id: 4,
      name: "Burao High School",
      district_id: 4,
      latitude: 9.5221,
      longitude: 45.5336,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: 5,
    firstname: "Hassan",
    lastname: "Ibrahim",
    email: "hassan.ibrahim@email.com",
    status: "rejected",
    created_at: "2024-01-05T10:00:00Z",
    updated_at: "2024-01-10T10:00:00Z",
    gender: "male",
    language: "somali",
    residency_address: "Borama, Awdal",
    voting_address: "Borama, Awdal",
    voter_id: "V001234571",
    fav_party: "Party B",
    phones: [
      {
        id: 5,
        supporter_id: 5,
        phone_number: "+252 61 678 9012",
        phone_type: "primary",
        is_verified: true,
        created_at: "2024-01-05T10:00:00Z",
        updated_at: "2024-01-05T10:00:00Z",
      },
    ],
    emergency_contacts: [],
    region: {
      id: 4,
      name: "Awdal",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    district: {
      id: 5,
      name: "Borama",
      region_id: 4,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    pollingstation: {
      id: 5,
      name: "Borama University",
      district_id: 5,
      latitude: 9.9342,
      longitude: 43.1805,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
];

const getStatusColor = (status: Supporter["status"]) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "rejected":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

const getInitials = (supporter: Supporter) => {
  const firstInitial = supporter.firstname?.[0] || "";
  const lastInitial = supporter.lastname?.[0] || "";
  return (firstInitial + lastInitial).toUpperCase();
};

const getStatusIcon = (status: Supporter["status"]) => {
  switch (status) {
    case "approved":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case "rejected":
      return <UserX className="h-4 w-4 text-red-600" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-600" />;
  }
};

const createColumns = (router: any): ColumnDef<Supporter>[] => [
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
    accessorKey: "firstname",
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
      const fullName = `${supporter.firstname} ${
        supporter.middlename ? supporter.middlename + " " : ""
      }${supporter.lastname}`;
      return (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={supporter.photo_verification || ""}
              alt={fullName}
            />
            <AvatarFallback className="text-xs">
              {getInitials(supporter)}
            </AvatarFallback>
          </Avatar>
          <div>
            <button
              onClick={() =>
                router.push(`/admin/supporters/${supporter.id}/view`)
              }
              className="font-medium text-foreground hover:text-primary transition-colors text-left"
            >
              {fullName}
            </button>
            <div className="text-sm text-muted-foreground">
              {supporter.fav_party || "No party preference"}
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
      const primaryPhone = supporter.phones?.find(
        (phone) => phone.phone_type === "primary"
      );
      return (
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-sm">
            <Mail className="h-3 w-3 text-muted-foreground" />
            <span className="text-foreground">
              {supporter.email || "No email"}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Phone className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">
              {primaryPhone?.phone_number || "No phone"}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "residency_location",
    header: "Residency Location",
    cell: ({ row }) => {
      const supporter = row.original;
      return (
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <span className="text-foreground">
              {supporter.district?.name || "No district"}
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            {supporter.region?.name || "No region"}
          </div>
          {supporter.residency_address && (
            <div className="text-xs text-muted-foreground">
              {supporter.residency_address}
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "voting_address",
    header: "Voting Address",
    cell: ({ row }) => {
      const supporter = row.original;
      return (
        <div className="space-y-1">
          <div className="text-sm text-foreground">
            {supporter.voting_address || "No voting address"}
          </div>
          {supporter.voter_id && (
            <div className="text-xs text-muted-foreground">
              ID: {supporter.voter_id.slice(0, 3)}***
              {supporter.voter_id.slice(-2)}
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "polling_station",
    header: "Polling Station",
    cell: ({ row }) => {
      const supporter = row.original;
      return (
        <div className="space-y-1">
          <div className="text-sm text-foreground">
            {supporter.pollingstation?.name || "No polling station"}
          </div>
          {supporter.pollingstation && (
            <div className="text-xs text-muted-foreground">
              {supporter.pollingstation.district?.name || "No district"}
            </div>
          )}
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
    accessorKey: "language",
    header: "Language",
    cell: ({ row }) => {
      const language = row.getValue("language") as string;
      return (
        <Badge variant="outline" className="text-xs">
          {language
            ? language.charAt(0).toUpperCase() + language.slice(1)
            : "Not specified"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const gender = row.getValue("gender") as string;
      return (
        <Badge variant="outline" className="text-xs">
          {gender
            ? gender.charAt(0).toUpperCase() + gender.slice(1)
            : "Not specified"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_at",
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
      const date = new Date(row.getValue("created_at"));
      return <div className="text-sm">{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "updated_at",
    header: "Last Updated",
    cell: ({ row }) => {
      const date = new Date(row.getValue("updated_at"));
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
              onClick={() =>
                navigator.clipboard.writeText(supporter.id.toString())
              }
            >
              <User className="mr-2 h-4 w-4" />
              Copy supporter ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                router.push(`/admin/supporters/${supporter.id}/view`)
              }
            >
              <Eye className="mr-2 h-4 w-4" />
              View full details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                router.push(`/admin/supporters/${supporter.id}/edit`)
              }
            >
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
              Approve supporter
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserX className="mr-2 h-4 w-4" />
              Reject supporter
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
  const router = useRouter();
  const columns = createColumns(router);
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [districtFilter, setDistrictFilter] = React.useState<string>("all");
  const [communicationFilter, setCommunicationFilter] =
    React.useState<string>("all");
  const [pollingStationFilter, setPollingStationFilter] =
    React.useState<string>("all");
  const [residencyFilter, setResidencyFilter] = React.useState<string>("all");
  const [showFilters, setShowFilters] = React.useState<boolean>(true);

  // Hierarchical filtering state
  const [filterMode, setFilterMode] = React.useState<"residency" | "polling">(
    "residency"
  );
  const [selectedRegion, setSelectedRegion] = React.useState<string>("all");
  const [selectedDistrict, setSelectedDistrict] = React.useState<string>("all");
  const [selectedAddress, setSelectedAddress] = React.useState<string>("all");
  const [selectedPollingStation, setSelectedPollingStation] =
    React.useState<string>("all");

  const filteredData = React.useMemo(() => {
    return data.filter((supporter) => {
      const statusMatch =
        statusFilter === "all" || supporter.status === statusFilter;
      const languageMatch =
        communicationFilter === "all" ||
        supporter.language === communicationFilter;

      // Hierarchical filtering based on mode
      let locationMatch = true;
      if (filterMode === "residency") {
        const regionMatch =
          selectedRegion === "all" || supporter.region?.name === selectedRegion;
        const districtMatch =
          selectedDistrict === "all" ||
          supporter.district?.name === selectedDistrict;
        const addressMatch =
          selectedAddress === "all" ||
          supporter.residency_address === selectedAddress;
        locationMatch = regionMatch && districtMatch && addressMatch;
      } else {
        const regionMatch =
          selectedRegion === "all" || supporter.region?.name === selectedRegion;
        const districtMatch =
          selectedDistrict === "all" ||
          supporter.pollingstation?.district?.name === selectedDistrict;
        const pollingMatch =
          selectedPollingStation === "all" ||
          supporter.pollingstation?.name === selectedPollingStation;
        locationMatch = regionMatch && districtMatch && pollingMatch;
      }

      return statusMatch && languageMatch && locationMatch;
    });
  }, [
    data,
    statusFilter,
    communicationFilter,
    filterMode,
    selectedRegion,
    selectedDistrict,
    selectedAddress,
    selectedPollingStation,
  ]);

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on ${selectedRows.length} supporters`);
    // Implement bulk actions here
  };

  const getUniqueDistricts = () => {
    return Array.from(
      new Set(
        data
          .map((s) => s.district?.name)
          .filter((name): name is string => Boolean(name))
      )
    ).sort();
  };

  const getUniqueLanguages = () => {
    return Array.from(
      new Set(
        data
          .map((s) => s.language)
          .filter((lang): lang is string => Boolean(lang))
      )
    ).sort();
  };

  const getUniquePollingStations = () => {
    return Array.from(
      new Set(
        data
          .map((s) => s.pollingstation?.name)
          .filter((name): name is string => Boolean(name))
      )
    ).sort();
  };

  const getUniqueResidencyLocations = () => {
    return Array.from(
      new Set(
        data
          .map((s) => s.district?.name)
          .filter((name): name is string => Boolean(name))
      )
    ).sort();
  };

  // Hierarchical filtering helper functions
  const getUniqueRegions = () => {
    return Array.from(
      new Set(
        data
          .map((s) => s.region?.name)
          .filter((name): name is string => Boolean(name))
      )
    ).sort();
  };

  const getDistrictsByRegion = (regionName: string) => {
    if (regionName === "all") return [];
    return Array.from(
      new Set(
        data
          .filter((s) => s.region?.name === regionName)
          .map((s) => s.district?.name)
          .filter((name): name is string => Boolean(name))
      )
    ).sort();
  };

  const getAddressesByDistrict = (districtName: string) => {
    if (districtName === "all") return [];
    return Array.from(
      new Set(
        data
          .filter((s) => s.district?.name === districtName)
          .map((s) => s.residency_address)
          .filter((address): address is string => Boolean(address))
      )
    ).sort();
  };

  const getPollingStationsByDistrict = (districtName: string) => {
    if (districtName === "all") return [];
    return Array.from(
      new Set(
        data
          .filter((s) => s.pollingstation?.district?.name === districtName)
          .map((s) => s.pollingstation?.name)
          .filter((name): name is string => Boolean(name))
      )
    ).sort();
  };

  const getActiveFilters = () => {
    const activeFilters = [];
    if (statusFilter !== "all")
      activeFilters.push({
        key: "status",
        value: statusFilter,
        label: "Status",
      });
    if (communicationFilter !== "all")
      activeFilters.push({
        key: "language",
        value: communicationFilter,
        label: "Language",
      });

    // Hierarchical filters
    if (selectedRegion !== "all")
      activeFilters.push({
        key: "region",
        value: selectedRegion,
        label: "Region",
      });
    if (selectedDistrict !== "all")
      activeFilters.push({
        key: "district",
        value: selectedDistrict,
        label: "District",
      });
    if (filterMode === "residency" && selectedAddress !== "all")
      activeFilters.push({
        key: "address",
        value: selectedAddress,
        label: "Address",
      });
    if (filterMode === "polling" && selectedPollingStation !== "all")
      activeFilters.push({
        key: "pollingStation",
        value: selectedPollingStation,
        label: "Polling Station",
      });

    return activeFilters;
  };

  const clearFilter = (filterKey: string) => {
    switch (filterKey) {
      case "status":
        setStatusFilter("all");
        break;
      case "language":
        setCommunicationFilter("all");
        break;
      case "region":
        setSelectedRegion("all");
        setSelectedDistrict("all");
        setSelectedAddress("all");
        setSelectedPollingStation("all");
        break;
      case "district":
        setSelectedDistrict("all");
        setSelectedAddress("all");
        setSelectedPollingStation("all");
        break;
      case "address":
        setSelectedAddress("all");
        break;
      case "pollingStation":
        setSelectedPollingStation("all");
        break;
    }
  };

  const clearAllFilters = () => {
    setStatusFilter("all");
    setCommunicationFilter("all");
    setSelectedRegion("all");
    setSelectedDistrict("all");
    setSelectedAddress("all");
    setSelectedPollingStation("all");
  };

  // Hierarchical filter handlers
  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    setSelectedDistrict("all");
    setSelectedAddress("all");
    setSelectedPollingStation("all");
  };

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    setSelectedAddress("all");
    setSelectedPollingStation("all");
  };

  const handleFilterModeChange = (mode: "residency" | "polling") => {
    setFilterMode(mode);
    setSelectedRegion("all");
    setSelectedDistrict("all");
    setSelectedAddress("all");
    setSelectedPollingStation("all");
  };

  return (
    <div className="w-full space-y-4">
      {/* Integrated Filter Section */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <CardContent className="p-6">
          {/* Filter Header with Results Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  Filters
                </h3>
              </div>
              <div className="hidden sm:block w-px h-6 bg-border" />
              <div className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">
                  {filteredData.length}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                  {data.length}
                </span>{" "}
                supporters
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Filter className="h-4 w-4 mr-2" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
              <Button variant="outline" size="sm" onClick={clearAllFilters}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear All
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Active Filters Display */}
          {getActiveFilters().length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-foreground">
                  Active Filters:
                </span>
                <Badge variant="secondary" className="text-xs">
                  {getActiveFilters().length}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {getActiveFilters().map((filter) => (
                  <Badge
                    key={filter.key}
                    variant="outline"
                    className="px-3 py-1 text-sm cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    onClick={() => clearFilter(filter.key)}
                  >
                    <span className="font-medium">{filter.label}:</span>{" "}
                    {filter.value}
                    <X className="h-3 w-3 ml-2" />
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Collapsible Filter Controls */}
          {showFilters && (
            <div className="space-y-6">
              {/* Filter Mode Toggle */}
              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-1 bg-muted p-1 rounded-lg">
                  <Button
                    variant={filterMode === "residency" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleFilterModeChange("residency")}
                    className="px-4"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Residency
                  </Button>
                  <Button
                    variant={filterMode === "polling" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleFilterModeChange("polling")}
                    className="px-4"
                  >
                    <UserCheck className="h-4 w-4 mr-2" />
                    Polling Station
                  </Button>
                </div>
              </div>

              {/* Basic Filters Row */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label
                    htmlFor="status-filter"
                    className="text-sm font-medium"
                  >
                    Status
                  </Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="language-filter"
                    className="text-sm font-medium"
                  >
                    Language
                  </Label>
                  <Select
                    value={communicationFilter}
                    onValueChange={setCommunicationFilter}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="All Languages" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Languages</SelectItem>
                      {getUniqueLanguages().map((language) => (
                        <SelectItem key={language} value={language}>
                          {language.charAt(0).toUpperCase() + language.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Hierarchical Location Filters */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <h4 className="text-sm font-medium text-foreground">
                    {filterMode === "residency"
                      ? "Residency Location"
                      : "Polling Station Location"}
                  </h4>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Region Filter */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="region-filter"
                      className="text-sm font-medium"
                    >
                      Region
                    </Label>
                    <Select
                      value={selectedRegion}
                      onValueChange={handleRegionChange}
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select Region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        {getUniqueRegions().map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* District Filter */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="district-filter"
                      className="text-sm font-medium"
                    >
                      District
                    </Label>
                    <Select
                      value={selectedDistrict}
                      onValueChange={handleDistrictChange}
                      disabled={selectedRegion === "all"}
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue
                          placeholder={
                            selectedRegion === "all"
                              ? "Select Region First"
                              : "Select District"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Districts</SelectItem>
                        {getDistrictsByRegion(selectedRegion).map(
                          (district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Address or Polling Station Filter */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="detail-filter"
                      className="text-sm font-medium"
                    >
                      {filterMode === "residency"
                        ? "Address"
                        : "Polling Station"}
                    </Label>
                    <Select
                      value={
                        filterMode === "residency"
                          ? selectedAddress
                          : selectedPollingStation
                      }
                      onValueChange={
                        filterMode === "residency"
                          ? setSelectedAddress
                          : setSelectedPollingStation
                      }
                      disabled={selectedDistrict === "all"}
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue
                          placeholder={
                            selectedDistrict === "all"
                              ? "Select District First"
                              : `Select ${
                                  filterMode === "residency"
                                    ? "Address"
                                    : "Polling Station"
                                }`
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">
                          All{" "}
                          {filterMode === "residency"
                            ? "Addresses"
                            : "Polling Stations"}
                        </SelectItem>
                        {(filterMode === "residency"
                          ? getAddressesByDistrict(selectedDistrict)
                          : getPollingStationsByDistrict(selectedDistrict)
                        ).map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )}
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
                      onClick={() => handleBulkAction("approve")}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleBulkAction("reject")}
                    >
                      <UserX className="mr-2 h-4 w-4" />
                      Reject Selected
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
