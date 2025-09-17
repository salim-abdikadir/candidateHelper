"use client";
import React from "react";
import { Target, RefreshCw, Loader2, CheckCircle } from "lucide-react";
import { ModeToggle } from "@/components/theme-toggle";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary animate-pulse">
            <Target className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>

        {/* Loading Animation */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Loading...
          </h1>
          <p className="text-muted-foreground">
            Please wait while we load your content
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-gradient-primary h-2 rounded-full animate-pulse"
              style={{ width: "60%" }}
            ></div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Loading your dashboard...
          </p>
        </div>

        {/* Loading Steps */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent">
              <CheckCircle className="h-4 w-4 text-accent-foreground" />
            </div>
            <span className="text-sm text-foreground">
              Initializing application
            </span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
              <RefreshCw className="h-4 w-4 text-primary-foreground animate-spin" />
            </div>
            <span className="text-sm text-foreground">Loading data</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
              <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
            </div>
            <span className="text-sm text-muted-foreground">
              Preparing interface
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Target className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Somaliland Candidate Helper
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Empowering democratic participation through technology
          </p>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
