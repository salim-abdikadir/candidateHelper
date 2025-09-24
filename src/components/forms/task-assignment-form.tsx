"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ClipboardList,
  User,
  Calendar,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle,
  FileText,
  Phone,
  Mail,
  Target,
  Flag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const taskAssignmentSchema = z.object({
  // Task Information
  title: z.string().min(5, "Task title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.enum(
    [
      "voter_registration",
      "canvassing",
      "event_management",
      "transportation",
      "communication",
      "fundraising",
      "data_entry",
      "verification",
      "other",
    ],
    {
      message: "Please select a task category",
    }
  ),
  priority: z.enum(["low", "medium", "high", "urgent"], {
    message: "Please select a priority level",
  }),

  // Assignment Information
  assignedTo: z.string().min(1, "Please select an operator"),
  assignedBy: z.string().min(2, "Assigner name is required"),
  teamMembers: z.array(z.string()).optional(),

  // Location and Timing
  location: z.string().min(2, "Location is required"),
  district: z.string().min(1, "District is required"),
  region: z.string().min(1, "Region is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  estimatedDuration: z.number().min(1, "Duration must be at least 1 hour"),

  // Requirements and Resources
  requiredSkills: z.array(z.string()).optional(),
  requiredEquipment: z.array(z.string()).optional(),
  budget: z.number().min(0, "Budget cannot be negative").optional(),
  resources: z.string().optional(),

  // Instructions and Guidelines
  instructions: z
    .string()
    .min(10, "Instructions must be at least 10 characters"),
  guidelines: z.string().optional(),
  safetyNotes: z.string().optional(),
  specialRequirements: z.string().optional(),

  // Communication
  communicationMethod: z.enum(
    ["phone", "email", "whatsapp", "sms", "in_person"],
    {
      message: "Please select a communication method",
    }
  ),
  reportingFrequency: z.enum(["hourly", "daily", "weekly", "as_needed"], {
    message: "Please select reporting frequency",
  }),
  checkInRequired: z.boolean().optional(),

  // Status and Tracking
  status: z.enum(
    ["pending", "in_progress", "completed", "cancelled", "on_hold"],
    {
      message: "Please select a status",
    }
  ),
  progress: z.number().min(0).max(100).optional(),
  notes: z.string().optional(),
});

type TaskAssignmentFormData = z.infer<typeof taskAssignmentSchema>;

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

const operators = [
  {
    id: "1",
    name: "Ahmed Ali",
    phone: "+252 61 234 5678",
    district: "Hargeisa Central",
  },
  {
    id: "2",
    name: "Fatima Hassan",
    phone: "+252 61 234 5679",
    district: "Berbera",
  },
  {
    id: "3",
    name: "Omar Mohamed",
    phone: "+252 61 234 5680",
    district: "Burao",
  },
  {
    id: "4",
    name: "Khadija Ahmed",
    phone: "+252 61 234 5681",
    district: "Borama",
  },
  {
    id: "5",
    name: "Hassan Omar",
    phone: "+252 61 234 5682",
    district: "Las Anod",
  },
];

const taskCategories = [
  { value: "voter_registration", label: "Voter Registration", icon: "👥" },
  { value: "canvassing", label: "Canvassing", icon: "🚪" },
  { value: "event_management", label: "Event Management", icon: "📅" },
  { value: "transportation", label: "Transportation", icon: "🚌" },
  { value: "communication", label: "Communication", icon: "📢" },
  { value: "fundraising", label: "Fundraising", icon: "💰" },
  { value: "data_entry", label: "Data Entry", icon: "📊" },
  { value: "verification", label: "Verification", icon: "✅" },
  { value: "other", label: "Other", icon: "📋" },
];

const skills = [
  "Communication",
  "Leadership",
  "Data Entry",
  "Public Speaking",
  "Organization",
  "Problem Solving",
  "Teamwork",
  "Time Management",
  "Technical Skills",
  "Language Skills",
];

const equipment = [
  "Laptop",
  "Tablet",
  "Smartphone",
  "Camera",
  "GPS Device",
  "Vehicle",
  "Sound System",
  "Projector",
  "Printer",
  "Internet Connection",
];

interface TaskAssignmentFormProps {
  onSuccess?: () => void;
}

export function TaskAssignmentForm({
  onSuccess,
}: TaskAssignmentFormProps = {}) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [selectedSkills, setSelectedSkills] = React.useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = React.useState<string[]>(
    []
  );
  const [selectedTeamMembers, setSelectedTeamMembers] = React.useState<
    string[]
  >([]);

  const form = useForm<TaskAssignmentFormData>({
    resolver: zodResolver(taskAssignmentSchema),
    defaultValues: {
      priority: "medium",
      status: "pending",
      progress: 0,
      checkInRequired: true,
      reportingFrequency: "daily",
      communicationMethod: "phone",
      estimatedDuration: 8,
    },
  });

  const onSubmit = async (data: TaskAssignmentFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Task assignment data:", data);
      setIsSuccess(true);
      onSuccess?.();
    } catch (error) {
      console.error("Task assignment error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkillToggle = (skill: string) => {
    const current = selectedSkills;
    if (current.includes(skill)) {
      setSelectedSkills(current.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...current, skill]);
    }
  };

  const handleEquipmentToggle = (equipment: string) => {
    const current = selectedEquipment;
    if (current.includes(equipment)) {
      setSelectedEquipment(current.filter((e) => e !== equipment));
    } else {
      setSelectedEquipment([...current, equipment]);
    }
  };

  const handleTeamMemberToggle = (memberId: string) => {
    const current = selectedTeamMembers;
    if (current.includes(memberId)) {
      setSelectedTeamMembers(current.filter((id) => id !== memberId));
    } else {
      setSelectedTeamMembers([...current, memberId]);
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
                Task Assigned Successfully!
              </h3>
              <p className="text-muted-foreground mt-2">
                The task has been assigned and the operator will be notified.
              </p>
            </div>
            <Button
              onClick={() => {
                setIsSuccess(false);
                form.reset();
                setSelectedSkills([]);
                setSelectedEquipment([]);
                setSelectedTeamMembers([]);
              }}
              className="mt-4"
            >
              Assign Another Task
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-6 w-6 text-primary" />
          Task Assignment
        </CardTitle>
        <p className="text-muted-foreground">
          Assign tasks to operators with detailed instructions and requirements
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Task Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Task Information</h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title *</Label>
                <Input
                  id="title"
                  {...form.register("title")}
                  placeholder="Enter task title"
                />
                {form.formState.errors.title && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.title.message}
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
                    {taskCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex items-center gap-2">
                          <span>{category.icon}</span>
                          <span>{category.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.category && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.category.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority *</Label>
                <Select
                  onValueChange={(value) =>
                    form.setValue("priority", value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        Low
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        Medium
                      </div>
                    </SelectItem>
                    <SelectItem value="high">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        High
                      </div>
                    </SelectItem>
                    <SelectItem value="urgent">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        Urgent
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.priority && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.priority.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select
                  onValueChange={(value) =>
                    form.setValue("status", value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="on_hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.status && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.status.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  {...form.register("description")}
                  placeholder="Enter detailed task description"
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

          {/* Assignment Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Assignment Information</h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="assignedTo">Assign To *</Label>
                <Select
                  onValueChange={(value) => form.setValue("assignedTo", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select operator" />
                  </SelectTrigger>
                  <SelectContent>
                    {operators.map((operator) => (
                      <SelectItem key={operator.id} value={operator.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{operator.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {operator.district} • {operator.phone}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.assignedTo && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.assignedTo.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignedBy">Assigned By *</Label>
                <Input
                  id="assignedBy"
                  {...form.register("assignedBy")}
                  placeholder="Enter assigner name"
                />
                {form.formState.errors.assignedBy && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.assignedBy.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Team Members (Optional)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {operators.map((operator) => (
                    <div
                      key={operator.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`team-${operator.id}`}
                        checked={selectedTeamMembers.includes(operator.id)}
                        onCheckedChange={() =>
                          handleTeamMemberToggle(operator.id)
                        }
                      />
                      <Label
                        htmlFor={`team-${operator.id}`}
                        className="text-sm"
                      >
                        {operator.name} ({operator.district})
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Location and Timing Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Location & Timing</h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  {...form.register("location")}
                  placeholder="Enter specific location"
                />
                {form.formState.errors.location && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.location.message}
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

              <div className="space-y-2">
                <Label htmlFor="estimatedDuration">
                  Estimated Duration (hours) *
                </Label>
                <Input
                  id="estimatedDuration"
                  type="number"
                  {...form.register("estimatedDuration", {
                    valueAsNumber: true,
                  })}
                  placeholder="8"
                />
                {form.formState.errors.estimatedDuration && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.estimatedDuration.message}
                  </p>
                )}
              </div>

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

          {/* Requirements and Resources Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">
                Requirements & Resources
              </h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Required Skills</Label>
                <div className="grid grid-cols-2 gap-2">
                  {skills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={`skill-${skill}`}
                        checked={selectedSkills.includes(skill)}
                        onCheckedChange={() => handleSkillToggle(skill)}
                      />
                      <Label htmlFor={`skill-${skill}`} className="text-sm">
                        {skill}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Required Equipment</Label>
                <div className="grid grid-cols-2 gap-2">
                  {equipment.map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox
                        id={`equipment-${item}`}
                        checked={selectedEquipment.includes(item)}
                        onCheckedChange={() => handleEquipmentToggle(item)}
                      />
                      <Label htmlFor={`equipment-${item}`} className="text-sm">
                        {item}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget (USD)</Label>
                <Input
                  id="budget"
                  type="number"
                  step="0.01"
                  {...form.register("budget", { valueAsNumber: true })}
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resources">Additional Resources</Label>
                <Input
                  id="resources"
                  {...form.register("resources")}
                  placeholder="Enter additional resources needed"
                />
              </div>
            </div>
          </div>

          {/* Instructions and Guidelines Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Flag className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">
                Instructions & Guidelines
              </h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions *</Label>
                <Textarea
                  id="instructions"
                  {...form.register("instructions")}
                  placeholder="Enter detailed instructions"
                  rows={4}
                />
                {form.formState.errors.instructions && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.instructions.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="guidelines">Guidelines</Label>
                <Textarea
                  id="guidelines"
                  {...form.register("guidelines")}
                  placeholder="Enter guidelines and best practices"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="safetyNotes">Safety Notes</Label>
                <Textarea
                  id="safetyNotes"
                  {...form.register("safetyNotes")}
                  placeholder="Enter safety considerations"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialRequirements">
                  Special Requirements
                </Label>
                <Textarea
                  id="specialRequirements"
                  {...form.register("specialRequirements")}
                  placeholder="Enter any special requirements"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Communication Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Communication</h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="communicationMethod">
                  Communication Method *
                </Label>
                <Select
                  onValueChange={(value) =>
                    form.setValue("communicationMethod", value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">Phone Call</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="in_person">In Person</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.communicationMethod && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.communicationMethod.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="reportingFrequency">
                  Reporting Frequency *
                </Label>
                <Select
                  onValueChange={(value) =>
                    form.setValue("reportingFrequency", value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="as_needed">As Needed</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.reportingFrequency && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.reportingFrequency.message}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="checkInRequired"
                  checked={form.watch("checkInRequired")}
                  onCheckedChange={(checked) =>
                    form.setValue("checkInRequired", checked as boolean)
                  }
                />
                <Label htmlFor="checkInRequired">Check-in required</Label>
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Information</h3>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="progress">Progress (%)</Label>
                <Input
                  id="progress"
                  type="number"
                  min="0"
                  max="100"
                  {...form.register("progress", { valueAsNumber: true })}
                  placeholder="0"
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
              onClick={() => {
                form.reset();
                setSelectedSkills([]);
                setSelectedEquipment([]);
                setSelectedTeamMembers([]);
              }}
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
                  Assigning...
                </>
              ) : (
                "Assign Task"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
