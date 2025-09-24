"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { SupporterEditPage } from "@/components/supporters/supporter-edit-page";
import { Supporter, SupporterFormData } from "@/types/supporter";

// Mock data - in a real app, this would come from an API
const mockSupporters: Supporter[] = [
  {
    id: 1,
    firstname: "Ahmed",
    middlename: "Hassan",
    lastname: "Ali",
    email: "ahmed.hassan@email.com",
    status: "approved",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-20T10:00:00Z",
    gender: "male",
    language: "somali",
    residency_address: "Hargeisa Central, Maroodi Jeex",
    voting_address: "Hargeisa Central, Maroodi Jeex",
    voter_id: "V001234567",
    fav_party: "Party A",
    phones: [
      {
        id: 1,
        supporter_id: 1,
        phone_number: "+252 61 234 5678",
        phone_type: "primary",
        is_verified: true,
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z",
      },
    ],
    emergency_contacts: [
      {
        id: 1,
        supporter_id: 1,
        name: "Hassan Ali",
        relationship: "Father",
        phone_number: "+252 61 234 5679",
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z",
      },
    ],
    region: {
      id: 1,
      name: "Maroodi Jeex",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    district: {
      id: 1,
      name: "Hargeisa Central",
      region_id: 1,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    pollingstation: {
      id: 1,
      name: "Hargeisa Central Primary School",
      district_id: 1,
      latitude: 9.5616,
      longitude: 44.065,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: 2,
    firstname: "Fatima",
    lastname: "Mohamed",
    email: "fatima.mohamed@email.com",
    status: "approved",
    created_at: "2024-01-18T10:00:00Z",
    updated_at: "2024-01-19T10:00:00Z",
    gender: "female",
    language: "somali",
    residency_address: "Hargeisa North, Maroodi Jeex",
    voting_address: "Hargeisa North, Maroodi Jeex",
    voter_id: "V001234568",
    fav_party: "Party B",
    phones: [
      {
        id: 2,
        supporter_id: 2,
        phone_number: "+252 61 345 6789",
        phone_type: "primary",
        is_verified: true,
        created_at: "2024-01-18T10:00:00Z",
        updated_at: "2024-01-18T10:00:00Z",
      },
    ],
    emergency_contacts: [
      {
        id: 2,
        supporter_id: 2,
        name: "Mohamed Ahmed",
        relationship: "Brother",
        phone_number: "+252 61 345 6790",
        created_at: "2024-01-18T10:00:00Z",
        updated_at: "2024-01-18T10:00:00Z",
      },
    ],
    region: {
      id: 1,
      name: "Maroodi Jeex",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    district: {
      id: 2,
      name: "Hargeisa North",
      region_id: 1,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    pollingstation: {
      id: 2,
      name: "Hargeisa North Secondary School",
      district_id: 2,
      latitude: 9.58,
      longitude: 44.08,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
];

export default function SupporterEditPageRoute() {
  const params = useParams();
  const router = useRouter();
  const [supporter, setSupporter] = React.useState<Supporter | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    const supporterId = parseInt(params.id as string);
    const foundSupporter = mockSupporters.find((s) => s.id === supporterId);

    if (foundSupporter) {
      setSupporter(foundSupporter);
    } else {
      // Handle supporter not found
      router.push("/admin/supporters");
    }
    setLoading(false);
  }, [params.id, router]);

  const handleSave = async (data: SupporterFormData) => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would make an API call here
      console.log("Saving supporter data:", data);

      // Show success message and redirect
      router.push(`/admin/supporters/${supporter?.id}/view`);
    } catch (error) {
      console.error("Error saving supporter:", error);
      // Handle error (show toast, etc.)
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (supporter) {
      router.push(`/admin/supporters/${supporter.id}/view`);
    } else {
      router.push("/admin/supporters");
    }
  };

  const handleBack = () => {
    if (supporter) {
      router.push(`/admin/supporters/${supporter.id}/view`);
    } else {
      router.push("/admin/supporters");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading supporter details...
          </p>
        </div>
      </div>
    );
  }

  if (!supporter) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Supporter Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The supporter you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Back to Supporters
          </button>
        </div>
      </div>
    );
  }

  return (
    <SupporterEditPage
      supporter={supporter}
      onSave={handleSave}
      onCancel={handleCancel}
      onBack={handleBack}
    />
  );
}
