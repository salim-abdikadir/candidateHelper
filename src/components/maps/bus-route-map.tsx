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

interface BusRouteMapProps {
  className?: string;
}

export function BusRouteMap({ className }: BusRouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [showPollingStations, setShowPollingStations] = useState(true);
  const [showBuses, setShowBuses] = useState(true);
  const [mapInstance, setMapInstance] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current && !mapInstance) {
      // Dynamically import Leaflet to avoid SSR issues
      import("leaflet").then((L) => {
        // Initialize the map
        const map = L.default.map(mapRef.current!).setView([9.5616, 44.065], 8);

        // Add tile layer
        L.default
          .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
          })
          .addTo(map);

        // Add polling stations
        if (showPollingStations) {
          pollingStations.forEach((station) => {
            const marker = L.default
              .marker([station.lat, station.lng])
              .addTo(map).bindPopup(`
                <div class="p-2">
                  <h3 class="font-bold text-sm">${station.name}</h3>
                  <p class="text-xs text-gray-600">Voters: ${station.voters.toLocaleString()}</p>
                </div>
              `);

            marker.setIcon(
              L.default.divIcon({
                className: "custom-div-icon",
                html: `<div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">PS</div>`,
                iconSize: [32, 32],
                iconAnchor: [16, 16],
              })
            );
          });
        }

        // Add routes
        mockRoutes.forEach((route) => {
          const routeCoordinates: [number, number][] = route.stops.map(
            (stop) => [stop.lat, stop.lng]
          );

          const polyline = L.default
            .polyline(routeCoordinates, {
              color: route.color,
              weight: 4,
              opacity: 0.7,
            })
            .addTo(map);

          // Add route markers
          route.stops.forEach((stop, index) => {
            const isStart = stop.type === "start";
            const isEnd = stop.type === "end";
            const isIntermediate = stop.type === "intermediate";

            let iconClass = "bg-gray-500";
            let iconText = "•";

            if (isStart) {
              iconClass = "bg-green-500";
              iconText = "S";
            } else if (isEnd) {
              iconClass = "bg-red-500";
              iconText = "E";
            } else if (isIntermediate) {
              iconClass = "bg-yellow-500";
              iconText = index.toString();
            }

            const marker = L.default.marker([stop.lat, stop.lng]).addTo(map)
              .bindPopup(`
                <div class="p-2">
                  <h3 class="font-bold text-sm">${stop.name}</h3>
                  <p class="text-xs text-gray-600">${route.name}</p>
                  ${
                    isStart &&
                    "<p class='text-xs text-green-600'>Start Point</p>"
                  }
                  ${isEnd && "<p class='text-xs text-red-600'>End Point</p>"}
                  ${
                    isIntermediate &&
                    "<p class='text-xs text-yellow-600'>Stop " + index + "</p>"
                  }
                </div>
              `);

            marker.setIcon(
              L.default.divIcon({
                className: "custom-div-icon",
                html: `<div class="${iconClass} text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">${iconText}</div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12],
              })
            );
          });

          // Add bus markers
          if (showBuses) {
            route.buses.forEach((bus) => {
              const statusColor =
                bus.status === "active"
                  ? "bg-green-500"
                  : bus.status === "maintenance"
                  ? "bg-yellow-500"
                  : "bg-red-500";

              const marker = L.default.marker([bus.lat, bus.lng]).addTo(map)
                .bindPopup(`
                  <div class="p-2">
                    <h3 class="font-bold text-sm">${bus.name}</h3>
                    <p class="text-xs text-gray-600">${route.name}</p>
                    <p class="text-xs ${
                      bus.status === "active"
                        ? "text-green-600"
                        : bus.status === "maintenance"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }">Status: ${bus.status}</p>
                  </div>
                `);

              marker.setIcon(
                L.default.divIcon({
                  className: "custom-div-icon",
                  html: `<div class="${statusColor} text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">🚌</div>`,
                  iconSize: [32, 32],
                  iconAnchor: [16, 16],
                })
              );
            });
          }
        });

        setMapInstance(map);
      });
    }

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [showPollingStations, showBuses]);

  const handleRouteSelect = (routeId: string) => {
    setSelectedRoute(routeId);
    // You can add logic here to highlight the selected route
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

          {/* Map Container */}
          <div
            ref={mapRef}
            className="w-full h-96 rounded-lg border"
            style={{ minHeight: "400px" }}
          />
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
