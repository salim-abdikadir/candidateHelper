"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  MessageCircle,
  Users,
  Phone,
  Mail,
  Send,
  CheckCircle,
  Plus,
  Trash2,
  Upload,
  FileText,
  Image,
  Video,
  Mic,
  Calendar,
  Clock,
  Target,
  Globe,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const messageSchema = z.object({
  // Message Content
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  messageType: z.enum(["sms", "email", "whatsapp", "push_notification"], {
    message: "Please select a message type",
  }),

  // Recipients
  recipientType: z.enum(["all", "specific", "group", "custom"], {
    message: "Please select a recipient type",
  }),
  specificRecipients: z.array(z.string()).optional(),
  groups: z.array(z.string()).optional(),
  customQuery: z.string().optional(),

  // Scheduling
  sendImmediately: z.boolean().optional(),
  scheduledDate: z.string().optional(),
  scheduledTime: z.string().optional(),
  timezone: z.string().optional(),

  // Media and Attachments
  attachments: z.array(z.string()).optional(),
  mediaType: z.enum(["text", "image", "video", "audio", "document"]).optional(),
  mediaUrl: z.string().optional(),

  // Campaign Settings
  campaignId: z.string().optional(),
  templateId: z.string().optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
  requiresConfirmation: z.boolean().optional(),

  // Language and Localization
  language: z.enum(["somali", "arabic", "english"]).optional(),
  region: z.string().optional(),
  district: z.string().optional(),

  // Analytics and Tracking
  trackOpens: z.boolean().optional(),
  trackClicks: z.boolean().optional(),
  trackResponses: z.boolean().optional(),
  analyticsTags: z.array(z.string()).optional(),

  // Additional Settings
  allowUnsubscribe: z.boolean().optional(),
  includeSignature: z.boolean().optional(),
  signature: z.string().optional(),
  notes: z.string().optional(),
});

type MessageFormData = z.infer<typeof messageSchema>;

const recipientGroups = [
  { id: "all_supporters", name: "All Supporters", count: 12450 },
  { id: "active_supporters", name: "Active Supporters", count: 8920 },
  { id: "new_supporters", name: "New Supporters", count: 1530 },
  { id: "volunteers", name: "Volunteers", count: 450 },
  { id: "operators", name: "Operators", count: 156 },
  { id: "donors", name: "Donors", count: 320 },
  { id: "youth", name: "Youth (18-35)", count: 6800 },
  { id: "women", name: "Women", count: 6200 },
  { id: "elders", name: "Elders (65+)", count: 1200 },
];

const campaigns = [
  { id: "presidential_2024", name: "2024 Presidential Campaign" },
  { id: "parliamentary_2024", name: "2024 Parliamentary Campaign" },
  { id: "local_elections", name: "Local Elections" },
  { id: "voter_registration", name: "Voter Registration Drive" },
  { id: "youth_engagement", name: "Youth Engagement Program" },
];

const templates = [
  { id: "welcome", name: "Welcome Message", type: "email" },
  { id: "event_reminder", name: "Event Reminder", type: "sms" },
  { id: "donation_thanks", name: "Donation Thank You", type: "email" },
  { id: "volunteer_call", name: "Volunteer Call", type: "whatsapp" },
  { id: "urgent_announcement", name: "Urgent Announcement", type: "sms" },
];

const regions = [
  "Maroodi Jeex",
  "Sanaag",
  "Sool",
  "Togdheer",
  "Awdal",
  "Sahil",
];

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

interface CommunicationMessageFormProps {
  onSuccess?: () => void;
}

