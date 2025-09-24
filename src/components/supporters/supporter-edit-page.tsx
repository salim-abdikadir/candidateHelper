"use client";

import * as React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Save,
  X,
  Plus,
  Trash2,
  Phone,
  Mail,
  MapPin,
  User,
  Users,
  Calendar,
  Upload,
  CheckCircle,
  AlertCircle,
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
  Supporter,
  SupporterFormData,
  SupporterPhone,
  SupporterEmergencyContact,
} from "@/types/supporter";
import { supporterRegistrationSchema } from "@/lib/validations/supporter";

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
    name: "Burao High School",
    district_id: 7,
    latitude: 9.5221,
    longitude: 45.5336,
  },
  {
    id: 6,
    name: "Borama University",
    district_id: 8,
    latitude: 9.9342,
    longitude: 43.1805,
  },
];

interface SupporterEditPageProps {
  supporter: Supporter;
  onSave?: (data: SupporterFormData) => void;
  onCancel?: () => void;
  onBack?: () => void;
}

const convertSupporterToFormData = (
  supporter: Supporter
): SupporterFormData => {
  console.log("Converting supporter to form data:", supporter);

  // Extract IDs from nested objects
  const regionId = supporter.region_id || supporter.region?.id;
  const districtId = supporter.district_id || supporter.district?.id;
  const pollingStationId =
    supporter.pollingstation_id || supporter.pollingstation?.id;

  console.log("Extracted IDs:", {
    regionId,
    districtId,
    pollingStationId,
    regionName: supporter.region?.name,
    districtName: supporter.district?.name,
    pollingStationName: supporter.pollingstation?.name,
  });

  const formData = {
    firstname: supporter.firstname,
    middlename: supporter.middlename || "",
    lastname: supporter.lastname,
    fourthname: supporter.fourthname || "",
    birthdate: supporter.birthdate || "",
    gender: supporter.gender || "male",
    language: supporter.language || "",
    special_needs: supporter.special_needs || "",
    email: supporter.email || "",
    phones: supporter.phones?.map((phone) => ({
      phone_number: phone.phone_number,
      phone_type: phone.phone_type,
    })) || [{ phone_number: "", phone_type: "primary" }],
    emergency_contacts: supporter.emergency_contacts?.map((contact) => ({
      name: contact.name,
      relationship: contact.relationship,
      phone_number: contact.phone_number,
      email: contact.email || "",
      address: contact.address || "",
    })) || [
      { name: "", relationship: "", phone_number: "", email: "", address: "" },
    ],
    residency_address: supporter.residency_address || "",
    // Use extracted IDs for residency (assuming same as voting for now)
    residency_region_id: supporter.residency_region_id || regionId || undefined,
    residency_district_id:
      supporter.residency_district_id || districtId || undefined,
    residency_latitude:
      supporter.residency_latitude || supporter.latitude || undefined,
    residency_longitude:
      supporter.residency_longitude || supporter.longitude || undefined,
    voting_address: supporter.voting_address || "",
    latitude: supporter.latitude || undefined,
    longitude: supporter.longitude || undefined,
    // Use extracted IDs for voting
    region_id: regionId || undefined,
    district_id: districtId || undefined,
    pollingstation_id: pollingStationId || undefined,
    voter_id: supporter.voter_id || "",
    photo_verification: supporter.photo_verification || "",
    fav_party: supporter.fav_party || "",
    agree_to_terms: true,
    agree_to_data_processing: true,
    receive_updates: true,
  };

  console.log("Final form data:", formData);
  return formData;
};

