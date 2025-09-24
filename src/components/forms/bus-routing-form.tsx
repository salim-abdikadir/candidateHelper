"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Route,
  MapPin,
  Clock,
  Bus,
  Plus,
  Trash2,
  CheckCircle,
  Calendar,
  Navigation,
  Users,
  DollarSign,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const busRoutingSchema = z.object({
  // Route Information
  routeName: z.string().min(3, "Route name must be at least 3 characters"),
  routeCode: z.string().min(2, "Route code must be at least 2 characters"),
  startLocation: z.string().min(2, "Start location is required"),
  endLocation: z.string().min(2, "End location is required"),
  distance: z.number().min(0.1, "Distance must be greater than 0"),
  estimatedDuration: z.number().min(1, "Duration must be at least 1 minute"),

  // Schedule Information
  departureTime: z.string().min(1, "Departure time is required"),
  arrivalTime: z.string().min(1, "Arrival time is required"),
  frequency: z
    .enum(["hourly", "every_2_hours", "every_3_hours", "daily", "custom"])
    .refine((val) => val !== undefined, {
      message: "Please select frequency",
    }),
  operatingDays: z
    .array(z.string())
    .min(1, "At least one day must be selected"),

  // Stops Information
  stops: z
    .array(
      z.object({
        id: z.string(),
        name: z.string().min(1, "Stop name is required"),
        address: z.string().min(5, "Address must be at least 5 characters"),
        latitude: z.number().optional(),
        longitude: z.number().optional(),
        arrivalTime: z.string().optional(),
        departureTime: z.string().optional(),
        isPickupOnly: z.boolean().optional(),
        isDropoffOnly: z.boolean().optional(),
      })
    )
    .min(2, "At least 2 stops are required"),

  // Bus Assignment
  assignedBuses: z
    .array(z.string())
    .min(1, "At least one bus must be assigned"),
  maxBuses: z.number().min(1, "Maximum buses must be at least 1"),

  // Pricing and Capacity
  baseFare: z.number().min(0, "Base fare must be 0 or greater"),
  capacityPerBus: z.number().min(1, "Capacity must be at least 1"),
  isActive: z.boolean().optional(),

  // Additional Information
  description: z.string().optional(),
  notes: z.string().optional(),
});

type BusRoutingFormData = z.infer<typeof busRoutingSchema>;

const frequencyOptions = [
  { value: "hourly", label: "Every Hour" },
  { value: "every_2_hours", label: "Every 2 Hours" },
  { value: "every_3_hours", label: "Every 3 Hours" },
  { value: "daily", label: "Daily" },
  { value: "custom", label: "Custom Schedule" },
];

const daysOfWeek = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

const availableBuses = [
  { id: "bus-001", name: "BUS-001", type: "Standard", capacity: 50 },
  { id: "bus-002", name: "BUS-002", type: "Deluxe", capacity: 40 },
  { id: "bus-003", name: "BUS-003", type: "Minibus", capacity: 20 },
  { id: "bus-004", name: "BUS-004", type: "Coach", capacity: 60 },
  { id: "bus-005", name: "BUS-005", type: "Standard", capacity: 50 },
];

