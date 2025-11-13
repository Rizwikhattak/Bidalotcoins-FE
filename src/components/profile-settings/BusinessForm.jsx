import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "../ui/form";
import { TypographyMuted } from "../common/Typography";
import { InputCommon, FileUploadCommon } from "../common/FormCommons";
import { Button } from "../ui/button";
import {
  useGetBusinessSettingsQuery,
  useUpdateBusinessSettingsMutation,
} from "../../app/features/profile-settings/profileSettingsApi";
import { Loader2 } from "lucide-react";

// Validation Schema
const businessSettingsSchema = z.object({
  name: z.string().min(1, "Business name is required"),
  website_url: z
    .string()
    .url("Invalid URL format")
    .min(1, "Website URL is required"),
  support_email: z.string().email("Invalid email address"),
  logo_image: z.any().optional(),
  hero_image: z.any().optional(),
});

const BusinessForm = ({ onSuccess }) => {
  const { data: businessData, isLoading: isGetLoading } =
    useGetBusinessSettingsQuery();
  const [updateBusiness, { isLoading: isUpdateLoading }] =
    useUpdateBusinessSettingsMutation();

  const form = useForm({
    resolver: zodResolver(businessSettingsSchema),
    defaultValues: {
      name: "",
      website_url: "",
      support_email: "",
      logo_image: undefined,
      hero_image: undefined,
    },
    mode: "onChange",
  });

  // Populate form with existing data
  useEffect(() => {
    if (businessData?.data) {
      form.reset({
        name: businessData.data.name || "",
        website_url: businessData.data.website_url || "",
        support_email: businessData.data.support_email || "",
        logo_image: businessData.data.logo_image || "",
        hero_image: businessData.data.hero_image || "",
      });
    }
  }, [businessData, form]);

  const handleFormSubmit = async (submitData) => {
    try {
      const formData = new FormData();

      // Append all fields to FormData
      Object.keys(submitData).forEach((key) => {
        if (submitData[key] !== undefined && submitData[key] !== null) {
          // Handle file uploads (logo_image, hero_image)
          if (key === "logo_image" || key === "hero_image") {
            if (submitData[key] instanceof File) {
              formData.append(key, submitData[key]);
            }
          } else {
            formData.append(key, submitData[key]);
          }
        }
      });

      await updateBusiness(formData).unwrap();

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormError = (errors) => {
    console.error("Form validation errors:", errors);
  };

  if (isGetLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="py-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit, handleFormError)}
          className="space-y-6"
        >
          {/* Branding Section */}
          <div>
            <TypographyMuted className="text-lg mb-4">Branding</TypographyMuted>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dashboard Logo */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Dashboard Logo
                </label>
                <FileUploadCommon
                  control={form.control}
                  name="logo_image"
                  title="Upload Logo"
                  accept="image/jpeg,image/png,image/jpg"
                  maxFiles={1}
                  maxSize={2}
                  showPreview={true}
                  className="w-full"
                />
              </div>

              {/* Website Hero Image */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Website Hero Image
                </label>
                <FileUploadCommon
                  control={form.control}
                  name="hero_image"
                  title="Upload Image"
                  accept="image/jpeg,image/png,image/jpg"
                  maxFiles={1}
                  maxSize={2}
                  showPreview={true}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Company Information Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <TypographyMuted className="text-lg">
                Company Information
              </TypographyMuted>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputCommon
                control={form.control}
                name="name"
                label="Business Name *"
                placeholder="Bidalot Auctions"
              />

              <InputCommon
                control={form.control}
                name="website_url"
                label="Website URL *"
                placeholder="http://www.bidalot.com"
                type="url"
              />

              <InputCommon
                control={form.control}
                name="support_email"
                label="Support Email *"
                placeholder="mailto:support@bidalot.com"
                type="email"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end items-center pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={isUpdateLoading}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isUpdateLoading}>
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BusinessForm;
