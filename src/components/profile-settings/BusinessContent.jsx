import React from "react";
import {
  TypographyH3,
  TypographyLead,
  TypographyP,
} from "../common/Typography";
import { Button } from "../ui/button";
import { useGetBusinessSettingsQuery } from "../../app/features/profile-settings/profileSettingsApi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Building2, Mail, Globe, Image, Edit } from "lucide-react";

const BusinessContent = () => {
  const { data: businessData, isLoading } = useGetBusinessSettingsQuery();

  if (isLoading) {
    return (
      <div className="py-5">
        <div className="flex items-center justify-between gap-2 mb-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4 mb-8">
              <Skeleton className="w-24 h-24 rounded-lg" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const infoItems = [
    {
      icon: Building2,
      label: "Business Name",
      value: businessData?.data?.name,
    },
    {
      icon: Globe,
      label: "Website URL",
      value: businessData?.data?.website_url,
    },
    {
      icon: Mail,
      label: "Support Email",
      value: businessData?.data?.support_email,
    },
  ];

  return (
    <div className="py-5">
      

      <Card>
        <CardContent className="pt-6">
          {/* Logo Section */}
          <div className="flex flex-col items-center gap-3 mb-8 pb-8 border-b">
            <div className="w-32 h-32 rounded-lg ring-4 ring-primary/10 overflow-hidden bg-muted flex items-center justify-center">
              {businessData?.data?.logo_image ? (
                <img
                  src={businessData?.data?.logo_image}
                  alt="Business Logo"
                  className="w-full h-full object-contain"
                />
              ) : (
                <Building2 className="h-16 w-16 text-muted-foreground" />
              )}
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-lg">
                {businessData?.data?.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                Business Information
              </p>
            </div>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {infoItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary flex-shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {item.label}
                    </p>
                    <p className="text-base font-medium text-foreground break-all">
                      {item.value || "Not provided"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hero Image Section */}
          {businessData?.data?.hero_image && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Image className="h-5 w-5 text-primary" />
                <p className="text-sm font-medium text-muted-foreground">
                  Hero Image
                </p>
              </div>
              <div className="w-full rounded-lg overflow-hidden border">
                <img
                  src={businessData?.data?.hero_image}
                  alt="Hero"
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessContent;
