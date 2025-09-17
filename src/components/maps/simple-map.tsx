"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Bus,
  Route,
  Navigation,
  Users,
  Clock,
  DollarSign,
  Filter,
  Layers,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

// Mock data for bus routes and locations
const mockRoutes = [
  {
    id: "route-1",
    name: "Hargeisa to Berbera",
    color: "#3b82f6",
    stops: [
      {
        id: "stop-1",
        name: "Hargeisa Central",
        lat: 9.5616,
        lng: 44.065,
        type: "start",
      },
      {
        id: "stop-2",
        name: "Hargeisa Airport",
        lat: 9.5181,
        lng: 44.0888,
        type: "intermediate",
      },
      {
        id: "stop-3",
        name: "Sheikh",
        lat: 9.3667,
        lng: 44.0667,
        type: "intermediate",
      },
      {
        id: "stop-4",
        name: "Berbera Port",
        lat: 10.4342,
        lng: 45.0144,
        type: "end",
      },
    ],
    buses: [
      {
        id: "bus-1",
        name: "BUS-001",
        status: "active",
        lat: 9.5616,
        lng: 44.065,
      },
      {
        id: "bus-2",
        name: "BUS-002",
        status: "active",
        lat: 9.5181,
        lng: 44.0888,
      },
    ],
    distance: 140,
    duration: 120,
    fare: 15,
  },
  {
    id: "route-2",
    name: "Hargeisa to Burao",
    color: "#10b981",
    stops: [
      {
        id: "stop-5",
        name: "Hargeisa Central",
        lat: 9.5616,
        lng: 44.065,
        type: "start",
      },
      {
        id: "stop-6",
        name: "Oodweyne",
        lat: 9.4167,
        lng: 44.4167,
        type: "intermediate",
      },
      {
        id: "stop-7",
        name: "Burao Central",
        lat: 9.5221,
        lng: 45.5336,
        type: "end",
      },
    ],
    buses: [
      {
        id: "bus-3",
        name: "BUS-003",
        status: "active",
        lat: 9.5221,
        lng: 45.5336,
      },
    ],
    distance: 110,
    duration: 90,
    fare: 12,
  },
  {
    id: "route-3",
    name: "Hargeisa to Las Anod",
    color: "#f59e0b",
    stops: [
      {
        id: "stop-8",
        name: "Hargeisa Central",
        lat: 9.5616,
        lng: 44.065,
        type: "start",
      },
      {
        id: "stop-9",
        name: "Caynabo",
        lat: 9.7,
        lng: 44.3,
        type: "intermediate",
      },
      {
        id: "stop-10",
        name: "Las Anod Central",
        lat: 8.4774,
        lng: 47.3597,
        type: "end",
      },
    ],
    buses: [
      {
        id: "bus-4",
        name: "BUS-004",
        status: "maintenance",
        lat: 8.4774,
        lng: 47.3597,
      },
    ],
    distance: 200,
    duration: 180,
    fare: 25,
  },
];

const pollingStations = [
  {
    id: "ps-1",
    name: "Hargeisa Central Polling Center",
    lat: 9.5616,
    lng: 44.065,
    voters: 2500,
  },
  {
    id: "ps-2",
    name: "Berbera Polling Center",
    lat: 10.4342,
    lng: 45.0144,
    voters: 1800,
  },
  {
    id: "ps-3",
    name: "Burao Polling Center",
    lat: 9.5221,
    lng: 45.5336,
    voters: 2200,
  },
  {
    id: "ps-4",
    name: "Las Anod Polling Center",
    lat: 8.4774,
    lng: 47.3597,
    voters: 1900,
  },
  {
    id: "ps-5",
    name: "Borama Polling Center",
    lat: 9.9333,
    lng: 43.1833,
    voters: 1600,
  },
];

interface SimpleMapProps {
  className?: string;
}

export function SimpleMap({ className }: SimpleMapProps) {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [showPollingStations, setShowPollingStations] = useState(true);
  const [showBuses, setShowBuses] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleRouteSelect = (routeId: string) => {
    setSelectedRoute(routeId);
  };

  const togglePollingStations = () => {
    setShowPollingStations(!showPollingStations);
  };

  const toggleBuses = () => {
    setShowBuses(!showBuses);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Map Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Bus Routes & Locations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              variant={showPollingStations ? "default" : "outline"}
              size="sm"
              onClick={togglePollingStations}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Polling Stations
            </Button>
            <Button
              variant={showBuses ? "default" : "outline"}
              size="sm"
              onClick={toggleBuses}
            >
              <Bus className="h-4 w-4 mr-2" />
              Live Buses
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter Routes
            </Button>
          </div>

          {/* Map Placeholder */}
          <div className="w-full h-96 rounded-lg border bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 flex items-center justify-center">
            {mapLoaded ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Interactive Map
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {showPollingStations && showBuses
                      ? "Showing polling stations and live buses"
                      : showPollingStations
                      ? "Showing polling stations"
                      : showBuses
                      ? "Showing live buses"
                      : "Map view ready"}
                  </p>
                </div>
                <div className="flex gap-2 justify-center">
                  <Button size="sm" variant="outline">
                    <ZoomIn className="h-4 w-4 mr-1" />
                    Zoom In
                  </Button>
                  <Button size="sm" variant="outline">
                    <ZoomOut className="h-4 w-4 mr-1" />
                    Zoom Out
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <div className="w-8 h-8 mx-auto border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">Loading map...</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Route Information */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockRoutes.map((route) => (
          <Card
            key={route.id}
            className={`cursor-pointer transition-all ${
              selectedRoute === route.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => handleRouteSelect(route.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">{route.name}</CardTitle>
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: route.color }}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Route className="h-4 w-4" />
                <span>{route.stops.length} stops</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Navigation className="h-4 w-4" />
                <span>{route.distance} km</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{route.duration} min</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span>${route.fare}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Bus className="h-4 w-4" />
                <span>{route.buses.length} buses</span>
              </div>
              <div className="flex gap-1">
                {route.buses.map((bus) => (
                  <Badge
                    key={bus.id}
                    variant={bus.status === "active" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {bus.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Route className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{mockRoutes.length}</p>
                <p className="text-sm text-muted-foreground">Active Routes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bus className="h-5 w-5 text-accent" />
              <div>
                <p className="text-2xl font-bold">
                  {mockRoutes.reduce(
                    (acc, route) => acc + route.buses.length,
                    0
                  )}
                </p>
                <p className="text-sm text-muted-foreground">Total Buses</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-warning" />
              <div>
                <p className="text-2xl font-bold">{pollingStations.length}</p>
                <p className="text-sm text-muted-foreground">
                  Polling Stations
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-2xl font-bold">
                  {pollingStations
                    .reduce((acc, station) => acc + station.voters, 0)
                    .toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Voters</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
