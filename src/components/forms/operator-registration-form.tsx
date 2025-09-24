"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  operatorRegistrationSchema,
  OperatorRegistrationFormData,
} from "@/lib/validations/operator";

// Available actions for operator permissions
const availableActions = [
  "view_supporters",
  "manage_supporters",
  "view_events",
  "manage_events",
  "view_funds",
  "manage_funds",
  "send_messages",
  "view_reports",
  "manage_tasks",
  "view_operators",
  "manage_operators",
  "system_admin",
];

// Helper function to add phone number
const addPhoneNumber = (phones: any[], setValue: any) => {
  const newPhone = { phone_number: "", phone_type: "primary" as const };
  setValue("phones", [...phones, newPhone]);
};

// Helper function to remove phone number
const removePhoneNumber = (index: number, phones: any[], setValue: any) => {
  const updatedPhones = phones.filter((_, i) => i !== index);
  setValue("phones", updatedPhones);
};

// Helper function to add emergency contact
const addEmergencyContact = (contacts: any[], setValue: any) => {
  const newContact = {
    name: "",
    relationship: "",
    phone_number: "",
    email: "",
    address: "",
  };
  setValue("emergency_contacts", [...contacts, newContact]);
};

// Helper function to remove emergency contact
const removeEmergencyContact = (
  index: number,
  contacts: any[],
  setValue: any
) => {
  const updatedContacts = contacts.filter((_, i) => i !== index);
  setValue("emergency_contacts", updatedContacts);
};

