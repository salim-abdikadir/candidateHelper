"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
  MapPin,
  Bus,
  Route,
  Clock,
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  RefreshCw,
  Navigation,
  Calendar,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle,
  X,
  Save,
} from "lucide-react";

interface BusRoute {
  id: string;
  name: string;
  startLocation: string;
  endLocation: string;
  waypoints: string[];
  distance: number; // in km
  estimatedDuration: number; // in minutes
  frequency: string; // e.g., "Every 30 minutes"
  operatingHours: {
    start: string;
    end: string;
  };
  status: "active" | "inactive" | "maintenance";
  capacity: number;
  currentPassengers: number;
  driver: {
    name: string;
    phone: string;
    license: string;
  };
  vehicle: {
    id: string;
    plateNumber: string;
    type: string;
    capacity: number;
  };
  lastUpdated: string;
  createdAt: string;
}

const mockRoutes: BusRoute[] = [
  {
    id: "BR001",
    name: "Hargeisa Central - Berbera",
    startLocation: "Hargeisa Central Station",
    endLocation: "Berbera Port",
    waypoints: ["Hargeisa Airport", "Gabiley", "Sheikh"],
    distance: 120,
    estimatedDuration: 90,
    frequency: "Every 45 minutes",
    operatingHours: { start: "06:00", end: "20:00" },
    status: "active",
    capacity: 50,
    currentPassengers: 32,
    driver: {
      name: "Ahmed Hassan",
      phone: "+252 61 234 5678",
      license: "DL123456",
    },
    vehicle: {
      id: "VH001",
      plateNumber: "SL-1234",
      type: "Bus",
      capacity: 50,
    },
    lastUpdated: "2024-01-20",
    createdAt: "2024-01-15",
  },
  {
    id: "BR002",
    name: "Hargeisa - Burao",
    startLocation: "Hargeisa Central Station",
    endLocation: "Burao Bus Station",
    waypoints: ["Gabiley", "Sheikh", "Oodweyne"],
    distance: 150,
    estimatedDuration: 120,
    frequency: "Every 2 hours",
    operatingHours: { start: "07:00", end: "18:00" },
    status: "active",
    capacity: 40,
    currentPassengers: 25,
    driver: {
      name: "Fatima Ali",
      phone: "+252 61 234 5679",
      license: "DL123457",
    },
    vehicle: {
      id: "VH002",
      plateNumber: "SL-5678",
      type: "Bus",
      capacity: 40,
    },
    lastUpdated: "2024-01-19",
    createdAt: "2024-01-10",
  },
  {
    id: "BR003",
    name: "Hargeisa - Borama",
    startLocation: "Hargeisa Central Station",
    endLocation: "Borama Terminal",
    waypoints: ["Gabiley", "Sheikh", "Dilla"],
    distance: 180,
    estimatedDuration: 150,
    frequency: "Every 3 hours",
    operatingHours: { start: "08:00", end: "17:00" },
    status: "maintenance",
    capacity: 35,
    currentPassengers: 0,
    driver: {
      name: "Omar Mohamed",
      phone: "+252 61 234 5680",
      license: "DL123458",
    },
    vehicle: {
      id: "VH003",
      plateNumber: "SL-9012",
      type: "Bus",
      capacity: 35,
    },
    lastUpdated: "2024-01-18",
    createdAt: "2024-01-05",
  },
];

const getStatusColor = (status: BusRoute["status"]) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "inactive":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    case "maintenance":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

const getStatusIcon = (status: BusRoute["status"]) => {
  switch (status) {
    case "active":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "inactive":
      return <X className="h-4 w-4 text-gray-600" />;
    case "maintenance":
      return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-600" />;
  }
};