export function SupporterEditPage({
  supporter,
  onSave,
  onCancel,
  onBack,
}: SupporterEditPageProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<SupporterFormData>({
    resolver: zodResolver(supporterRegistrationSchema),
    defaultValues: convertSupporterToFormData(supporter),
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

  // Watch form values for regions and districts
  const residencyRegionId = form.watch("residency_region_id");
  const residencyDistrictId = form.watch("residency_district_id");
  const votingRegionId = form.watch("region_id");
  const votingDistrictId = form.watch("district_id");
  const pollingStationId = form.watch("pollingstation_id");

  // Helper functions to get current selections from form
  const getCurrentResidencyRegion = React.useMemo(() => {
    const region = regions.find((r) => r.id === residencyRegionId);
    console.log(
      "Residency Region - ID:",
      residencyRegionId,
      "Name:",
      region?.name
    );
    return region?.name || "";
  }, [residencyRegionId]);

  const getCurrentResidencyDistrict = React.useMemo(() => {
    const district = districts.find((d) => d.id === residencyDistrictId);
    console.log(
      "Residency District - ID:",
      residencyDistrictId,
      "Name:",
      district?.name
    );
    return district?.name || "";
  }, [residencyDistrictId]);

  const getCurrentVotingRegion = React.useMemo(() => {
    const region = regions.find((r) => r.id === votingRegionId);
    console.log("Voting Region - ID:", votingRegionId, "Name:", region?.name);
    return region?.name || "";
  }, [votingRegionId]);

  const getCurrentVotingDistrict = React.useMemo(() => {
    const district = districts.find((d) => d.id === votingDistrictId);
    console.log(
      "Voting District - ID:",
      votingDistrictId,
      "Name:",
      district?.name
    );
    return district?.name || "";
  }, [votingDistrictId]);

  // Reset form when supporter data changes
  React.useEffect(() => {
    if (supporter) {
      console.log("=== SUPPORTER DATA DEBUG ===");
      console.log("Raw supporter data:", supporter);
      console.log("Supporter region_id:", supporter.region_id);
      console.log("Supporter district_id:", supporter.district_id);
      console.log("Supporter pollingstation_id:", supporter.pollingstation_id);
      console.log(
        "Supporter residency_region_id:",
        supporter.residency_region_id
      );
      console.log(
        "Supporter residency_district_id:",
        supporter.residency_district_id
      );

      console.log("Available regions:", regions);
      console.log("Available districts:", districts);
      console.log("Available polling stations:", pollingStations);

      const formData = convertSupporterToFormData(supporter);
      console.log("Converted form data:", formData);
      console.log("Form region_id:", formData.region_id);
      console.log("Form district_id:", formData.district_id);
      console.log("Form pollingstation_id:", formData.pollingstation_id);
      console.log("Form residency_region_id:", formData.residency_region_id);
      console.log(
        "Form residency_district_id:",
        formData.residency_district_id
      );
      console.log("=== END SUPPORTER DATA DEBUG ===");

      form.reset(formData);
    }
  }, [supporter, form]);

  // Debug effect to log form values
  React.useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (
        name?.includes("region") ||
        name?.includes("district") ||
        name?.includes("pollingstation")
      ) {
        console.log(`Form field ${name} changed:`, (value as any)[name]);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const getDistrictsByRegion = (regionName: string) => {
    if (!regionName) return [];
    const region = regions.find((r) => r.name === regionName);
    if (!region) return [];
    return districts.filter((d) => d.region_id === region.id);
  };

  const getPollingStationsByDistrict = (districtName: string) => {
    if (!districtName) return [];
    const district = districts.find((d) => d.name === districtName);
    if (!district) return [];
    return pollingStations.filter((p) => p.district_id === district.id);
  };

  const onSubmit = async (data: SupporterFormData) => {
    setIsSubmitting(true);
    try {
      // Process form data
      const processedData = {
        ...data,
        phones: data.phones.filter((phone) => phone.phone_number.trim() !== ""),
        emergency_contacts: data.emergency_contacts.filter(
          (contact) =>
            contact.name.trim() !== "" && contact.phone_number.trim() !== ""
        ),
      };

      if (onSave) {
        await onSave(processedData);
      }
    } catch (error) {
      console.error("Error saving supporter:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResidencyRegionChange = (regionName: string) => {
    const region = regions.find((r) => r.name === regionName);
    if (region) {
      form.setValue("residency_region_id", region.id);
    } else {
      form.setValue("residency_region_id", undefined);
    }
    form.setValue("residency_district_id", undefined);
  };

  const handleResidencyDistrictChange = (districtName: string) => {
    const district = districts.find((d) => d.name === districtName);
    if (district) {
      form.setValue("residency_district_id", district.id);
    } else {
      form.setValue("residency_district_id", undefined);
    }
  };

  const handleVotingRegionChange = (regionName: string) => {
    const region = regions.find((r) => r.name === regionName);
    if (region) {
      form.setValue("region_id", region.id);
    } else {
      form.setValue("region_id", undefined);
    }
    form.setValue("district_id", undefined);
    form.setValue("pollingstation_id", undefined);
  };

  const handleVotingDistrictChange = (districtName: string) => {
    console.log("Voting district changed:", districtName);
    const district = districts.find((d) => d.name === districtName);
    if (district) {
      form.setValue("district_id", district.id);
    } else {
      form.setValue("district_id", undefined);
    }
    form.setValue("pollingstation_id", undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {onBack && (
                <Button variant="ghost" size="sm" onClick={onBack}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Edit Supporter
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Update supporter information
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={onCancel || onBack}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={form.handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>

        {/* Debug Information */}
        <Card className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <CardHeader>
            <CardTitle className="text-yellow-800 dark:text-yellow-200">
              Debug Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <strong>Residency Region ID:</strong>{" "}
                {residencyRegionId || "undefined"}
              </div>
              <div>
                <strong>Residency District ID:</strong>{" "}
                {residencyDistrictId || "undefined"}
              </div>
              <div>
                <strong>Voting Region ID:</strong>{" "}
                {votingRegionId || "undefined"}
              </div>
              <div>
                <strong>Voting District ID:</strong>{" "}
                {votingDistrictId || "undefined"}
              </div>
              <div>
                <strong>Polling Station ID:</strong>{" "}
                {pollingStationId || "undefined"}
              </div>
              <div>
                <strong>Current Residency Region:</strong>{" "}
                {getCurrentResidencyRegion || "none"}
              </div>
              <div>
                <strong>Current Residency District:</strong>{" "}
                {getCurrentResidencyDistrict || "none"}
              </div>
              <div>
                <strong>Current Voting Region:</strong>{" "}
                {getCurrentVotingRegion || "none"}
              </div>
              <div>
                <strong>Current Voting District:</strong>{" "}
                {getCurrentVotingDistrict || "none"}
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstname">First Name *</Label>
                  <Input
                    id="firstname"
                    {...form.register("firstname")}
                    placeholder="Enter first name"
                  />
                  {form.formState.errors.firstname && (
                    <p className="text-sm text-red-600">
                      {form.formState.errors.firstname.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="middlename">Middle Name</Label>
                  <Input
                    id="middlename"
                    {...form.register("middlename")}
                    placeholder="Enter middle name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastname">Last Name *</Label>
                  <Input
                    id="lastname"
                    {...form.register("lastname")}
                    placeholder="Enter last name"
                  />
                  {form.formState.errors.lastname && (
                    <p className="text-sm text-red-600">
                      {form.formState.errors.lastname.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fourthname">Fourth Name</Label>
                  <Input
                    id="fourthname"
                    {...form.register("fourthname")}
                    placeholder="Enter fourth name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birthdate">Birth Date</Label>
                  <Input
                    id="birthdate"
                    type="date"
                    {...form.register("birthdate")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={form.watch("gender")}
                    onValueChange={(value) =>
                      form.setValue(
                        "gender",
                        value as "male" | "female" | "other"
                      )
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Input
                    id="language"
                    {...form.register("language")}
                    placeholder="e.g., Somali, English"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="special_needs">Special Needs</Label>
                <Textarea
                  id="special_needs"
                  {...form.register("special_needs")}
                  placeholder="Describe any special needs or accommodations"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  placeholder="Enter email address"
                />
              </div>

              {/* Phone Numbers */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Phone Numbers</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      appendPhone({ phone_number: "", phone_type: "primary" })
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Phone
                  </Button>
                </div>
                {phoneFields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <div className="flex-1">
                      <Input
                        {...form.register(`phones.${index}.phone_number`)}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="w-32">
                      <Select
                        value={form.watch(`phones.${index}.phone_type`)}
                        onValueChange={(value) =>
                          form.setValue(
                            `phones.${index}.phone_type`,
                            value as "primary" | "secondary" | "emergency"
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="primary">Primary</SelectItem>
                          <SelectItem value="secondary">Secondary</SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removePhone(index)}
                      disabled={phoneFields.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Emergency Contacts */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Emergency Contacts</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      appendEmergency({
                        name: "",
                        relationship: "",
                        phone_number: "",
                        email: "",
                        address: "",
                      })
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Contact
                  </Button>
                </div>
                {emergencyFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="p-4 border rounded-lg space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">
                        Emergency Contact {index + 1}
                      </h4>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeEmergency(index)}
                        disabled={emergencyFields.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Name *</Label>
                        <Input
                          {...form.register(`emergency_contacts.${index}.name`)}
                          placeholder="Enter full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Relationship *</Label>
                        <Input
                          {...form.register(
                            `emergency_contacts.${index}.relationship`
                          )}
                          placeholder="e.g., Father, Mother, Spouse"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone Number *</Label>
                        <Input
                          {...form.register(
                            `emergency_contacts.${index}.phone_number`
                          )}
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                          {...form.register(
                            `emergency_contacts.${index}.email`
                          )}
                          placeholder="Enter email address"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label>Address</Label>
                        <Textarea
                          {...form.register(
                            `emergency_contacts.${index}.address`
                          )}
                          placeholder="Enter full address"
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Residency Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Residency Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Region</Label>
                  <Select
                    value={getCurrentResidencyRegion}
                    onValueChange={handleResidencyRegionChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region.id} value={region.name}>
                          {region.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>District</Label>
                  <Select
                    value={getCurrentResidencyDistrict}
                    onValueChange={handleResidencyDistrictChange}
                    disabled={!getCurrentResidencyRegion}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      {getDistrictsByRegion(getCurrentResidencyRegion).map(
                        (district) => (
                          <SelectItem key={district.id} value={district.name}>
                            {district.name}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="residency_address">Address</Label>
                <Textarea
                  id="residency_address"
                  {...form.register("residency_address")}
                  placeholder="Enter full residency address"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Voting Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Voting Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Region</Label>
                  <Select
                    value={getCurrentVotingRegion}
                    onValueChange={handleVotingRegionChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region.id} value={region.name}>
                          {region.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>District</Label>
                  <Select
                    value={getCurrentVotingDistrict}
                    onValueChange={handleVotingDistrictChange}
                    disabled={!getCurrentVotingRegion}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      {getDistrictsByRegion(getCurrentVotingRegion).map(
                        (district) => (
                          <SelectItem key={district.id} value={district.name}>
                            {district.name}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="voting_address">Voting Address</Label>
                <Textarea
                  id="voting_address"
                  {...form.register("voting_address")}
                  placeholder="Enter voting address"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Polling Station</Label>
                  <Select
                    value={form.watch("pollingstation_id")?.toString() || ""}
                    onValueChange={(value) => {
                      if (value) {
                        form.setValue("pollingstation_id", parseInt(value));
                      } else {
                        form.setValue("pollingstation_id", undefined);
                      }
                    }}
                    disabled={!getCurrentVotingDistrict}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select polling station" />
                    </SelectTrigger>
                    <SelectContent>
                      {getPollingStationsByDistrict(
                        getCurrentVotingDistrict
                      ).map((station) => (
                        <SelectItem
                          key={station.id}
                          value={station.id.toString()}
                        >
                          {station.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="voter_id">Voter ID</Label>
                  <Input
                    id="voter_id"
                    {...form.register("voter_id")}
                    placeholder="Enter voter ID"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fav_party">Preferred Party</Label>
                <Input
                  id="fav_party"
                  {...form.register("fav_party")}
                  placeholder="Enter preferred party"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="photo_verification">
                  Photo Verification URL
                </Label>
                <Input
                  id="photo_verification"
                  {...form.register("photo_verification")}
                  placeholder="Enter photo URL"
                />
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel || onBack}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