export function OperatorRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const form = useForm<OperatorRegistrationFormData>({
    resolver: zodResolver(operatorRegistrationSchema),
    defaultValues: {
      firstname: "",
      middlename: "",
      lastname: "",
      fourthname: "",
      birthdate: "",
      gender: undefined,
      language: "",
      special_needs: "",
      email: "",
      address: "",
      phones: [{ phone_number: "", phone_type: "primary" }],
      emergency_contacts: [
        {
          name: "",
          relationship: "",
          phone_number: "",
          email: "",
          address: "",
        },
      ],
      latitude: undefined,
      longitude: undefined,
      role: "operator",
      status: "pending",
      allowed_actions: [],
      agree_to_terms: false,
      agree_to_confidentiality: false,
      agree_to_background_check: false,
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
                <Label htmlFor="firstname">First Name *</Label>
                <Input
                  id="firstname"
                  {...form.register("firstname")}
                  placeholder="Enter first name"
                />
                {form.formState.errors.firstname && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.firstname.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastname">Last Name *</Label>
                <Input
                  id="lastname"
                  {...form.register("lastname")}
                  placeholder="Enter last name"
                />
                {form.formState.errors.lastname && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.lastname.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="middlename">Middle Name</Label>
                <Input
                  id="middlename"
                  {...form.register("middlename")}
                  placeholder="Enter middle name (optional)"
                />
                {form.formState.errors.middlename && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.middlename.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="fourthname">Fourth Name</Label>
                <Input
                  id="fourthname"
                  {...form.register("fourthname")}
                  placeholder="Enter fourth name (optional)"
                />
                {form.formState.errors.fourthname && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.fourthname.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthdate">Date of Birth</Label>
                <Input
                  id="birthdate"
                  type="date"
                  {...form.register("birthdate")}
                />
                {form.formState.errors.birthdate && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.birthdate.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
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

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Input
                  id="language"
                  {...form.register("language")}
                  placeholder="Primary language"
                />
                {form.formState.errors.language && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.language.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="special_needs">Special Needs</Label>
                <Textarea
                  id="special_needs"
                  {...form.register("special_needs")}
                  placeholder="Describe any special needs or accommodations"
                  rows={3}
                />
                {form.formState.errors.special_needs && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.special_needs.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Contact Information</h3>
            </div>
            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
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
                <Label htmlFor="address">Address</Label>
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

              {/* Phone Numbers */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Phone Numbers *</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      addPhoneNumber(form.watch("phones") || [], form.setValue)
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Phone
                  </Button>
                </div>

                {form.watch("phones")?.map((phone, index) => (
                  <div key={index} className="flex gap-2 items-end">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor={`phone_${index}`}>Phone Number</Label>
                      <Input
                        id={`phone_${index}`}
                        {...form.register(`phones.${index}.phone_number`)}
                        placeholder="+252 61 234 5678"
                      />
                    </div>
                    <div className="w-32 space-y-2">
                      <Label htmlFor={`phone_type_${index}`}>Type</Label>
                      <Select
                        onValueChange={(value) =>
                          form.setValue(
                            `phones.${index}.phone_type`,
                            value as any
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="primary">Primary</SelectItem>
                          <SelectItem value="secondary">Secondary</SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {form.watch("phones")?.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          removePhoneNumber(
                            index,
                            form.watch("phones") || [],
                            form.setValue
                          )
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                {form.formState.errors.phones && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.phones.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Emergency Contacts Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Emergency Contacts</h3>
            </div>
            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Emergency Contacts *</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    addEmergencyContact(
                      form.watch("emergency_contacts") || [],
                      form.setValue
                    )
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </div>

              {form.watch("emergency_contacts")?.map((contact, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">
                      Emergency Contact {index + 1}
                    </h4>
                    {form.watch("emergency_contacts")?.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          removeEmergencyContact(
                            index,
                            form.watch("emergency_contacts") || [],
                            form.setValue
                          )
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`emergency_name_${index}`}>Name *</Label>
                      <Input
                        id={`emergency_name_${index}`}
                        {...form.register(`emergency_contacts.${index}.name`)}
                        placeholder="Contact person name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`emergency_relationship_${index}`}>
                        Relationship *
                      </Label>
                      <Input
                        id={`emergency_relationship_${index}`}
                        {...form.register(
                          `emergency_contacts.${index}.relationship`
                        )}
                        placeholder="e.g., Spouse, Parent, Sibling"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`emergency_phone_${index}`}>
                        Phone Number *
                      </Label>
                      <Input
                        id={`emergency_phone_${index}`}
                        {...form.register(
                          `emergency_contacts.${index}.phone_number`
                        )}
                        placeholder="+252 61 234 5678"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`emergency_email_${index}`}>Email</Label>
                      <Input
                        id={`emergency_email_${index}`}
                        type="email"
                        {...form.register(`emergency_contacts.${index}.email`)}
                        placeholder="contact@email.com"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`emergency_address_${index}`}>
                        Address
                      </Label>
                      <Textarea
                        id={`emergency_address_${index}`}
                        {...form.register(
                          `emergency_contacts.${index}.address`
                        )}
                        placeholder="Emergency contact address"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {form.formState.errors.emergency_contacts && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.emergency_contacts.message}
                </p>
              )}
            </div>
          </div>

          {/* Role and Permissions Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Role and Permissions</h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select
                  onValueChange={(value) => form.setValue("role", value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operator">Operator</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.role && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.role.message}
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
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.status && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.status.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Allowed Actions *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableActions.map((action) => (
                    <div key={action} className="flex items-center space-x-2">
                      <Checkbox
                        id={action}
                        checked={
                          form.watch("allowed_actions")?.includes(action) ||
                          false
                        }
                        onCheckedChange={(checked) => {
                          const current =
                            form.getValues("allowed_actions") || [];
                          if (checked) {
                            form.setValue("allowed_actions", [
                              ...current,
                              action,
                            ]);
                          } else {
                            form.setValue(
                              "allowed_actions",
                              current.filter((a) => a !== action)
                            );
                          }
                        }}
                      />
                      <Label htmlFor={action} className="text-sm capitalize">
                        {action.replace(/_/g, " ")}
                      </Label>
                    </div>
                  ))}
                </div>
                {form.formState.errors.allowed_actions && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.allowed_actions.message}
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
                  id="agree_to_terms"
                  checked={form.watch("agree_to_terms")}
                  onCheckedChange={(checked) =>
                    form.setValue("agree_to_terms", checked as boolean)
                  }
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="agree_to_terms"
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
              {form.formState.errors.agree_to_terms && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.agree_to_terms.message}
                </p>
              )}

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agree_to_confidentiality"
                  checked={form.watch("agree_to_confidentiality")}
                  onCheckedChange={(checked) =>
                    form.setValue(
                      "agree_to_confidentiality",
                      checked as boolean
                    )
                  }
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="agree_to_confidentiality"
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
              {form.formState.errors.agree_to_confidentiality && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.agree_to_confidentiality.message}
                </p>
              )}

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agree_to_background_check"
                  checked={form.watch("agree_to_background_check")}
                  onCheckedChange={(checked) =>
                    form.setValue(
                      "agree_to_background_check",
                      checked as boolean
                    )
                  }
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="agree_to_background_check"
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
              {form.formState.errors.agree_to_background_check && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.agree_to_background_check.message}
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
