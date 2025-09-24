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
  CheckCircle,
  Calendar,
  Camera,
  Upload,
  FileText,
  Shield,
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

const voterRegistrationSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  middleName: z.string().optional(),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
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
  pollingStation: z.string().min(1, "Polling station is required"),

  // ID Information
  idType: z
    .enum(["national_id", "passport", "drivers_license", "voter_card"])
    .refine((val) => val !== undefined, {
      message: "Please select an ID type",
    }),
  idNumber: z.string().min(5, "ID number must be at least 5 characters"),
  idExpiryDate: z.string().optional(),

  // Voter Information
  isFirstTimeVoter: z.boolean().optional(),
  previousVotingDistrict: z.string().optional(),
  specialNeeds: z.string().optional(),
  languagePreference: z
    .enum(["somali", "arabic", "english"])
    .refine((val) => val !== undefined, {
      message: "Please select a language preference",
    }),

  // Emergency Contact
  emergencyContact: z.string().min(2, "Emergency contact name is required"),
  emergencyPhone: z.string().min(10, "Emergency contact phone is required"),
  emergencyRelation: z
    .string()
    .min(2, "Emergency contact relation is required"),

  // Verification
  isVerified: z.boolean().optional(),
  verificationNotes: z.string().optional(),
  registeredBy: z.string().min(2, "Registrar name is required"),
  registrationDate: z.string().min(1, "Registration date is required"),

  // Terms and Conditions
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  agreeToDataProcessing: z.boolean().refine((val) => val === true, {
    message: "You must agree to data processing",
  }),
});

type VoterRegistrationFormData = z.infer<typeof voterRegistrationSchema>;

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

const pollingStations = [
  "Hargeisa Central School",
  "Hargeisa North Primary",
  "Hargeisa South Secondary",
  "Berbera High School",
  "Burao Community Center",
  "Borama Technical School",
  "Las Anod Primary School",
  "Erigavo Secondary School",
  "Ceerigaabo High School",
  "Caynabo Elementary",
  "Laasqoray Primary",
  "Oodweyne Secondary",
  "Sheikh Community Center",
  "Zeila High School",
];

const idTypes = [
  { value: "national_id", label: "National ID" },
  { value: "passport", label: "Passport" },
  { value: "drivers_license", label: "Driver's License" },
  { value: "voter_card", label: "Voter Card" },
];

interface VoterRegistrationFormProps {
  onSuccess?: () => void;
}

export function VoterRegistrationForm({
  onSuccess,
}: VoterRegistrationFormProps = {}) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const form = useForm<VoterRegistrationFormData>({
    resolver: zodResolver(voterRegistrationSchema),
    defaultValues: {
      isFirstTimeVoter: false,
      isVerified: false,
      agreeToTerms: false,
      agreeToDataProcessing: false,
      registrationDate: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = async (data: VoterRegistrationFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Voter registration data:", data);
      setIsSuccess(true);
      onSuccess?.();
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
                Voter Registration Successful!
              </h3>
              <p className="text-muted-foreground mt-2">
                The voter has been successfully registered and will receive a
                confirmation message.
              </p>
            </div>
            <Button
              onClick={() => {
                setIsSuccess(false);
                form.reset();
              }}
              className="mt-4"
            >
              Register Another Voter
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
          <User className="h-6 w-6 text-primary" />
          Voter Registration
        </CardTitle>
        <p className="text-muted-foreground">
          Register voters for the upcoming elections with comprehensive
          verification
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
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  {...form.register("middleName")}
                  placeholder="Enter middle name (optional)"
                />
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
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder="your.email@example.com"
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

              <div className="space-y-2">
                <Label htmlFor="pollingStation">Polling Station *</Label>
                <Select
                  onValueChange={(value) =>
                    form.setValue("pollingStation", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select polling station" />
                  </SelectTrigger>
                  <SelectContent>
                    {pollingStations.map((station) => (
                      <SelectItem key={station} value={station}>
                        {station}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.pollingStation && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.pollingStation.message}
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

          {/* ID Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <IdCard className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Identification</h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="idType">ID Type *</Label>
                <Select
                  onValueChange={(value) =>
                    form.setValue("idType", value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    {idTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.idType && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.idType.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="idNumber">ID Number *</Label>
                <Input
                  id="idNumber"
                  {...form.register("idNumber")}
                  placeholder="Enter ID number"
                />
                {form.formState.errors.idNumber && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.idNumber.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="idExpiryDate">ID Expiry Date</Label>
                <Input
                  id="idExpiryDate"
                  type="date"
                  {...form.register("idExpiryDate")}
                />
              </div>
            </div>
          </div>

          {/* Voter Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Voter Information</h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="languagePreference">
                  Language Preference *
                </Label>
                <Select
                  onValueChange={(value) =>
                    form.setValue("languagePreference", value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="somali">Somali</SelectItem>
                    <SelectItem value="arabic">Arabic</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.languagePreference && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.languagePreference.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="previousVotingDistrict">
                  Previous Voting District
                </Label>
                <Input
                  id="previousVotingDistrict"
                  {...form.register("previousVotingDistrict")}
                  placeholder="Enter previous district (if any)"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="specialNeeds">
                  Special Needs or Accessibility Requirements
                </Label>
                <Textarea
                  id="specialNeeds"
                  {...form.register("specialNeeds")}
                  placeholder="Any special needs or accessibility requirements"
                  rows={2}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isFirstTimeVoter"
                  checked={form.watch("isFirstTimeVoter")}
                  onCheckedChange={(checked) =>
                    form.setValue("isFirstTimeVoter", checked as boolean)
                  }
                />
                <Label htmlFor="isFirstTimeVoter">First-time voter</Label>
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

              <div className="space-y-2">
                <Label htmlFor="emergencyRelation">Relationship *</Label>
                <Input
                  id="emergencyRelation"
                  {...form.register("emergencyRelation")}
                  placeholder="e.g., Spouse, Parent, Sibling"
                />
                {form.formState.errors.emergencyRelation && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.emergencyRelation.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Verification Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Verification</h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="registeredBy">Registered By *</Label>
                <Input
                  id="registeredBy"
                  {...form.register("registeredBy")}
                  placeholder="Registrar name"
                />
                {form.formState.errors.registeredBy && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.registeredBy.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="registrationDate">Registration Date *</Label>
                <Input
                  id="registrationDate"
                  type="date"
                  {...form.register("registrationDate")}
                />
                {form.formState.errors.registrationDate && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.registrationDate.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="verificationNotes">Verification Notes</Label>
                <Textarea
                  id="verificationNotes"
                  {...form.register("verificationNotes")}
                  placeholder="Any additional verification notes"
                  rows={2}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isVerified"
                  checked={form.watch("isVerified")}
                  onCheckedChange={(checked) =>
                    form.setValue("isVerified", checked as boolean)
                  }
                />
                <Label htmlFor="isVerified">Voter verified and eligible</Label>
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
                    I agree to the voter registration terms and conditions *
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    By checking this box, you agree to our voter registration
                    terms and conditions.
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
                  id="agreeToDataProcessing"
                  checked={form.watch("agreeToDataProcessing")}
                  onCheckedChange={(checked) =>
                    form.setValue("agreeToDataProcessing", checked as boolean)
                  }
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="agreeToDataProcessing"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I consent to data processing *
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    I consent to the processing of my personal data for voter
                    registration purposes.
                  </p>
                </div>
              </div>
              {form.formState.errors.agreeToDataProcessing && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.agreeToDataProcessing.message}
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
                "Register Voter"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
