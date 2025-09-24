"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  DollarSign,
  FileText,
  Image,
  Video,
  Mic,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const eventManagementSchema = z.object({
  // Basic Event Information
  title: z.string().min(5, "Event title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  eventType: z.enum(
    ["rally", "meeting", "conference", "workshop", "fundraiser", "other"],
    {
      message: "Please select an event type",
    }
  ),
  category: z.enum(["public", "private", "invitation_only", "media_event"], {
    message: "Please select a category",
  }),

  // Date and Time
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  timezone: z.string().min(1, "Timezone is required"),

  // Location Information
  venue: z.string().min(3, "Venue name is required"),
  address: z.string().min(10, "Full address is required"),
  city: z.string().min(2, "City is required"),
  district: z.string().min(1, "District is required"),
  region: z.string().min(1, "Region is required"),
  coordinates: z.string().optional(),

  // Capacity and Attendance
  maxAttendees: z.number().min(1, "Maximum attendees must be at least 1"),
  expectedAttendees: z.number().min(1, "Expected attendees must be at least 1"),
  registrationRequired: z.boolean().optional(),
  registrationDeadline: z.string().optional(),

  // Budget and Resources
  budget: z.number().min(0, "Budget cannot be negative").optional(),
  estimatedCost: z
    .number()
    .min(0, "Estimated cost cannot be negative")
    .optional(),
  resources: z.array(z.string()).optional(),
  equipment: z.array(z.string()).optional(),

  // Media and Marketing
  mediaCoverage: z.boolean().optional(),
  liveStreaming: z.boolean().optional(),
  recordingAllowed: z.boolean().optional(),
  socialMediaPromotion: z.boolean().optional(),
  pressRelease: z.boolean().optional(),

  // Security and Safety
  securityRequired: z.boolean().optional(),
  securityLevel: z.enum(["low", "medium", "high", "maximum"]).optional(),
  emergencyPlan: z.string().optional(),
  medicalSupport: z.boolean().optional(),
  insurance: z.boolean().optional(),

  // Contact Information
  organizerName: z.string().min(2, "Organizer name is required"),
  organizerPhone: z.string().min(10, "Organizer phone is required"),
  organizerEmail: z.string().email("Valid email is required"),
  backupContact: z.string().optional(),
  backupPhone: z.string().optional(),

  // Additional Information
  specialInstructions: z.string().optional(),
  requirements: z.string().optional(),
  notes: z.string().optional(),
});

type EventManagementFormData = z.infer<typeof eventManagementSchema>;

const districts = [
  "Hargeisa Central",
  "Hargeisa North",
  "Hargeisa South",
  "Hargeisa East",
  "Hargeisa West",
  "Berbera",
  "Burao",
  "Borama",
  "Las Anod",
  "Erigavo",
  "Ceerigaabo",
  "Caynabo",
  "Laasqoray",
  "Oodweyne",
  "Sheikh",
  "Zeila",
];

const regions = [
  "Maroodi Jeex",
  "Sanaag",
  "Sool",
  "Togdheer",
  "Awdal",
  "Sahil",
];

const timezones = [
  "Africa/Mogadishu",
  "UTC",
  "Africa/Nairobi",
  "Europe/London",
  "America/New_York",
];

const resourceOptions = [
  "Sound System",
  "Microphones",
  "Projector",
  "Screen",
  "Lighting",
  "Chairs",
  "Tables",
  "Tent",
  "Generator",
  "Transportation",
  "Security",
  "Catering",
];

interface EventManagementFormProps {
  onSuccess?: () => void;
}