export default function BusRoutesPage() {
  const [routes, setRoutes] = useState<BusRoute[]>(mockRoutes);
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");

  const filteredRoutes = routes.filter((route) => {
    const matchesSearch =
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.startLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.endLocation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || route.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleCreateRoute = (
    newRoute: Omit<BusRoute, "id" | "createdAt" | "lastUpdated">
  ) => {
    const route: BusRoute = {
      ...newRoute,
      id: `BR${String(routes.length + 1).padStart(3, "0")}`,
      createdAt: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
    };
    setRoutes((prev) => [...prev, route]);
    setIsCreateDialogOpen(false);
  };

  const handleUpdateRoute = (updatedRoute: BusRoute) => {
    setRoutes((prev) =>
      prev.map((route) =>
        route.id === updatedRoute.id
          ? {
              ...updatedRoute,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : route
      )
    );
    setIsEditDialogOpen(false);
    setSelectedRoute(null);
  };

  const handleDeleteRoute = (routeId: string) => {
    setRoutes((prev) => prev.filter((route) => route.id !== routeId));
  };

  const getRouteStats = () => {
    const total = routes.length;
    const active = routes.filter((route) => route.status === "active").length;
    const maintenance = routes.filter(
      (route) => route.status === "maintenance"
    ).length;
    const totalCapacity = routes.reduce(
      (sum, route) => sum + route.capacity,
      0
    );
    const totalPassengers = routes.reduce(
      (sum, route) => sum + route.currentPassengers,
      0
    );

    return { total, active, maintenance, totalCapacity, totalPassengers };
  };

  const stats = getRouteStats();

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground">
          Bus Routes Management
        </h2>
        <p className="text-muted-foreground">
          Manage bus routes, schedules, and transportation logistics
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="create">Create Route</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-5">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center space-x-2">
                  <Route className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Total Routes</span>
                </div>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Active</span>
                </div>
                <div className="text-2xl font-bold">{stats.active}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium">Maintenance</span>
                </div>
                <div className="text-2xl font-bold">{stats.maintenance}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center space-x-2">
                  <Bus className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">Total Capacity</span>
                </div>
                <div className="text-2xl font-bold">{stats.totalCapacity}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium">Passengers</span>
                </div>
                <div className="text-2xl font-bold">
                  {stats.totalPassengers}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Route Coverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {routes.slice(0, 5).map((route) => (
                    <div
                      key={route.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{route.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {route.distance}km • {route.estimatedDuration}min
                        </p>
                      </div>
                      <Badge className={getStatusColor(route.status)}>
                        {route.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Route BR001 Updated</p>
                      <p className="text-xs text-muted-foreground">
                        Schedule adjusted for peak hours
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      2 hours ago
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Route BR003 Maintenance
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Vehicle inspection scheduled
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      1 day ago
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">New Route Added</p>
                      <p className="text-xs text-muted-foreground">
                        Hargeisa - Las Anod route
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

        {/* Routes Tab */}
        <TabsContent value="routes" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search routes..."
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
                      <SelectItem value="maintenance">Maintenance</SelectItem>
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
                      }}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                    <Dialog
                      open={isCreateDialogOpen}
                      onOpenChange={setIsCreateDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Route
                        </Button>
                      </DialogTrigger>
                      <CreateRouteDialog onSave={handleCreateRoute} />
                    </Dialog>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Routes Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Route className="h-5 w-5" />
                Routes ({filteredRoutes.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Route</TableHead>
                      <TableHead>Distance</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRoutes.map((route) => (
                      <TableRow key={route.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{route.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {route.startLocation} → {route.endLocation}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{route.distance}km</TableCell>
                        <TableCell>{route.estimatedDuration}min</TableCell>
                        <TableCell>{route.frequency}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(route.status)}
                            <Badge className={getStatusColor(route.status)}>
                              {route.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {route.currentPassengers}/{route.capacity}
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{
                                  width: `${
                                    (route.currentPassengers / route.capacity) *
                                    100
                                  }%`,
                                }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {route.driver.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {route.driver.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedRoute(route);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteRoute(route.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Create Route Tab */}
        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Route
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CreateRouteForm onSave={handleCreateRoute} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Route Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routes.map((route) => (
                  <div key={route.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{route.name}</h3>
                      <Badge className={getStatusColor(route.status)}>
                        {route.status}
                      </Badge>
                    </div>
                    <div className="grid gap-2 md:grid-cols-3 text-sm text-muted-foreground">
                      <div>
                        Operating: {route.operatingHours.start} -{" "}
                        {route.operatingHours.end}
                      </div>
                      <div>Frequency: {route.frequency}</div>
                      <div>Duration: {route.estimatedDuration} minutes</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Route Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Route</DialogTitle>
            <DialogDescription>
              Update route information and settings
            </DialogDescription>
          </DialogHeader>
          {selectedRoute && (
            <EditRouteForm
              route={selectedRoute}
              onSave={handleUpdateRoute}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setSelectedRoute(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Create Route Form Component
function CreateRouteForm({
  onSave,
}: {
  onSave: (route: Omit<BusRoute, "id" | "createdAt" | "lastUpdated">) => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    startLocation: "",
    endLocation: "",
    waypoints: [] as string[],
    distance: 0,
    estimatedDuration: 0,
    frequency: "",
    operatingHours: { start: "", end: "" },
    status: "active" as const,
    capacity: 0,
    currentPassengers: 0,
    driver: { name: "", phone: "", license: "" },
    vehicle: { id: "", plateNumber: "", type: "", capacity: 0 },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      name: "",
      startLocation: "",
      endLocation: "",
      waypoints: [],
      distance: 0,
      estimatedDuration: 0,
      frequency: "",
      operatingHours: { start: "", end: "" },
      status: "active",
      capacity: 0,
      currentPassengers: 0,
      driver: { name: "", phone: "", license: "" },
      vehicle: { id: "", plateNumber: "", type: "", capacity: 0 },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Route Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="frequency">Frequency</Label>
          <Input
            id="frequency"
            value={formData.frequency}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, frequency: e.target.value }))
            }
            placeholder="e.g., Every 30 minutes"
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="startLocation">Start Location</Label>
          <Input
            id="startLocation"
            value={formData.startLocation}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                startLocation: e.target.value,
              }))
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endLocation">End Location</Label>
          <Input
            id="endLocation"
            value={formData.endLocation}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, endLocation: e.target.value }))
            }
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="distance">Distance (km)</Label>
          <Input
            id="distance"
            type="number"
            value={formData.distance}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                distance: Number(e.target.value),
              }))
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            id="duration"
            type="number"
            value={formData.estimatedDuration}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                estimatedDuration: Number(e.target.value),
              }))
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                capacity: Number(e.target.value),
              }))
            }
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="startTime">Start Time</Label>
          <Input
            id="startTime"
            type="time"
            value={formData.operatingHours.start}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                operatingHours: {
                  ...prev.operatingHours,
                  start: e.target.value,
                },
              }))
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endTime">End Time</Label>
          <Input
            id="endTime"
            type="time"
            value={formData.operatingHours.end}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                operatingHours: { ...prev.operatingHours, end: e.target.value },
              }))
            }
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="driverName">Driver Name</Label>
          <Input
            id="driverName"
            value={formData.driver.name}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                driver: { ...prev.driver, name: e.target.value },
              }))
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="driverPhone">Driver Phone</Label>
          <Input
            id="driverPhone"
            value={formData.driver.phone}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                driver: { ...prev.driver, phone: e.target.value },
              }))
            }
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="plateNumber">Vehicle Plate Number</Label>
          <Input
            id="plateNumber"
            value={formData.vehicle.plateNumber}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                vehicle: { ...prev.vehicle, plateNumber: e.target.value },
              }))
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vehicleType">Vehicle Type</Label>
          <Select
            value={formData.vehicle.type}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                vehicle: { ...prev.vehicle, type: value },
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select vehicle type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bus">Bus</SelectItem>
              <SelectItem value="Minibus">Minibus</SelectItem>
              <SelectItem value="Van">Van</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Create Route
      </Button>
    </form>
  );
}

