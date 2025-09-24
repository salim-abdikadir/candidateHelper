"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  User,
  Phone,
  MapPin,
  Shield,
  Building,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const registerSchema = z
  .object({
    // Personal Information
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phoneNumber: z
      .string()
      .min(10, "Phone number must be at least 10 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
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

    // Account Type
    userType: z.enum(["admin", "operator", "supporter"], {
      message: "Please select a user type",
    }),

    // Terms and Conditions
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
    agreeToPrivacy: z.boolean().refine((val) => val === true, {
      message: "You must agree to the privacy policy",
    }),
    receiveUpdates: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

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

interface AuthRegisterFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function AuthRegisterForm({
  onSuccess,
  onError,
}: AuthRegisterFormProps = {}) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userType: "supporter",
      receiveUpdates: true,
      agreeToTerms: false,
      agreeToPrivacy: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Registration data:", data);
      setIsSuccess(true);
      onSuccess?.();
    } catch (error) {
      const errorMessage = "Registration failed. Please try again.";
      onError?.(errorMessage);
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
                Registration Successful!
              </h3>
              <p className="text-muted-foreground mt-2">
                Your account has been created successfully. Please check your
                email for verification instructions.
              </p>
            </div>
            <Button
              onClick={() => {
                setIsSuccess(false);
                form.reset();
              }}
              className="mt-4"
            >
              Register Another Account
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <User className="h-6 w-6 text-primary" />
          Create Account
        </CardTitle>
        <p className="text-muted-foreground">
          Join the campaign and make a difference in Somaliland's future
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Account Type Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Account Type</h3>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  form.watch("userType") === "admin"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => form.setValue("userType", "admin")}
              >
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-primary" />
                  <div>
                    <h4 className="font-medium">Administrator</h4>
                    <p className="text-sm text-muted-foreground">
                      Full system access and management
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  form.watch("userType") === "operator"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => form.setValue("userType", "operator")}
              >
                <div className="flex items-center gap-3">
                  <Building className="h-6 w-6 text-primary" />
                  <div>
                    <h4 className="font-medium">Operator</h4>
                    <p className="text-sm text-muted-foreground">
                      Field operations and supporter management
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  form.watch("userType") === "supporter"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => form.setValue("userType", "supporter")}
              >
                <div className="flex items-center gap-3">
                  <User className="h-6 w-6 text-primary" />
                  <div>
                    <h4 className="font-medium">Supporter</h4>
                    <p className="text-sm text-muted-foreground">
                      Campaign participation and engagement
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {form.formState.errors.userType && (
              <p className="text-sm text-destructive">
                {form.formState.errors.userType.message}
              </p>
            )}
          </div>

          {/* Personal Information */}
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
                  placeholder="Enter your first name"
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
                  placeholder="Enter your last name"
                />
                {form.formState.errors.lastName && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.lastName.message}
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
                    <SelectValue placeholder="Select your gender" />
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

          {/* Address Information */}
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
                    <SelectValue placeholder="Select your region" />
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
                    <SelectValue placeholder="Select your district" />
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
                <Input
                  id="address"
                  {...form.register("address")}
                  placeholder="Enter your complete address"
                />
                {form.formState.errors.address && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.address.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Password Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Password</h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...form.register("password")}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    {...form.register("confirmPassword")}
                    placeholder="Confirm your password"
                    className="pl-10 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {form.formState.errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
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
                    I agree to the terms and conditions *
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    By checking this box, you agree to our terms of service and
                    privacy policy.
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
                  id="agreeToPrivacy"
                  checked={form.watch("agreeToPrivacy")}
                  onCheckedChange={(checked) =>
                    form.setValue("agreeToPrivacy", checked as boolean)
                  }
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="agreeToPrivacy"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the privacy policy *
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    I consent to the processing of my personal data for campaign
                    purposes.
                  </p>
                </div>
              </div>
              {form.formState.errors.agreeToPrivacy && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.agreeToPrivacy.message}
                </p>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="receiveUpdates"
                  checked={form.watch("receiveUpdates")}
                  onCheckedChange={(checked) =>
                    form.setValue("receiveUpdates", checked as boolean)
                  }
                />
                <Label
                  htmlFor="receiveUpdates"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Receive campaign updates and notifications
                </Label>
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
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
