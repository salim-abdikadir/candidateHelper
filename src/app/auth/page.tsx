"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Users,
  UserCheck,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/theme-toggle";

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState("");

  const roleIcons = {
    admin: <Shield className="h-5 w-5 text-destructive" />,
    operator: <Users className="h-5 w-5 text-primary" />,
    supporter: <UserCheck className="h-5 w-5 text-accent" />,
  };

  const roleFeatures = {
    admin: [
      "Complete campaign oversight",
      "Real-time analytics & reporting",
      "Operator & supporter management",
      "Funds & resource allocation",
      "AI-powered fraud detection",
    ],
    operator: [
      "GPS tracking & navigation",
      "Supporter registration",
      "Task management",
      "Real-time communication",
      "Field operations tools",
    ],
    supporter: [
      "Easy registration process",
      "Polling station information",
      "Transport & logistics",
      "Campaign updates",
      "Community engagement",
    ],
  };

  const getRedirectPath = (role: string) => {
    switch (role) {
      case "admin":
        return "/admin";
      case "operator":
        return "/operator";
      case "supporter":
        return "/supporter";
      default:
        return "/";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Button asChild variant="ghost" className="text-foreground">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <div className="flex items-center space-x-4">
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left Side - Auth Form */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary">
                      <Shield className="h-10 w-10 text-primary-foreground" />
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold text-foreground">
                    {isLogin ? "Welcome Back" : "Create Account"}
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    {isLogin
                      ? "Sign in to your account to continue"
                      : "Sign up to get started with the platform"}
                  </p>
                </div>

                <Card className="card-professional">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">
                      {isLogin ? "Sign In" : "Sign Up"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form className="space-y-4">
                      {!isLogin && (
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            type="text"
                            placeholder="Enter your full name"
                            className="h-12"
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select
                          value={selectedRole}
                          onValueChange={setSelectedRole}
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">
                              <div className="flex items-center space-x-2">
                                {roleIcons.admin}
                                <span>Admin</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="operator">
                              <div className="flex items-center space-x-2">
                                {roleIcons.operator}
                                <span>Operator</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="supporter">
                              <div className="flex items-center space-x-2">
                                {roleIcons.supporter}
                                <span>Supporter</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="h-12 pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {isLogin && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="remember"
                              className="rounded border-input"
                            />
                            <Label htmlFor="remember" className="text-sm">
                              Remember me
                            </Label>
                          </div>
                          <Button variant="link" className="px-0 text-sm">
                            Forgot password?
                          </Button>
                        </div>
                      )}

                      <Button
                        asChild
                        type="submit"
                        className="w-full h-12 text-base btn-gradient"
                      >
                        <Link href={getRedirectPath(selectedRole)}>
                          {isLogin ? "Sign In" : "Create Account"}
                          <Zap className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </form>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="h-12">
                        <Shield className="mr-2 h-4 w-4" />
                        Google
                      </Button>
                      <Button variant="outline" className="h-12">
                        <Users className="mr-2 h-4 w-4" />
                        Facebook
                      </Button>
                    </div>

                    <div className="text-center">
                      <Button
                        variant="link"
                        className="px-0"
                        onClick={() => setIsLogin(!isLogin)}
                      >
                        {isLogin
                          ? "Don't have an account? Sign up"
                          : "Already have an account? Sign in"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Side - Role Features */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-lg">
                <div className="text-center mb-8">
                  <Badge className="mb-4 bg-gradient-primary text-primary-foreground border-0 px-4 py-2 text-sm font-medium">
                    <Zap className="mr-2 h-4 w-4" />
                    Choose Your Role
                  </Badge>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    What can you do with each role?
                  </h2>
                  <p className="text-muted-foreground">
                    Each role provides different capabilities and access levels
                  </p>
                </div>

                <div className="space-y-6">
                  {Object.entries(roleFeatures).map(([role, features]) => (
                    <Card
                      key={role}
                      className={`card-professional transition-all duration-300 ${
                        selectedRole === role
                          ? "ring-2 ring-primary shadow-strong"
                          : "hover:shadow-strong"
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                              role === "admin"
                                ? "bg-destructive/10"
                                : role === "operator"
                                ? "bg-primary/10"
                                : "bg-accent/10"
                            }`}
                          >
                            {roleIcons[role as keyof typeof roleIcons]}
                          </div>
                          <div>
                            <CardTitle className="text-lg capitalize">
                              {role}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {role === "admin"
                                ? "Complete campaign oversight"
                                : role === "operator"
                                ? "Mobile field operations"
                                : "Community engagement"}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-center text-sm text-muted-foreground"
                            >
                              <CheckCircle className="mr-3 h-4 w-4 text-accent flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