// Create Route Dialog Component
function CreateRouteDialog({
  onSave,
}: {
  onSave: (route: Omit<BusRoute, "id" | "createdAt" | "lastUpdated">) => void;
}) {
  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Create New Route</DialogTitle>
        <DialogDescription>
          Add a new bus route to the transportation system
        </DialogDescription>
      </DialogHeader>
      <CreateRouteForm onSave={onSave} />
    </DialogContent>
  );
}

// Edit Route Form Component
function EditRouteForm({
  route,
  onSave,
  onCancel,
}: {
  route: BusRoute;
  onSave: (route: BusRoute) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState(route);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Route Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="frequency">Frequency</Label>
          <Input
            id="frequency"
            value={formData.frequency}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, frequency: e.target.value }))
            }
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="startLocation">Start Location</Label>
          <Input
            id="startLocation"
            value={formData.startLocation}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                startLocation: e.target.value,
              }))
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endLocation">End Location</Label>
          <Input
            id="endLocation"
            value={formData.endLocation}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, endLocation: e.target.value }))
            }
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="distance">Distance (km)</Label>
          <Input
            id="distance"
            type="number"
            value={formData.distance}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                distance: Number(e.target.value),
              }))
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            id="duration"
            type="number"
            value={formData.estimatedDuration}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                estimatedDuration: Number(e.target.value),
              }))
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                capacity: Number(e.target.value),
              }))
            }
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="startTime">Start Time</Label>
          <Input
            id="startTime"
            type="time"
            value={formData.operatingHours.start}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                operatingHours: {
                  ...prev.operatingHours,
                  start: e.target.value,
                },
              }))
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endTime">End Time</Label>
          <Input
            id="endTime"
            type="time"
            value={formData.operatingHours.end}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                operatingHours: { ...prev.operatingHours, end: e.target.value },
              }))
            }
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="driverName">Driver Name</Label>
          <Input
            id="driverName"
            value={formData.driver.name}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                driver: { ...prev.driver, name: e.target.value },
              }))
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="driverPhone">Driver Phone</Label>
          <Input
            id="driverPhone"
            value={formData.driver.phone}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                driver: { ...prev.driver, phone: e.target.value },
              }))
            }
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="plateNumber">Vehicle Plate Number</Label>
          <Input
            id="plateNumber"
            value={formData.vehicle.plateNumber}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                vehicle: { ...prev.vehicle, plateNumber: e.target.value },
              }))
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                status: value as BusRoute["status"],
              }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </DialogFooter>
    </form>
  );
}
