import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "../ui/form";
import {
  InputCommon,
  ComboboxCommon,
  ImagePicker,
} from "../common/FormCommons";
import { Button } from "../ui/button";
import {
  useGetPersonalSettingsQuery,
  useUpdatePersonalSettingsMutation,
} from "../../app/features/profile-settings/profileSettingsApi";
import { useGetCountriesQuery } from "../../app/features/commons/commonsApi";
import { Loader2 } from "lucide-react";

// Validation Schema
const personalSettingsSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(1, "Mobile number is required"),
  country: z.string().min(1, "Country is required"),
  profile_image: z.any().optional(),
});

const EditPersonalSettings = ({ onSuccess }) => {
  const { data: personalData, isLoading: isGetLoading } =
    useGetPersonalSettingsQuery();
  const { data: countriesData, isLoading: isGetCountriesLoading } =
    useGetCountriesQuery();
  const [updateProfile, { isLoading: isUpdateLoading }] =
    useUpdatePersonalSettingsMutation();

  const form = useForm({
    resolver: zodResolver(personalSettingsSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      mobile: "",
      country: "",
      profile_image: undefined,
    },
    mode: "onChange",
  });

  // Populate form with existing data
  useEffect(() => {
    if (personalData?.data) {
      form.reset({
        first_name: personalData.data.first_name || "",
        last_name: personalData.data.last_name || "",
        email: personalData.data.email || "",
        mobile: personalData.data.mobile || "",
        country: personalData.data.country?.id || "",
        profile_image: personalData.data.profile_image || "",
      });
    }
  }, [personalData, form]);

  const handleFormSubmit = async (submitData) => {
    try {
      const formData = new FormData();

      // Append all fields to FormData
      Object.keys(submitData).forEach((key) => {
        if (submitData[key] !== undefined && submitData[key] !== null) {
          formData.append(key, submitData[key]);
        }
      });

      await updateProfile(formData).unwrap();

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
          {/* Profile Image Section */}
          <div className="flex flex-col items-center gap-4 pb-6 border-b">
            <ImagePicker
              control={form.control}
              name="profile_image"
              label="Profile Image"
            />
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputCommon
              control={form.control}
              name="first_name"
              label="First Name *"
              placeholder="Enter first name"
            />

            <InputCommon
              control={form.control}
              name="last_name"
              label="Last Name *"
              placeholder="Enter last name"
            />

            <InputCommon
              control={form.control}
              name="email"
              label="Email Address *"
              placeholder="email@example.com"
              type="email"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputCommon
              control={form.control}
              name="mobile"
              label="Phone Number *"
              placeholder="+1 (555) 123-4567"
            />

            <ComboboxCommon
              control={form.control}
              name="country"
              label="Country *"
              placeholder="Select country"
              items={countriesData?.data || []}
              isLoading={isGetCountriesLoading}
            />
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

export default EditPersonalSettings;
