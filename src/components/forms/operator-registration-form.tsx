"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  User,
  Phone,
  Mail,
  MapPin,
  IdCard,
  Shield,
  CheckCircle,
  Building,
  Users,
  Calendar,
  Clock,
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

const operatorRegistrationSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters"),
  email: z.string().email("Please enter a valid email address"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z
    .enum(["male", "female", "other"])
    .refine((val) => val !== undefined, {
      message: "Please select a gender",
    }),

  // Address Information
  district: z.string().min(1, "District is required"),
  region: z.string().min(1, "Region is required"),
  address: z.string().min(10, "Address must be at least 10 characters"),

  // Professional Information
  employeeId: z.string().min(3, "Employee ID must be at least 3 characters"),
  position: z.enum(["field_operator", "supervisor", "coordinator", "manager"], {
    message: "Please select a position",
  }),
  department: z.enum(
    ["operations", "logistics", "communication", "finance", "security"],
    {
      message: "Please select a department",
    }
  ),
  startDate: z.string().min(1, "Start date is required"),
  salary: z.string().optional(),
  emergencyContact: z.string().min(2, "Emergency contact name is required"),
  emergencyPhone: z.string().min(10, "Emergency contact phone is required"),

  // Skills and Qualifications
  education: z.string().min(1, "Education level is required"),
  experience: z.string().min(1, "Years of experience is required"),
  languages: z.array(z.string()).min(1, "At least one language is required"),
  skills: z.string().optional(),
  certifications: z.string().optional(),

  // Work Preferences
  workSchedule: z.enum(["full_time", "part_time", "flexible"], {
    message: "Please select work schedule",
  }),
  preferredDistricts: z
    .array(z.string())
    .min(1, "At least one district is required"),
  vehicleAccess: z.boolean().optional(),
  driverLicense: z.boolean().optional(),
  vehicleType: z.string().optional(),

  // System Access
  systemAccess: z
    .array(z.string())
    .min(1, "At least one access level is required"),
  canManageSupporters: z.boolean().optional(),
  canManageFunds: z.boolean().optional(),
  canSendMessages: z.boolean().optional(),
  canViewReports: z.boolean().optional(),

  // Terms and Conditions
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  agreeToConfidentiality: z.boolean().refine((val) => val === true, {
    message: "You must agree to confidentiality agreement",
  }),
  agreeToBackgroundCheck: z.boolean().refine((val) => val === true, {
    message: "You must agree to background check",
  }),
});

type OperatorRegistrationFormData = z.infer<typeof operatorRegistrationSchema>;

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

const languages = ["Somali", "Arabic", "English", "French", "Italian"];

const systemAccessLevels = [
  "basic",
  "intermediate",
  "advanced",
  "administrator",
];

