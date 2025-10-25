import React, { useEffect, useState } from "react";
import DialogCommon from "../common/DialogCommon";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addRoleScheema, addUserScheema } from "./UserManagementScheema";
import { toast } from "sonner";
import {
  InputCommon,
  SelectCommon,
  TextAreaCommon,
} from "../common/FormCommons";
import { useGetRolesQuery } from "../../app/features/roles/rolesApi";
import {
  useAddUserMutation,
  useUpdateUserMutation,
} from "../../app/features/users/usersApi";

const AddUpdateUser = ({
  selectedUser,
  setSelectedUser,
  openDialog,
  setOpenDialog,
}) => {
  console.log("selectedUser", selectedUser);
  const { data, isLoading: isRolesLoading } = useGetRolesQuery();
  const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserMutation();
  const [
    addUser,
    {
      // data: addUserData,
      isLoading: isPostLoading,
      // isSuccess,
      // isError,
      // error: isPostError,
      // reset,
    },
  ] = useAddUserMutation();
  const initialValues = {
    first_name: "",
    last_name: "",
    username: "",
    mobile: "",
    role: "",
  };
  const form = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(addUserScheema),
  });

  useEffect(() => {
    if (selectedUser) {
      form.reset({
        first_name: selectedUser?.first_name || "",
        last_name: selectedUser?.last_name || "",
        username: selectedUser?.email || "",
        mobile: selectedUser?.mobile || "",
        role: String(selectedUser?.role?.id) || "",
      });
    } else {
      form.reset(initialValues);
    }
  }, [selectedUser, openDialog]);

  const handleFormSubmit = async (formData) => {
    try {
      selectedUser
        ? await updateUser({
            ...formData,
            id: selectedUser?.id,
            role: Number(formData.role),
          }).unwrap()
        : await addUser({ ...formData, role: Number(formData.role) }).unwrap();
    } catch (err) {
      console.error(err);
    }
    form.reset();
    setOpenDialog(false);
    setSelectedUser(null);
  };
  const handleFormError = (error) => {
    // toast.error(error);
    console.error(error);
  };
  return (
    <div>
      <Button onClick={() => setOpenDialog(!openDialog)}>+ Invite User</Button>

      {openDialog && (
        <DialogCommon
          open={openDialog}
          onOpenChange={(val) => {
            setOpenDialog(val);
            if (!val) {
              setSelectedUser(null);
              form.reset(initialValues);
            }
          }}
          headerTitle="Invite User"
          className="sm:max-w-xl"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit, handleFormError)}
            >
              <InputCommon
                control={form.control}
                name="first_name"
                label="First Name"
                placeholder="e.g Mark"
              />
              <InputCommon
                control={form.control}
                name="last_name"
                label="Last Name"
                placeholder="e.g Zuckerberg"
              />
              <InputCommon
                control={form.control}
                name="username"
                label="Email"
                placeholder="e.g mark@abc.com"
              />
              <InputCommon
                control={form.control}
                name="mobile"
                label="Phone (Optional)"
                placeholder="e.g +123456789"
              />
              <SelectCommon
                control={form.control}
                name="role"
                label="Role"
                placeholder="Select Role"
                items={data?.data ? data.data : []}
                className="w-full"
              />
              <div className="flex items-center justify-between pt-4">
                <Button type="button" variant="outline" size="lg">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  isLoading={selectedUser ? isUpdateLoading : isPostLoading}
                >
                  {selectedUser ? "Update" : "Invite"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogCommon>
      )}
    </div>
  );
};

export default AddUpdateUser;