export function CommunicationMessageForm({
  onSuccess,
}: CommunicationMessageFormProps = {}) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [selectedGroups, setSelectedGroups] = React.useState<string[]>([]);
  const [selectedAttachments, setSelectedAttachments] = React.useState<
    string[]
  >([]);

  const form = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      messageType: "sms",
      recipientType: "all",
      sendImmediately: true,
      priority: "medium",
      language: "somali",
      trackOpens: true,
      trackClicks: true,
      trackResponses: true,
      allowUnsubscribe: true,
      includeSignature: true,
      requiresConfirmation: false,
    },
  });

  const onSubmit = async (data: MessageFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Message data:", data);
      setIsSuccess(true);
      onSuccess?.();
    } catch (error) {
      console.error("Message sending error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGroupToggle = (groupId: string) => {
    const current = selectedGroups;
    if (current.includes(groupId)) {
      setSelectedGroups(current.filter((id) => id !== groupId));
    } else {
      setSelectedGroups([...current, groupId]);
    }
  };

  const handleAttachmentToggle = (attachment: string) => {
    const current = selectedAttachments;
    if (current.includes(attachment)) {
      setSelectedAttachments(current.filter((item) => item !== attachment));
    } else {
      setSelectedAttachments([...current, attachment]);
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
                Message Sent Successfully!
              </h3>
              <p className="text-muted-foreground mt-2">
                Your message has been queued for delivery to the selected
                recipients.
              </p>
            </div>
            <Button
              onClick={() => {
                setIsSuccess(false);
                form.reset();
              }}
              className="mt-4"
            >
              Send Another Message
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-6 w-6 text-primary" />
          Compose Message
        </CardTitle>
        <p className="text-muted-foreground">
          Create and send messages to supporters, operators, and other campaign
          stakeholders
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="recipients">Recipients</TabsTrigger>
              <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Message Content</h3>
                </div>
                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="messageType">Message Type *</Label>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("messageType", value as any)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select message type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sms">
                          <div className="flex items-center gap-2">
                            <MessageCircle className="h-4 w-4" />
                            SMS
                          </div>
                        </SelectItem>
                        <SelectItem value="email">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Email
                          </div>
                        </SelectItem>
                        <SelectItem value="whatsapp">
                          <div className="flex items-center gap-2">
                            <MessageCircle className="h-4 w-4" />
                            WhatsApp
                          </div>
                        </SelectItem>
                        <SelectItem value="push_notification">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            Push Notification
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.messageType && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.messageType.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="templateId">Template (Optional)</Label>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("templateId", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name} ({template.type})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      {...form.register("subject")}
                      placeholder="Enter message subject"
                    />
                    {form.formState.errors.subject && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      {...form.register("message")}
                      placeholder="Enter your message content"
                      rows={6}
                    />
                    {form.formState.errors.message && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.message.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Media and Attachments */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Media & Attachments</h3>
                </div>
                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="mediaType">Media Type</Label>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("mediaType", value as any)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select media type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text Only</SelectItem>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                        <SelectItem value="document">Document</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mediaUrl">Media URL</Label>
                    <Input
                      id="mediaUrl"
                      {...form.register("mediaUrl")}
                      placeholder="Enter media URL"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Attachments</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {[
                        "Document.pdf",
                        "Image.jpg",
                        "Video.mp4",
                        "Audio.mp3",
                      ].map((file) => (
                        <div key={file} className="flex items-center space-x-2">
                          <Checkbox
                            id={file}
                            checked={selectedAttachments.includes(file)}
                            onCheckedChange={() => handleAttachmentToggle(file)}
                          />
                          <Label htmlFor={file} className="text-sm">
                            {file}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Recipients Tab */}
            <TabsContent value="recipients" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Recipients</h3>
                </div>
                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="recipientType">Recipient Type *</Label>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("recipientType", value as any)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select recipient type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="specific">
                          Specific Recipients
                        </SelectItem>
                        <SelectItem value="group">Groups</SelectItem>
                        <SelectItem value="custom">Custom Query</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.recipientType && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.recipientType.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Group Selection */}
                {form.watch("recipientType") === "group" && (
                  <div className="space-y-4">
                    <Label>Select Groups</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {recipientGroups.map((group) => (
                        <div
                          key={group.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedGroups.includes(group.id)
                              ? "border-primary bg-primary/5"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => handleGroupToggle(group.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{group.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {group.count.toLocaleString()} recipients
                              </p>
                            </div>
                            <div className="flex items-center">
                              {selectedGroups.includes(group.id) && (
                                <CheckCircle className="h-5 w-5 text-primary" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Custom Query */}
                {form.watch("recipientType") === "custom" && (
                  <div className="space-y-2">
                    <Label htmlFor="customQuery">Custom Query</Label>
                    <Textarea
                      id="customQuery"
                      {...form.register("customQuery")}
                      placeholder="Enter custom query for recipient selection"
                      rows={3}
                    />
                  </div>
                )}
              </div>

              {/* Geographic Targeting */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">
                    Geographic Targeting
                  </h3>
                </div>
                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <Select
                      onValueChange={(value) => form.setValue("region", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("district", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Scheduling Tab */}
            <TabsContent value="scheduling" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Scheduling</h3>
                </div>
                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="sendImmediately"
                      checked={form.watch("sendImmediately")}
                      onCheckedChange={(checked) =>
                        form.setValue("sendImmediately", checked)
                      }
                    />
                    <Label htmlFor="sendImmediately">Send Immediately</Label>
                  </div>

                  {!form.watch("sendImmediately") && (
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="scheduledDate">Scheduled Date</Label>
                        <Input
                          id="scheduledDate"
                          type="date"
                          {...form.register("scheduledDate")}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="scheduledTime">Scheduled Time</Label>
                        <Input
                          id="scheduledTime"
                          type="time"
                          {...form.register("scheduledTime")}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select
                          onValueChange={(value) =>
                            form.setValue("timezone", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Africa/Mogadishu">
                              Africa/Mogadishu
                            </SelectItem>
                            <SelectItem value="UTC">UTC</SelectItem>
                            <SelectItem value="Africa/Nairobi">
                              Africa/Nairobi
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Message Settings</h3>
                </div>
                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("priority", value as any)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("language", value as any)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="somali">Somali</SelectItem>
                        <SelectItem value="arabic">Arabic</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Tracking Options</h4>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="trackOpens"
                        checked={form.watch("trackOpens")}
                        onCheckedChange={(checked) =>
                          form.setValue("trackOpens", checked)
                        }
                      />
                      <Label htmlFor="trackOpens">Track Opens</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="trackClicks"
                        checked={form.watch("trackClicks")}
                        onCheckedChange={(checked) =>
                          form.setValue("trackClicks", checked)
                        }
                      />
                      <Label htmlFor="trackClicks">Track Clicks</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="trackResponses"
                        checked={form.watch("trackResponses")}
                        onCheckedChange={(checked) =>
                          form.setValue("trackResponses", checked)
                        }
                      />
                      <Label htmlFor="trackResponses">Track Responses</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Additional Options</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="allowUnsubscribe"
                        checked={form.watch("allowUnsubscribe")}
                        onCheckedChange={(checked) =>
                          form.setValue("allowUnsubscribe", checked)
                        }
                      />
                      <Label htmlFor="allowUnsubscribe">
                        Allow Unsubscribe
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="includeSignature"
                        checked={form.watch("includeSignature")}
                        onCheckedChange={(checked) =>
                          form.setValue("includeSignature", checked)
                        }
                      />
                      <Label htmlFor="includeSignature">
                        Include Signature
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="requiresConfirmation"
                        checked={form.watch("requiresConfirmation")}
                        onCheckedChange={(checked) =>
                          form.setValue("requiresConfirmation", checked)
                        }
                      />
                      <Label htmlFor="requiresConfirmation">
                        Requires Confirmation
                      </Label>
                    </div>
                  </div>
                </div>

                {form.watch("includeSignature") && (
                  <div className="space-y-2">
                    <Label htmlFor="signature">Signature</Label>
                    <Textarea
                      id="signature"
                      {...form.register("signature")}
                      placeholder="Enter your signature"
                      rows={2}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    {...form.register("notes")}
                    placeholder="Additional notes or instructions"
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

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
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