export function OperatorRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const form = useForm<OperatorRegistrationFormData>({
    resolver: zodResolver(operatorRegistrationSchema),
    defaultValues: {
      vehicleAccess: false,
      driverLicense: false,
      canManageSupporters: false,
      canManageFunds: false,
      canSendMessages: false,
      canViewReports: false,
      agreeToTerms: false,
      agreeToConfidentiality: false,
      agreeToBackgroundCheck: false,
      languages: [],
      preferredDistricts: [],
      systemAccess: [],
    },
  });

  const onSubmit = async (data: OperatorRegistrationFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Operator registration data:", data);
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
                Operator Registration Successful!
              </h3>
              <p className="text-muted-foreground mt-2">
                The operator has been registered and will receive login
                credentials shortly.
              </p>
            </div>
            <Button
              onClick={() => {
                setIsSuccess(false);
                form.reset();
              }}
              className="mt-4"
            >
              Register Another Operator
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
          <Shield className="h-6 w-6 text-primary" />
          Operator Registration
        </CardTitle>
        <p className="text-muted-foreground">
          Register a new campaign operator with appropriate access levels
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Personal Information</h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  {...form.register("firstName")}
                  placeholder="Enter first name"
                />
                {form.formState.errors.firstName && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  {...form.register("lastName")}
                  placeholder="Enter last name"
                />
                {form.formState.errors.lastName && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.lastName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phoneNumber"
                    {...form.register("phoneNumber")}
                    placeholder="+252 61 234 5678"
                    className="pl-10"
                  />
                </div>
                {form.formState.errors.phoneNumber && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.phoneNumber.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder="operator@campaign.com"
                    className="pl-10"
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  {...form.register("dateOfBirth")}
                />
                {form.formState.errors.dateOfBirth && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.dateOfBirth.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select
                  onValueChange={(value) =>
                    form.setValue("gender", value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.gender && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.gender.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Address Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Address Information</h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
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

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Full Address *</Label>
                <Textarea
                  id="address"
                  {...form.register("address")}
                  placeholder="Enter complete address"
                  rows={3}
                />
                {form.formState.errors.address && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.address.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">
                Professional Information
              </h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID *</Label>
                <Input
                  id="employeeId"
                  {...form.register("employeeId")}
                  placeholder="EMP001"
                />
                {form.formState.errors.employeeId && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.employeeId.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Select
                  onValueChange={(value) =>
                    form.setValue("position", value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="field_operator">
                      Field Operator
                    </SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="coordinator">Coordinator</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.position && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.position.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select
                  onValueChange={(value) =>
                    form.setValue("department", value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="logistics">Logistics</SelectItem>
                    <SelectItem value="communication">Communication</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.department && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.department.message}
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
                <Label htmlFor="salary">Salary (Optional)</Label>
                <Input
                  id="salary"
                  {...form.register("salary")}
                  placeholder="Enter salary amount"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="education">Education Level *</Label>
                <Select
                  onValueChange={(value) => form.setValue("education", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary School</SelectItem>
                    <SelectItem value="secondary">Secondary School</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="master">Master's Degree</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.education && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.education.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Emergency Contact Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Emergency Contact</h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">
                  Emergency Contact Name *
                </Label>
                <Input
                  id="emergencyContact"
                  {...form.register("emergencyContact")}
                  placeholder="Emergency contact person"
                />
                {form.formState.errors.emergencyContact && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.emergencyContact.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">
                  Emergency Contact Phone *
                </Label>
                <Input
                  id="emergencyPhone"
                  {...form.register("emergencyPhone")}
                  placeholder="+252 61 234 5678"
                />
                {form.formState.errors.emergencyPhone && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.emergencyPhone.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* System Access Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">
                System Access & Permissions
              </h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>System Access Level *</Label>
                <div className="space-y-2">
                  {systemAccessLevels.map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <Checkbox
                        id={level}
                        checked={
                          form.watch("systemAccess")?.includes(level) || false
                        }
                        onCheckedChange={(checked) => {
                          const current = form.getValues("systemAccess") || [];
                          if (checked) {
                            form.setValue("systemAccess", [...current, level]);
                          } else {
                            form.setValue(
                              "systemAccess",
                              current.filter((l) => l !== level)
                            );
                          }
                        }}
                      />
                      <Label htmlFor={level} className="capitalize">
                        {level}
                      </Label>
                    </div>
                  ))}
                </div>
                {form.formState.errors.systemAccess && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.systemAccess.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Specific Permissions</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="canManageSupporters"
                      checked={form.watch("canManageSupporters")}
                      onCheckedChange={(checked) =>
                        form.setValue("canManageSupporters", checked)
                      }
                    />
                    <Label htmlFor="canManageSupporters">
                      Manage Supporters
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="canManageFunds"
                      checked={form.watch("canManageFunds")}
                      onCheckedChange={(checked) =>
                        form.setValue("canManageFunds", checked)
                      }
                    />
                    <Label htmlFor="canManageFunds">Manage Funds</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="canSendMessages"
                      checked={form.watch("canSendMessages")}
                      onCheckedChange={(checked) =>
                        form.setValue("canSendMessages", checked)
                      }
                    />
                    <Label htmlFor="canSendMessages">Send Messages</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="canViewReports"
                      checked={form.watch("canViewReports")}
                      onCheckedChange={(checked) =>
                        form.setValue("canViewReports", checked)
                      }
                    />
                    <Label htmlFor="canViewReports">View Reports</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Terms and Conditions</h3>
            <Separator />

            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={form.watch("agreeToTerms")}
                  onCheckedChange={(checked) =>
                    form.setValue("agreeToTerms", checked as boolean)
                  }
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="agreeToTerms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the employment terms and conditions *
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    By checking this box, you agree to our employment terms and
                    conditions.
                  </p>
                </div>
              </div>
              {form.formState.errors.agreeToTerms && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.agreeToTerms.message}
                </p>
              )}

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToConfidentiality"
                  checked={form.watch("agreeToConfidentiality")}
                  onCheckedChange={(checked) =>
                    form.setValue("agreeToConfidentiality", checked as boolean)
                  }
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="agreeToConfidentiality"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to confidentiality agreement *
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    I understand the importance of maintaining confidentiality
                    regarding campaign information.
                  </p>
                </div>
              </div>
              {form.formState.errors.agreeToConfidentiality && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.agreeToConfidentiality.message}
                </p>
              )}

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToBackgroundCheck"
                  checked={form.watch("agreeToBackgroundCheck")}
                  onCheckedChange={(checked) =>
                    form.setValue("agreeToBackgroundCheck", checked as boolean)
                  }
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="agreeToBackgroundCheck"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I consent to background check *
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    I consent to background verification as part of the
                    employment process.
                  </p>
                </div>
              </div>
              {form.formState.errors.agreeToBackgroundCheck && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.agreeToBackgroundCheck.message}
                </p>
              )}
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
                  Registering...
                </>
              ) : (
                "Register Operator"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
