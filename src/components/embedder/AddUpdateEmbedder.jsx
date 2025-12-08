import React, { useEffect, useState } from "react";
import DialogCommon from "../common/DialogCommon";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckboxCommon,
  CheckboxGroupCardsCommon,
  FileUploadCommon,
  InputCommon,
  TextAreaCommon,
} from "../common/FormCommons";
import {
  useAddRoleMutation,
  useGetPermissionsQuery,
  useUpdateRoleMutation,
} from "../../app/features/roles/rolesApi";
import { TypographyMuted } from "../common/Typography";
import {
  useAddTagMutation,
  useUpdateTagMutation,
} from "../../app/features/tags/tagsApi";
import { APP_CONSTANTS } from "../../utils/Constants";
import { embedderScheema } from "./embedderScheema";
import { CloudUpload, Download, Upload } from "lucide-react";
import {
  useAddEmbedderMutation,
  useDownloadCSVQuery,
  useLazyDownloadCSVQuery,
  useUpdateEmbedderMutation,
} from "../../app/features/embedder/embeddersApi";

const AddUpdateEmbedder = ({
  selectedEmbedder,
  setSelectedEmbedder,
  openDialog,
  setOpenDialog,
}) => {
  const [addEmbedder, { isLoading: isPostLoading }] = useAddEmbedderMutation();
  const [downloadCSV, { data, isFetching, isError, error }] =
    useLazyDownloadCSVQuery();
  const [updateEmbedder, { isLoading: isUpdateLoading }] =
    useUpdateEmbedderMutation();
  const initialValues = {
    name: "",
    description: "",
    price: "",
    tag: "",
    image: undefined,
  };
  const form = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(embedderScheema),
    mode: "onChange",
  });

  useEffect(() => {
    if (selectedEmbedder) {
      form.reset({
        name: selectedEmbedder?.name || "",
        description: selectedEmbedder?.description || "",
        price: selectedEmbedder?.price || "",
        tag: selectedEmbedder?.tag || "",
        image: selectedEmbedder?.image || undefined,
      });
    } else {
      form.reset(initialValues);
    }
  }, [selectedEmbedder, openDialog]);

  // Handle CSV download when data is received
  useEffect(() => {
    if (data?.data && Array.isArray(data.data)) {
      convertToCSV(data.data);
    }
  }, [data]);

  const convertToCSV = (dataArray) => {
    if (!dataArray || dataArray.length === 0) {
      console.error("No data to export");
      return;
    }

    // Define CSV headers
    const headers = [
      "ID",
      "Name",
      "Description",
      "Price",
      "Tag",
      "Image URL",
      "Filename",
      "File Size",
      "Dimensions",
      "Created At",
      "HTML Code",
    ];

    // Convert data to CSV rows
    const rows = dataArray.map((item) => [
      item.id || "",
      item.name || "",
      item.description || "",
      item.price || "",
      item.tag || "",
      item.image || "",
      item.filename || "",
      item.file_size || "",
      item.dimensions || "",
      item.created_at || "",
      item.html_code || "",
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `embedder_data_${Date.now()}.csv`);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL object
    URL.revokeObjectURL(url);
  };

  const handleFormSubmit = async (submittedData) => {
    try {
      const formData = new FormData();

      // Append text fields
      formData.append("name", submittedData.name);
      formData.append("description", submittedData.description);
      formData.append("price", submittedData.price);
      formData.append("tag", submittedData.tag);

      // Append image
      if (submittedData?.image) {
        formData.append("image", submittedData.image);
      }

      selectedEmbedder
        ? await updateEmbedder({
            ...formData,
            id: selectedEmbedder?.id,
          }).unwrap()
        : await addEmbedder(formData).unwrap();
    } catch (err) {
      console.error(err);
    }
    setOpenDialog(false);
    setSelectedEmbedder(null);
    form.reset(initialValues);
  };

  const handleFormError = (error) => {
    console.error(error);
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <Button onClick={() => setOpenDialog(!openDialog)}>
          <CloudUpload /> Upload Images
        </Button>
        <Button
          onClick={() => downloadCSV({ exportCSV: "CSV" })}
          isLoading={isFetching}
        >
          <Download /> Export CSV
        </Button>
      </div>

      {openDialog && (
        <DialogCommon
          open={openDialog}
          onOpenChange={(val) => {
            setOpenDialog(val);
            if (!val) {
              setSelectedEmbedder(null);
              form.reset(initialValues);
            }
          }}
          headerTitle={selectedEmbedder ? "Update Image" : "Add Images"}
          className="sm:max-w-3xl"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit, handleFormError)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputCommon
                  control={form.control}
                  name="name"
                  label="Name"
                  placeholder="e.g Morgan Silver Dollar"
                />
                <InputCommon
                  control={form.control}
                  name="price"
                  label="Price"
                  placeholder="e.g 99.99"
                  type="text"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextAreaCommon
                  control={form.control}
                  name="description"
                  label="Description"
                  placeholder="e.g High quality silver coin from 1921..."
                />
                <InputCommon
                  control={form.control}
                  name="tag"
                  label="Tag"
                  placeholder="e.g 10% off, Last one"
                />
              </div>

              <div className="pt-2">
                <FileUploadCommon
                  control={form.control}
                  name="image"
                  title="Upload Image"
                  accept="image/jpeg,image/png,image/jpg"
                  maxFiles={1}
                  maxSize={15}
                  showPreview={true}
                />
              </div>

              <div className="flex items-center justify-between gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setOpenDialog(false);
                    setSelectedEmbedder(null);
                    form.reset(initialValues);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={selectedEmbedder ? isUpdateLoading : isPostLoading}
                >
                  {selectedEmbedder ? "Update Image" : "Upload Image"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogCommon>
      )}
    </div>
  );
};

export default AddUpdateEmbedder;