export function BusRoutingForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const form = useForm<BusRoutingFormData>({
    resolver: zodResolver(busRoutingSchema),
    defaultValues: {
      stops: [
        {
          id: "1",
          name: "",
          address: "",
          isPickupOnly: false,
          isDropoffOnly: false,
        },
        {
          id: "2",
          name: "",
          address: "",
          isPickupOnly: false,
          isDropoffOnly: false,
        },
      ],
      assignedBuses: [],
      operatingDays: [],
      isActive: true,
      baseFare: 0,
      capacityPerBus: 50,
      maxBuses: 1,
    },
  });

  const stops = form.watch("stops");
  const assignedBuses = form.watch("assignedBuses");
  const operatingDays = form.watch("operatingDays");

  const addStop = () => {
    const newStop = {
      id: Date.now().toString(),
      name: "",
      address: "",
      isPickupOnly: false,
      isDropoffOnly: false,
    };
    form.setValue("stops", [...stops, newStop]);
  };

  const removeStop = (stopId: string) => {
    if (stops.length > 2) {
      form.setValue(
        "stops",
        stops.filter((stop) => stop.id !== stopId)
      );
    }
  };

  const updateStop = (stopId: string, field: string, value: any) => {
    form.setValue(
      "stops",
      stops.map((stop) =>
        stop.id === stopId ? { ...stop, [field]: value } : stop
      )
    );
  };

  const toggleBusAssignment = (busId: string) => {
    const currentBuses = assignedBuses || [];
    if (currentBuses.includes(busId)) {
      form.setValue(
        "assignedBuses",
        currentBuses.filter((id) => id !== busId)
      );
    } else {
      form.setValue("assignedBuses", [...currentBuses, busId]);
    }
  };

  const toggleOperatingDay = (day: string) => {
    const currentDays = operatingDays || [];
    if (currentDays.includes(day)) {
      form.setValue(
        "operatingDays",
        currentDays.filter((d) => d !== day)
      );
    } else {
      form.setValue("operatingDays", [...currentDays, day]);
    }
  };

  const onSubmit = async (data: BusRoutingFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Route registration data:", data);
      setIsSuccess(true);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                Route Created Successfully!
              </h3>
              <p className="text-muted-foreground mt-2">
                The bus route has been successfully created and is ready for
                use.
              </p>
            </div>
            <Button
              onClick={() => {
                setIsSuccess(false);
                form.reset();
              }}
              className="mt-4"
            >
              Create Another Route
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Route className="h-6 w-6 text-primary" />
          Bus Route Management
        </CardTitle>
        <p className="text-muted-foreground">
          Create and manage bus routes for the campaign transport system
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Route Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Route className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Route Information</h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="routeName">Route Name *</Label>
                <Input
                  id="routeName"
                  {...form.register("routeName")}
                  placeholder="e.g., Hargeisa to Berbera Express"
                />
                {form.formState.errors.routeName && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.routeName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="routeCode">Route Code *</Label>
                <Input
                  id="routeCode"
                  {...form.register("routeCode")}
                  placeholder="e.g., HGB-001"
                />
                {form.formState.errors.routeCode && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.routeCode.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="startLocation">Start Location *</Label>
                <Input
                  id="startLocation"
                  {...form.register("startLocation")}
                  placeholder="Starting point"
                />
                {form.formState.errors.startLocation && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.startLocation.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endLocation">End Location *</Label>
                <Input
                  id="endLocation"
                  {...form.register("endLocation")}
                  placeholder="Destination"
                />
                {form.formState.errors.endLocation && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.endLocation.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="distance">Distance (km) *</Label>
                <Input
                  id="distance"
                  type="number"
                  step="0.1"
                  {...form.register("distance", { valueAsNumber: true })}
                  placeholder="Distance in kilometers"
                />
                {form.formState.errors.distance && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.distance.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedDuration">
                  Estimated Duration (minutes) *
                </Label>
                <Input
                  id="estimatedDuration"
                  type="number"
                  {...form.register("estimatedDuration", {
                    valueAsNumber: true,
                  })}
                  placeholder="Duration in minutes"
                />
                {form.formState.errors.estimatedDuration && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.estimatedDuration.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Schedule Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Schedule Information</h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="departureTime">Departure Time *</Label>
                <Input
                  id="departureTime"
                  type="time"
                  {...form.register("departureTime")}
                />
                {form.formState.errors.departureTime && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.departureTime.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="arrivalTime">Arrival Time *</Label>
                <Input
                  id="arrivalTime"
                  type="time"
                  {...form.register("arrivalTime")}
                />
                {form.formState.errors.arrivalTime && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.arrivalTime.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency *</Label>
                <Select
                  onValueChange={(value) =>
                    form.setValue("frequency", value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.frequency && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.frequency.message}
                  </p>
                )}
              </div>
            </div>

            {/* Operating Days */}
            <div className="space-y-2">
              <Label>Operating Days *</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {daysOfWeek.map((day) => (
                  <div key={day.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={day.value}
                      checked={operatingDays?.includes(day.value) || false}
                      onChange={() => toggleOperatingDay(day.value)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor={day.value} className="text-sm">
                      {day.label}
                    </Label>
                  </div>
                ))}
              </div>
              {form.formState.errors.operatingDays && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.operatingDays.message}
                </p>
              )}
            </div>
          </div>

          {/* Stops Information Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Route Stops</h3>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addStop}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Stop
              </Button>
            </div>
            <Separator />

            <div className="space-y-4">
              {stops.map((stop, index) => (
                <Card key={stop.id} className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Stop {index + 1}</h4>
                    {stops.length > 2 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeStop(stop.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Stop Name *</Label>
                      <Input
                        value={stop.name}
                        onChange={(e) =>
                          updateStop(stop.id, "name", e.target.value)
                        }
                        placeholder="Stop name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Address *</Label>
                      <Input
                        value={stop.address}
                        onChange={(e) =>
                          updateStop(stop.id, "address", e.target.value)
                        }
                        placeholder="Full address"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Arrival Time</Label>
                      <Input
                        type="time"
                        value={stop.arrivalTime || ""}
                        onChange={(e) =>
                          updateStop(stop.id, "arrivalTime", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Departure Time</Label>
                      <Input
                        type="time"
                        value={stop.departureTime || ""}
                        onChange={(e) =>
                          updateStop(stop.id, "departureTime", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`pickup-${stop.id}`}
                          checked={stop.isPickupOnly || false}
                          onChange={(e) =>
                            updateStop(
                              stop.id,
                              "isPickupOnly",
                              e.target.checked
                            )
                          }
                        />
                        <Label
                          htmlFor={`pickup-${stop.id}`}
                          className="text-sm"
                        >
                          Pickup Only
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`dropoff-${stop.id}`}
                          checked={stop.isDropoffOnly || false}
                          onChange={(e) =>
                            updateStop(
                              stop.id,
                              "isDropoffOnly",
                              e.target.checked
                            )
                          }
                        />
                        <Label
                          htmlFor={`dropoff-${stop.id}`}
                          className="text-sm"
                        >
                          Drop-off Only
                        </Label>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            {form.formState.errors.stops && (
              <p className="text-sm text-destructive">
                {form.formState.errors.stops.message}
              </p>
            )}
          </div>

          {/* Bus Assignment Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Bus className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Bus Assignment</h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="maxBuses">Maximum Buses *</Label>
                <Input
                  id="maxBuses"
                  type="number"
                  {...form.register("maxBuses", { valueAsNumber: true })}
                  placeholder="Maximum number of buses"
                />
                {form.formState.errors.maxBuses && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.maxBuses.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacityPerBus">Capacity Per Bus *</Label>
                <Input
                  id="capacityPerBus"
                  type="number"
                  {...form.register("capacityPerBus", { valueAsNumber: true })}
                  placeholder="Seats per bus"
                />
                {form.formState.errors.capacityPerBus && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.capacityPerBus.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Assign Buses *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {availableBuses.map((bus) => (
                  <div
                    key={bus.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      assignedBuses?.includes(bus.id)
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => toggleBusAssignment(bus.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{bus.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {bus.type} - {bus.capacity} seats
                        </p>
                      </div>
                      <div className="flex items-center">
                        {assignedBuses?.includes(bus.id) && (
                          <CheckCircle className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {form.formState.errors.assignedBuses && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.assignedBuses.message}
                </p>
              )}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Pricing</h3>
            </div>
            <Separator />

            <div className="space-y-2">
              <Label htmlFor="baseFare">Base Fare (USD) *</Label>
              <Input
                id="baseFare"
                type="number"
                step="0.01"
                {...form.register("baseFare", { valueAsNumber: true })}
                placeholder="0.00"
              />
              {form.formState.errors.baseFare && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.baseFare.message}
                </p>
              )}
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Information</h3>
            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Route Description</Label>
                <Textarea
                  id="description"
                  {...form.register("description")}
                  placeholder="Describe the route and its purpose"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  {...form.register("notes")}
                  placeholder="Additional notes or special instructions"
                  rows={2}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={form.watch("isActive") || false}
                  onChange={(e) => form.setValue("isActive", e.target.checked)}
                />
                <Label htmlFor="isActive">Route is active</Label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={isSubmitting}
            >
              Reset Form
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[140px]"
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Creating Route...
                </>
              ) : (
                "Create Route"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}




