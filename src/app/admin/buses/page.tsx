"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Bus,
  Plus,
  Filter,
  MapPin,
  Users,
  Calendar,
  Edit,
  Trash2,
  Eye,
  Route,
} from "lucide-react";
import { BusDashboard } from "@/components/bus/bus-dashboard";
import { BusRegistrationForm } from "@/components/forms/bus-registration-form";
import { BusRoutingForm } from "@/components/forms/bus-routing-form";
import {
  mockBuses,
  mockRoutes,
  mockDrivers,
  mockSchedules,
  getBusStatusColor,
  getDriverStatusColor,
  getMaintenanceStatus,
  getMaintenanceStatusColor,
  formatDuration,
  formatDistance,
  getDayName,
} from "@/lib/bus";

export default function BusesPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddBusOpen, setIsAddBusOpen] = useState(false);
  const [isAddRouteOpen, setIsAddRouteOpen] = useState(false);

  const filteredBuses = mockBuses.filter((bus) => {
    const matchesSearch =
      bus.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || bus.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredRoutes = mockRoutes.filter((route) => {
    return (
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const filteredDrivers = mockDrivers.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || driver.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 bg-gradient-primary/5 p-6 rounded-lg">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bus Management</h1>
          <p className="text-muted-foreground">
            Manage your fleet of buses, routes, and schedules
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Dialog open={isAddBusOpen} onOpenChange={setIsAddBusOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Bus
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Register New Bus</DialogTitle>
              </DialogHeader>
              <BusRegistrationForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="buses">Buses</TabsTrigger>
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="schedules">Schedules</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <BusDashboard />
        </TabsContent>

        <TabsContent value="buses" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search buses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Buses List */}
          <Card>
            <CardHeader>
              <CardTitle>
                Fleet Overview ({filteredBuses.length} buses)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredBuses.map((bus) => {
                  const maintenanceStatus = getMaintenanceStatus(bus);
                  const driver = mockDrivers.find((d) => d.id === bus.driverId);
                  const route = mockRoutes.find((r) => r.id === bus.routeId);

                  return (
                    <div
                      key={bus.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <Bus className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{bus.plateNumber}</p>
                          <p className="text-sm text-muted-foreground">
                            {bus.model} • {bus.capacity} seats
                          </p>
                          {driver && (
                            <p className="text-sm text-muted-foreground">
                              Driver: {driver.name}
                            </p>
                          )}
                          {route && (
                            <p className="text-sm text-muted-foreground">
                              Route: {route.name}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <Badge className={getBusStatusColor(bus.status)}>
                            {bus.status}
                          </Badge>
                          <div className="mt-1">
                            <Badge
                              variant="outline"
                              className={getMaintenanceStatusColor(
                                maintenanceStatus
                              )}
                            >
                              {maintenanceStatus}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  Route Management ({filteredRoutes.length} routes)
                </CardTitle>
                <Dialog open={isAddRouteOpen} onOpenChange={setIsAddRouteOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Route className="h-4 w-4 mr-2" />
                      Create Route
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New Route</DialogTitle>
                    </DialogHeader>
                    <BusRoutingForm />
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredRoutes.map((route) => (
                  <div
                    key={route.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <MapPin className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{route.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {route.description}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDistance(route.distance)} •{" "}
                          {formatDuration(route.estimatedDuration)} •{" "}
                          {route.stops.length} stops
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {route.startLocation} → {route.endLocation}
                        </p>
                      </div>
                      <Badge
                        className={
                          route.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {route.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                Driver Management ({filteredDrivers.length} drivers)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredDrivers.map((driver) => (
                  <div
                    key={driver.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <Users className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{driver.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {driver.licenseNumber} • {driver.phone}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {driver.experience} years experience • Rating:{" "}
                          {driver.rating}/5
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{driver.email}</p>
                      </div>
                      <Badge className={getDriverStatusColor(driver.status)}>
                        {driver.status}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                Schedule Management ({mockSchedules.length} schedules)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSchedules.map((schedule) => {
                  const bus = mockBuses.find((b) => b.id === schedule.busId);
                  const route = mockRoutes.find(
                    (r) => r.id === schedule.routeId
                  );
                  const driver = mockDrivers.find(
                    (d) => d.id === schedule.driverId
                  );

                  return (
                    <div
                      key={schedule.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <Calendar className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="font-medium">
                            {bus?.plateNumber} - {route?.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {driver?.name} • {getDayName(schedule.dayOfWeek)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {schedule.departureTime} - {schedule.arrivalTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge
                          className={
                            schedule.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {schedule.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
