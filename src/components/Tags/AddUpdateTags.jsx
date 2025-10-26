import React, { useEffect, useState } from "react";
import DialogCommon from "../common/DialogCommon";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckboxCommon,
  CheckboxGroupCardsCommon,
  InputCommon,
  TextAreaCommon,
} from "../common/FormCommons";
import {
  useAddRoleMutation,
  useGetPermissionsQuery,
  useUpdateRoleMutation,
} from "../../app/features/roles/rolesApi";
import { addTagSchema } from "./TagsSchema";
import { TypographyMuted } from "../common/Typography";
import {
  useAddTagMutation,
  useUpdateTagMutation,
} from "../../app/features/tags/tagsApi";
import { APP_CONSTANTS } from "../../utils/Constants";

const AddUpdateTags = ({
  selectedTag,
  setSelectedTag,
  openDialog,
  setOpenDialog,
}) => {
  const [addTag, { isLoading: isPostLoading }] = useAddTagMutation();
  const [updateTag, { isLoading: isUpdateLoading }] = useUpdateTagMutation();
  const initialValues = {
    name: "",
    color_code: "",
  };
  const form = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(addTagSchema),
  });

  useEffect(() => {
    if (selectedTag) {
      form.reset({
        name: selectedTag?.name || "",
        color_code: selectedTag?.color_code || "",
      });
    } else {
      form.reset(initialValues);
    }
  }, [selectedTag, openDialog]);

  const handleFormSubmit = async (formData) => {
    try {
      selectedTag
        ? await updateTag({
            ...formData,
            id: selectedTag?.id,
            color: "constant",
            status: APP_CONSTANTS.ACTIVE_STATUS,
          }).unwrap()
        : await addTag({
            ...formData,
            color: "constant",
            status: APP_CONSTANTS.ACTIVE_STATUS,
          }).unwrap();
    } catch (err) {
      console.error(err);
    }
    setOpenDialog(false);
    setSelectedTag(null);
    form.reset(initialValues);
  };
  const handleFormError = (error) => {
    console.error(error);
  };
  const fixedColorSet = [
    { backgroundColor: "#FDE047", borderColor: "#F59E0B" },
    { backgroundColor: "#F3F4F6", borderColor: "#D1D5DB" },
    { backgroundColor: "#DBEAFE", borderColor: "#93C5FD" },
    { backgroundColor: "#FEE2E2", borderColor: "#FCA5A5" },
  ];
  return (
    <div>
      <Button onClick={() => setOpenDialog(!openDialog)}>+ Add New Tag</Button>

      {openDialog && (
        <DialogCommon
          open={openDialog}
          onOpenChange={(val) => {
            setOpenDialog(val);
            if (!val) {
              setSelectedTag(null);
              form.reset(initialValues);
            }
          }}
          headerTitle="Add Role"
          className="sm:max-w-xl"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit, handleFormError)}
            >
              <InputCommon
                control={form.control}
                name="name"
                label="Tag Name"
                placeholder="e.g Super Sale"
              />
              <div className="flex items-center gap-2 justify-between">
                <div className="grid grid-cols-6  md:grid-cols-12 gap-2">
                  {fixedColorSet.map((item, index) => (
                    <Button
                      key={index}
                      type="button"
                      variant="ghost"
                      className={`col-span-3  rounded-full border-1 w-9 h-9
                      hover:bg-[${item.backgroundColor}]  ${
                        form.getValues("color_code") === item.backgroundColor
                          ? `ring-2 ring-offset-1 ring-[${item.backgroundColor}]`
                          : ""
                      } `}
                      onClick={() => {
                        form.setValue("color_code", item.backgroundColor);
                      }}
                      style={{
                        backgroundColor: item.backgroundColor,
                        borderColor: item.borderColor,
                      }}
                    ></Button>
                  ))}
                </div>
                <InputCommon
                  control={form.control}
                  name="color_code"
                  label="Custom:"
                  placeholder="e.g #FF12"
                />
              </div>
              <div className="space-y-2">
                <TypographyMuted>Preview:</TypographyMuted>
                <p
                  className="w-fit p-1 px-2 rounded-2xl text-sm"
                  style={{ backgroundColor: form.getValues("color_code") }}
                >
                  {form.getValues("name") || "Tag name"}
                </p>
              </div>

              <div className="flex items-center justify-between gap-2 mt-5">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={selectedTag ? isUpdateLoading : isPostLoading}
                >
                  {selectedTag ? "Update Tag" : "Save Tag"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogCommon>
      )}
    </div>
  );
};

export default AddUpdateTags;
