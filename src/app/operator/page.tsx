import React from "react";
import { Users, MapPin, Truck, MessageCircle, Camera } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function OperatorDashboard() {
  const tasks = [
    {
      title: "Register New Supporters",
      description: "Target: 50 new registrations today",
      progress: "24/50",
    },
    {
      title: "Distribute Campaign Materials",
      description: "Distribute flyers in target districts",
      progress: "12/20 locations",
    },
    {
      title: "Collect Voter Proofs",
      description: "Collect and upload voter identification",
      progress: "18/30 supporters",
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-8">Operator Dashboard 🚨</h1>
        <nav className="space-y-4">
          {[
            { name: "Home", icon: <MapPin /> },
            { name: "Supporters", icon: <Users /> },
            { name: "Transport", icon: <Truck /> },
            { name: "Messages", icon: <MessageCircle /> },
          ].map((item) => (
            <div
              key={item.name}
              className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md cursor-pointer"
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100">
        <h2 className="text-3xl font-bold mb-8">Supporter Registration</h2>

        <div className="grid grid-cols-2 gap-8">
          {/* Supporter Registration Form */}
          <Card>
            <CardHeader>
              <CardTitle>Register New Supporter</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <Input placeholder="Enter supporter's full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <Input type="tel" placeholder="Enter phone number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nearest Polling Station
                  </label>
                  <Input placeholder="Enter polling station location" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    ID Upload
                  </label>
                  <div className="flex items-center space-x-4">
                    <Input type="file" accept="image/*" />
                    <Camera className="text-gray-500" />
                  </div>
                </div>
                <Button className="w-full" variant="default">
                  Register Supporter
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Tasks and Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{task.title}</h3>
                        <p className="text-sm text-gray-500">
                          {task.description}
                        </p>
                      </div>
                      <span className="text-sm font-bold">{task.progress}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{
                          width: `${
                            (parseInt(task.progress.split("/")[0]) /
                              parseInt(task.progress.split("/")[1])) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
