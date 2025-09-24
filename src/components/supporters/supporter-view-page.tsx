"use client";

import * as React from "react";
import {
  ArrowLeft,
  Edit,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  IdCard,
  Users,
  CheckCircle,
  Clock,
  UserX,
  Download,
  Share2,
  Copy,
  Trash2,
  Archive,
  Send,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Supporter } from "@/types/supporter";

interface SupporterViewPageProps {
  supporter: Supporter;
  onEdit?: () => void;
  onBack?: () => void;
}

const getStatusColor = (status: Supporter["status"]) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "rejected":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

const getStatusIcon = (status: Supporter["status"]) => {
  switch (status) {
    case "approved":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case "rejected":
      return <UserX className="h-4 w-4 text-red-600" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-600" />;
  }
};

const getInitials = (supporter: Supporter) => {
  const firstInitial = supporter.firstname?.[0] || "";
  const lastInitial = supporter.lastname?.[0] || "";
  return (firstInitial + lastInitial).toUpperCase();
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function SupporterViewPage({
  supporter,
  onEdit,
  onBack,
}: SupporterViewPageProps) {
  const fullName = `${supporter.firstname} ${
    supporter.middlename ? supporter.middlename + " " : ""
  }${supporter.lastname}${
    supporter.fourthname ? " " + supporter.fourthname : ""
  }`;

  const handleCopyId = () => {
    navigator.clipboard.writeText(supporter.id.toString());
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(supporter, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `supporter-${supporter.id}-${supporter.firstname}-${supporter.lastname}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                  Supporter Details
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  View and manage supporter information
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Supporter Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={handleCopyId}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Supporter ID
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportData}>
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Phone className="mr-2 h-4 w-4" />
                    Call Supporter
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Archive className="mr-2 h-4 w-4" />
                    Archive Supporter
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Supporter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {onEdit && (
                <Button onClick={onEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Personal Information
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(supporter.status)}
                    <Badge className={getStatusColor(supporter.status)}>
                      {supporter.status.charAt(0).toUpperCase() +
                        supporter.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={supporter.photo_verification || ""}
                      alt={fullName}
                    />
                    <AvatarFallback className="text-lg">
                      {getInitials(supporter)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {fullName}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Supporter ID: {supporter.id}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Birth Date
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {supporter.birthdate
                            ? formatDate(supporter.birthdate)
                            : "Not provided"}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Gender
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {supporter.gender
                            ? supporter.gender.charAt(0).toUpperCase() +
                              supporter.gender.slice(1)
                            : "Not specified"}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Language
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {supporter.language
                            ? supporter.language.charAt(0).toUpperCase() +
                              supporter.language.slice(1)
                            : "Not specified"}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Party Preference
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {supporter.fav_party || "No preference"}
                        </p>
                      </div>
                    </div>
                    {supporter.special_needs && (
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Special Needs
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {supporter.special_needs}
                        </p>
                      </div>
                    )}
                  </div>
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
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Email Address
                    </label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-900 dark:text-white">
                        {supporter.email || "Not provided"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Primary Phone
                    </label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-900 dark:text-white">
                        {supporter.phones?.find(
                          (p) => p.phone_type === "primary"
                        )?.phone_number || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone Numbers */}
                {supporter.phones && supporter.phones.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">
                      All Phone Numbers
                    </label>
                    <div className="space-y-2">
                      {supporter.phones.map((phone) => (
                        <div
                          key={phone.id}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-900 dark:text-white">
                              {phone.phone_number}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {phone.phone_type}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            {phone.is_verified ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-yellow-500" />
                            )}
                            <span className="text-xs text-gray-500">
                              {phone.is_verified ? "Verified" : "Unverified"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Emergency Contacts */}
                {supporter.emergency_contacts &&
                  supporter.emergency_contacts.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">
                        Emergency Contacts
                      </label>
                      <div className="space-y-2">
                        {supporter.emergency_contacts.map((contact) => (
                          <div
                            key={contact.id}
                            className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {contact.name}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {contact.relationship}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-900 dark:text-white">
                                  {contact.phone_number}
                                </p>
                                {contact.email && (
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {contact.email}
                                  </p>
                                )}
                              </div>
                            </div>
                            {contact.address && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {contact.address}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </CardContent>
            </Card>

            {/* Location Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Location Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Residency Location
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Region
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {supporter.region?.name || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        District
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {supporter.district?.name || "Not specified"}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Address
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {supporter.residency_address || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Voting Location
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Voting Address
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {supporter.voting_address || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Polling Station
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {supporter.pollingstation?.name || "Not assigned"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Voter ID
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {supporter.voter_id || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Coordinates
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {supporter.latitude && supporter.longitude
                          ? `${supporter.latitude.toFixed(
                              6
                            )}, ${supporter.longitude.toFixed(6)}`
                          : "Not available"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status and Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Status & Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {getStatusIcon(supporter.status)}
                    <Badge className={getStatusColor(supporter.status)}>
                      {supporter.status.charAt(0).toUpperCase() +
                        supporter.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Current Status
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve Supporter
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <UserX className="h-4 w-4 mr-2" />
                    Reject Supporter
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Registration Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Registration Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Registered On
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {formatDateTime(supporter.created_at)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Last Updated
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {formatDateTime(supporter.updated_at)}
                  </p>
                </div>
                {supporter.created_by && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Created By
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      User ID: {supporter.created_by}
                    </p>
                  </div>
                )}
                {supporter.updated_by && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Updated By
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      User ID: {supporter.updated_by}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Phone Numbers
                  </span>
                  <Badge variant="outline">
                    {supporter.phones?.length || 0}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Emergency Contacts
                  </span>
                  <Badge variant="outline">
                    {supporter.emergency_contacts?.length || 0}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Verified Phones
                  </span>
                  <Badge variant="outline">
                    {supporter.phones?.filter((p) => p.is_verified).length || 0}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
