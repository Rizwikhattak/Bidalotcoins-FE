import React from "react";
import {
  TypographyH3,
  TypographyLead,
  TypographyP,
} from "../common/Typography";
import { Button } from "../ui/button";
import { useGetPersonalSettingsQuery } from "../../app/features/profile-settings/profileSettingsApi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { User, Mail, Phone, MapPin, Edit } from "lucide-react";

const PersonalContent = () => {
  const { data: personalData, isLoading } = useGetPersonalSettingsQuery();

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
              <Skeleton className="w-24 h-24 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
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
      icon: User,
      label: "First Name",
      value: personalData?.data?.first_name,
    },
    {
      icon: User,
      label: "Last Name",
      value: personalData?.data?.last_name,
    },
    {
      icon: Mail,
      label: "Email",
      value: personalData?.data?.email,
    },
    {
      icon: Phone,
      label: "Mobile",
      value: personalData?.data?.mobile || "Not provided",
    },
    {
      icon: MapPin,
      label: "Country",
      value: personalData?.data?.country?.name || "Not provided",
    },
  ];

  return (
    <div className="">
      <Card>
        <CardContent className="pt-6">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center gap-3 mb-8 pb-8 border-b">
            <Avatar className="w-24 h-24 ring-4 ring-primary/10">
              <AvatarImage
                src={personalData?.data?.profile_image}
                alt="Profile Image"
              />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {personalData?.data?.first_name?.[0]?.toUpperCase()}
                {personalData?.data?.last_name?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h4 className="font-semibold text-lg">
                {personalData?.data?.first_name} {personalData?.data?.last_name}
              </h4>
              <p className="text-sm text-muted-foreground">
                @{personalData?.data?.username || "user"}
              </p>
            </div>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <p className="text-base font-medium text-foreground truncate">
                      {item.value || "Not provided"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalContent;
