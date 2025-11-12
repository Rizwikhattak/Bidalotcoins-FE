import React, { useEffect } from "react";
import { TypographyH1, TypographyMuted } from "../common/Typography";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import {
  ComboboxCommon,
  FileUploadCommon,
  InputCommon,
  TextAreaCommon,
} from "../common/FormCommons";
import { Button } from "../ui/button";
import { useGetAuctionsQuery } from "../../app/features/auctions/auctionsApi";
import { useNavigate, useParams } from "react-router-dom";
import { GLOBAL_ROUTES } from "../../utils/Constants";
import { useGetCountriesQuery } from "../../app/features/commons/commonsApi";
import { useGetTagsQuery } from "../../app/features/tags/tagsApi";
import { useAddLotMutation } from "../../app/features/lots/lotsApi";
import { newsUpdatesScheema } from "./newsUpdatesScheema";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

const AddUpdateNewsUpdates = () => {
  const [addLot, { isLoading: isPostLoading }] = useAddLotMutation();
  const { data: auctionsData, isLoading: isAuctionsLoading } =
    useGetAuctionsQuery();
  const { data: countriesData, isLoading: isGetCountriesLoading } =
    useGetCountriesQuery();
  const { data: tagsData, isLoading: isGetTagsLoading } = useGetTagsQuery();
  const navigate = useNavigate();
  const { id: auctionId } = useParams();
  const initialValues = {
    title: "",
    description: "",
    front_image: undefined,
    back_image: undefined,
    year: "",
    weight: "",
    cost: "",
    starting_price: "",
    images: undefined,
    country: "",
    auction: "",
    tag: "",
  };

  const form = useForm({
    resolver: zodResolver(newsUpdatesScheema),
    defaultValues: initialValues,
    mode: "onChange",
  });
  useEffect(() => {
    if (!isAuctionsLoading && auctionId) {
      const selectedAuction =
        auctionsData &&
        auctionsData?.data?.find((item) => item.id === Number(auctionId));
      console.log("selectedAuction", selectedAuction, auctionId);
      form.reset({
        ...selectedAuction,
        start_date_time: new Date(
          `${selectedAuction?.start_date}T${selectedAuction?.start_time}+05:00`
        ),
        end_date_time: new Date(
          `${selectedAuction?.end_date}T${selectedAuction?.end_time}+05:00`
        ),
      });
    }
  }, [auctionsData, isAuctionsLoading, auctionId]);
  const handleFormSubmit = async (submitData) => {
    try {
      const formData = new FormData();
      Object.keys(submitData).forEach((key) => {
        formData.append(key, submitData[key]);
      });
      await addLot(formData).unwrap();
      form.reset(initialValues);
      navigate(GLOBAL_ROUTES.ADMIN_LOTS);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormError = (errors) => {
    console.error("Form validation errors:", errors);
  };

  return (
    <section className="add-new-auctions-section">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit, handleFormError)}
          className="space-y-6 py-4"
        >
          <div className="flex items-center justify-between gap-2">
            <TypographyH1>Create News / Updates</TypographyH1>
            <div className="flex gap-4 justify-end items-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Save Draft
              </Button>
              <Button type="submit" isLoading={isPostLoading}>
                Publish Now
              </Button>
            </div>
          </div>
          <div className="grid sm:grid-cols-12 gap-3">
            <div className="col-span-8 rounded-lg border">
              <div className=" bg-sidebar p-4 rounded-t-lg">
                <p>Basic Info</p>
              </div>
              <div className="p-4">
                <InputCommon
                  control={form.control}
                  name="title"
                  label="Title"
                  placeholder="e.g Record Breaking 1933 Double eagle sells...."
                  // className="h-16"
                />
                <TextAreaCommon
                  control={form.control}
                  name="description"
                  label="Description"
                  placeholder="e.g The legendary 1933 Saint-Gaudens Double eagle has shattered all previous auction records ...."
                />
                <div className="grid sm:grid-cols-2 gap-2 py-2">
                  <ComboboxCommon
                    control={form.control}
                    name="category"
                    label="Category"
                    placeholder="Select a category"
                    items={countriesData?.data || []}
                    isLoading={isGetCountriesLoading}
                  />
                  <ComboboxCommon
                    control={form.control}
                    name="tags"
                    label="Tags"
                    placeholder="Selec a Tag"
                    items={countriesData?.data || []}
                    isLoading={isGetCountriesLoading}
                  />
                </div>

                <div className="py-2">
                  <Label htmlFor="front_image" className="mb-2">
                    Featured Image
                  </Label>
                  <FileUploadCommon
                    control={form.control}
                    name="front_image"
                    title="Upload Front Image"
                    accept="image/jpeg,image/png,image/jpg"
                    maxFiles={1} // 1 for single, >1 for multiple
                    maxSize={5} // Max size in MB
                    showPreview={true} // Show image preview
                  />
                </div>
              </div>
            </div>
            <div className="col-span-4 rounded-lg border h-fit">
              <div className=" bg-sidebar p-4 rounded-t-lg">
                <p>Publish Settings</p>
              </div>
              <div className="p-4">
                <div className="p-4">
                  <Label className="mb-2">Status</Label>
                  <Controller
                    name="status"
                    control={form.control}
                    render={({ field }) => (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => field.onChange("draft")}
                          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            field.value === "draft"
                              ? "bg-yellow-100 text-yellow-800 border-2 border-yellow-300"
                              : "bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200"
                          }`}
                        >
                          Draft
                        </button>

                        <button
                          type="button"
                          onClick={() => field.onChange("publish")}
                          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            field.value === "publish"
                              ? "bg-green-100 text-green-800 border-2 border-green-300"
                              : "bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200"
                          }`}
                        >
                          Publish
                        </button>
                      </div>
                    )}
                  />

                  {/* Keep your Highlight on Homepage checkbox below */}
                </div>
                <Controller
                  name="terms_conditions"
                  control={form.control}
                  render={({ field }) => (
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="terms_conditions"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                      />
                      <Label htmlFor="terms_conditions">
                        Highlight on Homepage
                      </Label>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default AddUpdateNewsUpdates;