export function EventManagementForm({
  onSuccess,
}: EventManagementFormProps = {}) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [selectedResources, setSelectedResources] = React.useState<string[]>(
    []
  );

  const form = useForm<EventManagementFormData>({
    resolver: zodResolver(eventManagementSchema),
    defaultValues: {
      registrationRequired: false,
      mediaCoverage: false,
      liveStreaming: false,
      recordingAllowed: false,
      socialMediaPromotion: false,
      pressRelease: false,
      securityRequired: false,
      medicalSupport: false,
      insurance: false,
      resources: [],
      equipment: [],
    },
  });

  const onSubmit = async (data: EventManagementFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Event management data:", data);
      setIsSuccess(true);
      onSuccess?.();
    } catch (error) {
      console.error("Event creation error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResourceToggle = (resource: string) => {
    const current = form.getValues("resources") || [];
    if (current.includes(resource)) {
      form.setValue(
        "resources",
        current.filter((r) => r !== resource)
      );
    } else {
      form.setValue("resources", [...current, resource]);
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
                Event Created Successfully!
              </h3>
              <p className="text-muted-foreground mt-2">
                The event has been created and is now visible in the events
                calendar.
              </p>
            </div>
            <Button
              onClick={() => {
                setIsSuccess(false);
                form.reset();
              }}
              className="mt-4"
            >
              Create Another Event
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-6 w-6 text-primary" />
          Event Management
        </CardTitle>
        <p className="text-muted-foreground">
          Create and manage campaign events with comprehensive details
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Event Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Basic Information</h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  {...form.register("title")}
                  placeholder="Enter event title"
                />
                {form.formState.errors.title && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventType">Event Type *</Label>
                <Select
                  onValueChange={(value) =>
                    form.setValue("eventType", value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rally">Rally</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="fundraiser">Fundraiser</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.eventType && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.eventType.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  onValueChange={(value) =>
                    form.setValue("category", value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public Event</SelectItem>
                    <SelectItem value="private">Private Event</SelectItem>
                    <SelectItem value="invitation_only">
                      Invitation Only
                    </SelectItem>
                    <SelectItem value="media_event">Media Event</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.category && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.category.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone *</Label>
                <Select
                  onValueChange={(value) => form.setValue("timezone", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem key={tz} value={tz}>
                        {tz}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.timezone && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.timezone.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  {...form.register("description")}
                  placeholder="Enter detailed event description"
                  rows={4}
                />
                {form.formState.errors.description && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Date and Time */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Date & Time</h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  {...form.register("startDate")}
                />
                {form.formState.errors.startDate && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.startDate.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date *</Label>
                <Input id="endDate" type="date" {...form.register("endDate")} />
                {form.formState.errors.endDate && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.endDate.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time *</Label>
                <Input
                  id="startTime"
                  type="time"
                  {...form.register("startTime")}
                />
                {form.formState.errors.startTime && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.startTime.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">End Time *</Label>
                <Input id="endTime" type="time" {...form.register("endTime")} />
                {form.formState.errors.endTime && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.endTime.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Location Information</h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="venue">Venue Name *</Label>
                <Input
                  id="venue"
                  {...form.register("venue")}
                  placeholder="Enter venue name"
                />
                {form.formState.errors.venue && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.venue.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  {...form.register("city")}
                  placeholder="Enter city"
                />
                {form.formState.errors.city && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.city.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="district">District *</Label>
                <Select
                  onValueChange={(value) => form.setValue("district", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.district && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.district.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Region *</Label>
                <Select
                  onValueChange={(value) => form.setValue("region", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.region && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.region.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Full Address *</Label>
                <Textarea
                  id="address"
                  {...form.register("address")}
                  placeholder="Enter complete address"
                  rows={2}
                />
                {form.formState.errors.address && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.address.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="coordinates">Coordinates (Optional)</Label>
                <Input
                  id="coordinates"
                  {...form.register("coordinates")}
                  placeholder="Latitude, Longitude"
                />
              </div>
            </div>
          </div>

          {/* Capacity and Attendance */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Capacity & Attendance</h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="maxAttendees">Maximum Attendees *</Label>
                <Input
                  id="maxAttendees"
                  type="number"
                  {...form.register("maxAttendees", { valueAsNumber: true })}
                  placeholder="Enter maximum capacity"
                />
                {form.formState.errors.maxAttendees && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.maxAttendees.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedAttendees">Expected Attendees *</Label>
                <Input
                  id="expectedAttendees"
                  type="number"
                  {...form.register("expectedAttendees", {
                    valueAsNumber: true,
                  })}
                  placeholder="Enter expected attendance"
                />
                {form.formState.errors.expectedAttendees && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.expectedAttendees.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="registrationRequired"
                    checked={form.watch("registrationRequired")}
                    onCheckedChange={(checked) =>
                      form.setValue("registrationRequired", checked)
                    }
                  />
                  <Label htmlFor="registrationRequired">
                    Registration Required
                  </Label>
                </div>
              </div>

              {form.watch("registrationRequired") && (
                <div className="space-y-2">
                  <Label htmlFor="registrationDeadline">
                    Registration Deadline
                  </Label>
                  <Input
                    id="registrationDeadline"
                    type="datetime-local"
                    {...form.register("registrationDeadline")}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Budget and Resources */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Budget & Resources</h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="budget">Budget (USD)</Label>
                <Input
                  id="budget"
                  type="number"
                  {...form.register("budget", { valueAsNumber: true })}
                  placeholder="Enter budget amount"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedCost">Estimated Cost (USD)</Label>
                <Input
                  id="estimatedCost"
                  type="number"
                  {...form.register("estimatedCost", { valueAsNumber: true })}
                  placeholder="Enter estimated cost"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Required Resources</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {resourceOptions.map((resource) => (
                    <div key={resource} className="flex items-center space-x-2">
                      <Checkbox
                        id={resource}
                        checked={
                          form.watch("resources")?.includes(resource) || false
                        }
                        onCheckedChange={() => handleResourceToggle(resource)}
                      />
                      <Label htmlFor={resource} className="text-sm">
                        {resource}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Media and Marketing */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Video className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Media & Marketing</h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="mediaCoverage"
                    checked={form.watch("mediaCoverage")}
                    onCheckedChange={(checked) =>
                      form.setValue("mediaCoverage", checked)
                    }
                  />
                  <Label htmlFor="mediaCoverage">Media Coverage Expected</Label>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="liveStreaming"
                    checked={form.watch("liveStreaming")}
                    onCheckedChange={(checked) =>
                      form.setValue("liveStreaming", checked)
                    }
                  />
                  <Label htmlFor="liveStreaming">Live Streaming</Label>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="recordingAllowed"
                    checked={form.watch("recordingAllowed")}
                    onCheckedChange={(checked) =>
                      form.setValue("recordingAllowed", checked)
                    }
                  />
                  <Label htmlFor="recordingAllowed">Recording Allowed</Label>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="socialMediaPromotion"
                    checked={form.watch("socialMediaPromotion")}
                    onCheckedChange={(checked) =>
                      form.setValue("socialMediaPromotion", checked)
                    }
                  />
                  <Label htmlFor="socialMediaPromotion">
                    Social Media Promotion
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="pressRelease"
                    checked={form.watch("pressRelease")}
                    onCheckedChange={(checked) =>
                      form.setValue("pressRelease", checked)
                    }
                  />
                  <Label htmlFor="pressRelease">Press Release</Label>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Contact Information</h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="organizerName">Organizer Name *</Label>
                <Input
                  id="organizerName"
                  {...form.register("organizerName")}
                  placeholder="Enter organizer name"
                />
                {form.formState.errors.organizerName && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.organizerName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizerPhone">Organizer Phone *</Label>
                <Input
                  id="organizerPhone"
                  {...form.register("organizerPhone")}
                  placeholder="+252 61 234 5678"
                />
                {form.formState.errors.organizerPhone && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.organizerPhone.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizerEmail">Organizer Email *</Label>
                <Input
                  id="organizerEmail"
                  type="email"
                  {...form.register("organizerEmail")}
                  placeholder="organizer@campaign.com"
                />
                {form.formState.errors.organizerEmail && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.organizerEmail.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="backupContact">Backup Contact (Optional)</Label>
                <Input
                  id="backupContact"
                  {...form.register("backupContact")}
                  placeholder="Enter backup contact name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="backupPhone">Backup Phone (Optional)</Label>
                <Input
                  id="backupPhone"
                  {...form.register("backupPhone")}
                  placeholder="+252 61 234 5678"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Information</h3>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="specialInstructions">
                  Special Instructions
                </Label>
                <Textarea
                  id="specialInstructions"
                  {...form.register("specialInstructions")}
                  placeholder="Any special instructions or requirements"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  {...form.register("requirements")}
                  placeholder="Specific requirements for the event"
                  rows={3}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  {...form.register("notes")}
                  placeholder="Additional notes or comments"
                  rows={3}
                />
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
                  Creating...
                </>
              ) : (
                "Create Event"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
