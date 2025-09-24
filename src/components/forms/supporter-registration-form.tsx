"use client";

import * as React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  MapPin,
  Phone,
  User,
  Mail,
  IdCard,
  Upload,
  CheckCircle,
  Plus,
  Trash2,
  Users,
  Navigation,
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
  supporterRegistrationSchema,
  type SupporterRegistrationFormData,
} from "@/lib/validations/supporter";

// Mock data for regions, districts, and polling stations
const regions = [
  { id: 1, name: "Maroodi Jeex" },
  { id: 2, name: "Sanaag" },
  { id: 3, name: "Sool" },
  { id: 4, name: "Togdheer" },
  { id: 5, name: "Awdal" },
  { id: 6, name: "Sahil" },
];

const districts = [
  { id: 1, name: "Hargeisa Central", region_id: 1 },
  { id: 2, name: "Hargeisa North", region_id: 1 },
  { id: 3, name: "Hargeisa South", region_id: 1 },
  { id: 4, name: "Hargeisa East", region_id: 1 },
  { id: 5, name: "Hargeisa West", region_id: 1 },
  { id: 6, name: "Berbera", region_id: 1 },
  { id: 7, name: "Burao", region_id: 4 },
  { id: 8, name: "Borama", region_id: 5 },
  { id: 9, name: "Las Anod", region_id: 3 },
  { id: 10, name: "Erigavo", region_id: 2 },
  { id: 11, name: "Ceerigaabo", region_id: 2 },
  { id: 12, name: "Caynabo", region_id: 3 },
  { id: 13, name: "Laasqoray", region_id: 2 },
  { id: 14, name: "Oodweyne", region_id: 4 },
  { id: 15, name: "Sheikh", region_id: 1 },
  { id: 16, name: "Zeila", region_id: 5 },
];

const pollingStations = [
  {
    id: 1,
    name: "Hargeisa Central Station 1",
    district_id: 1,
    latitude: 9.5616,
    longitude: 44.065,
  },
  {
    id: 2,
    name: "Hargeisa Central Station 2",
    district_id: 1,
    latitude: 9.562,
    longitude: 44.0655,
  },
  {
    id: 3,
    name: "Hargeisa North Station 1",
    district_id: 2,
    latitude: 9.57,
    longitude: 44.07,
  },
  {
    id: 4,
    name: "Berbera Station 1",
    district_id: 6,
    latitude: 10.4342,
    longitude: 45.0137,
  },
  {
    id: 5,
    name: "Burao Station 1",
    district_id: 7,
    latitude: 9.5221,
    longitude: 45.5336,
  },
];

