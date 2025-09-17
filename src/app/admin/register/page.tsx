"use client";

import React from "react";
import { SupporterRegistrationForm } from "@/components/forms/supporter-registration-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminRegisterPage() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/supporters">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Supporters
              </Button>
            </Link>
            <div>
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <UserPlus className="h-6 w-6 text-primary" />
                Register New Supporter
              </h2>
              <p className="text-muted-foreground">
                Add a new supporter to the campaign database
              </p>
            </div>
          </div>
        </div>
      </div>

      <SupporterRegistrationForm />
    </div>
  );
}