export function SupporterRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [selectedRegion, setSelectedRegion] = React.useState<
    number | undefined
  >();
  const [selectedDistrict, setSelectedDistrict] = React.useState<
    number | undefined
  >();
  const [selectedResidencyRegion, setSelectedResidencyRegion] = React.useState<
    number | undefined
  >();
  const [selectedResidencyDistrict, setSelectedResidencyDistrict] =
    React.useState<number | undefined>();

  const form = useForm({
    resolver: zodResolver(supporterRegistrationSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      phones: [{ phone_number: "", phone_type: "primary" as const }],
      emergency_contacts: [{ name: "", relationship: "", phone_number: "" }],
      receive_updates: true,
      agree_to_terms: false,
      agree_to_data_processing: false,
    },
  });

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control: form.control,
    name: "phones",
  });

  const {
    fields: emergencyFields,
    append: appendEmergency,
    remove: removeEmergency,
  } = useFieldArray({
    control: form.control,
    name: "emergency_contacts",
  });

  // Filter districts based on selected region
  const filteredDistricts = selectedRegion
    ? districts.filter((district) => district.region_id === selectedRegion)
    : districts;

  // Filter polling stations based on selected district
  const filteredPollingStations = selectedDistrict
    ? pollingStations.filter(
        (station) => station.district_id === selectedDistrict
      )
    : pollingStations;

  // Filter districts for residency based on selected residency region
  const filteredResidencyDistricts = selectedResidencyRegion
    ? districts.filter(
        (district) => district.region_id === selectedResidencyRegion
      )
    : districts;

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Registration data:", data);
      setIsSuccess(true);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegionChange = (regionId: string) => {
    const regionIdNum = parseInt(regionId);
    setSelectedRegion(regionIdNum);
    setSelectedDistrict(undefined);
    form.setValue("region_id", regionIdNum);
    form.setValue("district_id", undefined);
    form.setValue("pollingstation_id", undefined);
  };

  const handleDistrictChange = (districtId: string) => {
    const districtIdNum = parseInt(districtId);
    setSelectedDistrict(districtIdNum);
    form.setValue("district_id", districtIdNum);
    form.setValue("pollingstation_id", undefined);
  };

  const handleResidencyRegionChange = (regionId: string) => {
    const regionIdNum = parseInt(regionId);
    setSelectedResidencyRegion(regionIdNum);
    setSelectedResidencyDistrict(undefined);
    form.setValue("residency_region_id", regionIdNum);
    form.setValue("residency_district_id", undefined);
  };

  const handleResidencyDistrictChange = (districtId: string) => {
    const districtIdNum = parseInt(districtId);
    setSelectedResidencyDistrict(districtIdNum);
    form.setValue("residency_district_id", districtIdNum);
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
                Thank you for registering as a supporter. You will receive a
                confirmation message shortly.
              </p>
            </div>
            <Button
              onClick={() => {
                setIsSuccess(false);
                form.reset();
              }}
              className="mt-4"
            >
              Register Another Supporter
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
          <User className="h-6 w-6 text-primary" />
          Supporter Registration
        </CardTitle>
        <p className="text-muted-foreground">
          Join our campaign and make a difference in Somaliland's future
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
                  placeholder="Enter your first name"
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
                  placeholder="Enter your last name"
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
                  placeholder="Enter your middle name (optional)"
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
                  placeholder="Enter your fourth name (optional)"
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

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Input
                  id="language"
                  {...form.register("language")}
                  placeholder="Primary language (optional)"
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
                  placeholder="Any special needs or accessibility requirements (optional)"
                  rows={2}
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

              {/* Phone Numbers */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Phone Numbers *</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      appendPhone({ phone_number: "", phone_type: "secondary" })
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Phone
                  </Button>
                </div>

                {phoneFields.map((field, index) => (
                  <div key={field.id} className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor={`phones.${index}.phone_number`}>
                        Phone Number {index === 0 ? "(Primary)" : ""}
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...form.register(`phones.${index}.phone_number`)}
                          placeholder="+252 61 234 5678"
                          className="pl-10"
                        />
                      </div>
                      {form.formState.errors.phones?.[index]?.phone_number && (
                        <p className="text-sm text-destructive">
                          {
                            form.formState.errors.phones[index]?.phone_number
                              ?.message
                          }
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`phones.${index}.phone_type`}>Type</Label>
                      <Select
                        onValueChange={(value) =>
                          form.setValue(
                            `phones.${index}.phone_type`,
                            value as any
                          )
                        }
                        defaultValue={field.phone_type}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="primary">Primary</SelectItem>
                          <SelectItem value="secondary">Secondary</SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.phones?.[index]?.phone_type && (
                        <p className="text-sm text-destructive">
                          {
                            form.formState.errors.phones[index]?.phone_type
                              ?.message
                          }
                        </p>
                      )}
                    </div>

                    <div className="flex items-end">
                      {phoneFields.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removePhone(index)}
                          className="w-full"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      )}
                    </div>
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
                    appendEmergency({
                      name: "",
                      relationship: "",
                      phone_number: "",
                    })
                  }
                  disabled={emergencyFields.length >= 3}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </div>

              {emergencyFields.map((field, index) => (
                <div key={field.id} className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`emergency_contacts.${index}.name`}>
                      Contact Name
                    </Label>
                    <Input
                      {...form.register(`emergency_contacts.${index}.name`)}
                      placeholder="Full name"
                    />
                    {form.formState.errors.emergency_contacts?.[index]
                      ?.name && (
                      <p className="text-sm text-destructive">
                        {
                          form.formState.errors.emergency_contacts[index]?.name
                            ?.message
                        }
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`emergency_contacts.${index}.relationship`}>
                      Relationship
                    </Label>
                    <Input
                      {...form.register(
                        `emergency_contacts.${index}.relationship`
                      )}
                      placeholder="e.g., Father, Mother, Spouse"
                    />
                    {form.formState.errors.emergency_contacts?.[index]
                      ?.relationship && (
                      <p className="text-sm text-destructive">
                        {
                          form.formState.errors.emergency_contacts[index]
                            ?.relationship?.message
                        }
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`emergency_contacts.${index}.phone_number`}>
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...form.register(
                          `emergency_contacts.${index}.phone_number`
                        )}
                        placeholder="+252 61 234 5678"
                        className="pl-10"
                      />
                    </div>
                    {form.formState.errors.emergency_contacts?.[index]
                      ?.phone_number && (
                      <p className="text-sm text-destructive">
                        {
                          form.formState.errors.emergency_contacts[index]
                            ?.phone_number?.message
                        }
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`emergency_contacts.${index}.email`}>
                      Email (Optional)
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...form.register(`emergency_contacts.${index}.email`)}
                        placeholder="email@example.com"
                        className="pl-10"
                      />
                    </div>
                    {form.formState.errors.emergency_contacts?.[index]
                      ?.email && (
                      <p className="text-sm text-destructive">
                        {
                          form.formState.errors.emergency_contacts[index]?.email
                            ?.message
                        }
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`emergency_contacts.${index}.address`}>
                      Address (Optional)
                    </Label>
                    <Input
                      {...form.register(`emergency_contacts.${index}.address`)}
                      placeholder="Contact's address"
                    />
                    {form.formState.errors.emergency_contacts?.[index]
                      ?.address && (
                      <p className="text-sm text-destructive">
                        {
                          form.formState.errors.emergency_contacts[index]
                            ?.address?.message
                        }
                      </p>
                    )}
                  </div>

                  <div className="flex items-end md:col-span-2">
                    {emergencyFields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeEmergency(index)}
                        className="w-full"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove Contact
                      </Button>
                    )}
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

          {/* Residency Location Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Residency Location</h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="residency_region_id">Region</Label>
                <Select onValueChange={handleResidencyRegionChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your residency region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region.id} value={region.id.toString()}>
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.residency_region_id && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.residency_region_id.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="residency_district_id">District</Label>
                <Select
                  onValueChange={handleResidencyDistrictChange}
                  disabled={!selectedResidencyRegion}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your residency district" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredResidencyDistricts.map((district) => (
                      <SelectItem
                        key={district.id}
                        value={district.id.toString()}
                      >
                        {district.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.residency_district_id && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.residency_district_id.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="residency_address">Residency Address</Label>
                <Textarea
                  id="residency_address"
                  {...form.register("residency_address")}
                  placeholder="Enter your complete residency address (optional)"
                  rows={3}
                />
                {form.formState.errors.residency_address && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.residency_address.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="residency_latitude">Latitude</Label>
                <div className="relative">
                  <Navigation className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="residency_latitude"
                    type="number"
                    step="any"
                    {...form.register("residency_latitude", {
                      valueAsNumber: true,
                    })}
                    placeholder="9.5616"
                    className="pl-10"
                  />
                </div>
                {form.formState.errors.residency_latitude && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.residency_latitude.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="residency_longitude">Longitude</Label>
                <div className="relative">
                  <Navigation className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="residency_longitude"
                    type="number"
                    step="any"
                    {...form.register("residency_longitude", {
                      valueAsNumber: true,
                    })}
                    placeholder="44.0650"
                    className="pl-10"
                  />
                </div>
                {form.formState.errors.residency_longitude && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.residency_longitude.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Voting Location Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">
                Voting Location Information
              </h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="region_id">Region</Label>
                <Select onValueChange={handleRegionChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region.id} value={region.id.toString()}>
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.region_id && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.region_id.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="district_id">District</Label>
                <Select
                  onValueChange={handleDistrictChange}
                  disabled={!selectedRegion}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your district" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredDistricts.map((district) => (
                      <SelectItem
                        key={district.id}
                        value={district.id.toString()}
                      >
                        {district.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.district_id && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.district_id.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="voting_address">Voting Address</Label>
                <Textarea
                  id="voting_address"
                  {...form.register("voting_address")}
                  placeholder="Enter your complete voting address (optional)"
                  rows={3}
                />
                {form.formState.errors.voting_address && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.voting_address.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="pollingstation_id">Polling Station</Label>
                <Select
                  onValueChange={(value) =>
                    form.setValue("pollingstation_id", parseInt(value))
                  }
                  disabled={!selectedDistrict}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your polling station" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredPollingStations.map((station) => (
                      <SelectItem
                        key={station.id}
                        value={station.id.toString()}
                      >
                        {station.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.pollingstation_id && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.pollingstation_id.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <div className="relative">
                  <Navigation className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="latitude"
                    type="number"
                    step="any"
                    {...form.register("latitude", { valueAsNumber: true })}
                    placeholder="9.5616"
                    className="pl-10"
                  />
                </div>
                {form.formState.errors.latitude && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.latitude.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <div className="relative">
                  <Navigation className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="longitude"
                    type="number"
                    step="any"
                    {...form.register("longitude", { valueAsNumber: true })}
                    placeholder="44.0650"
                    className="pl-10"
                  />
                </div>
                {form.formState.errors.longitude && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.longitude.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <IdCard className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Additional Information</h3>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="voter_id">Voter ID</Label>
                <Input
                  id="voter_id"
                  {...form.register("voter_id")}
                  placeholder="Your voter identification number"
                />
                {form.formState.errors.voter_id && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.voter_id.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="fav_party">Favorite Party</Label>
                <Input
                  id="fav_party"
                  {...form.register("fav_party")}
                  placeholder="Your preferred political party"
                />
                {form.formState.errors.fav_party && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.fav_party.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="photo_verification">
                  Photo Verification URL
                </Label>
                <div className="relative">
                  <Upload className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="photo_verification"
                    {...form.register("photo_verification")}
                    placeholder="https://example.com/photo.jpg"
                    className="pl-10"
                  />
                </div>
                {form.formState.errors.photo_verification && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.photo_verification.message}
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
                    I agree to the terms and conditions *
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    By checking this box, you agree to our terms of service and
                    privacy policy.
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
                  id="agree_to_data_processing"
                  checked={form.watch("agree_to_data_processing")}
                  onCheckedChange={(checked) =>
                    form.setValue(
                      "agree_to_data_processing",
                      checked as boolean
                    )
                  }
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="agree_to_data_processing"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I consent to data processing *
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    I consent to the processing of my personal data for campaign
                    purposes.
                  </p>
                </div>
              </div>
              {form.formState.errors.agree_to_data_processing && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.agree_to_data_processing.message}
                </p>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  id="receive_updates"
                  checked={form.watch("receive_updates")}
                  onCheckedChange={(checked) =>
                    form.setValue("receive_updates", checked)
                  }
                />
                <Label
                  htmlFor="receive_updates"
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
                  Registering...
                </>
              ) : (
                "Register Supporter"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
