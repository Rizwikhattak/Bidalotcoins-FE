import React, { useEffect } from "react";
import DialogCommon from "../common/DialogCommon";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addRoleScheema } from "./UserManagementScheema";
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

const AddUpdateRole = ({
  selectedRole,
  setSelectedRoleData,
  openDialog,
  setOpenDialog,
}) => {
  const { data: permissionsData, isLoading: isPermissionsLoading } =
    useGetPermissionsQuery();
  const [addRole, { isLoading: isPostLoading }] = useAddRoleMutation();
  const [updateRole, { isLoading: isUpdateLoading }] = useUpdateRoleMutation();
  const initialValues = {
    name: "",
    code_name: "",
    description: "",
    permissions: [],
  };
  const form = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(addRoleScheema),
  });

  useEffect(() => {
    if (selectedRole) {
      form.reset({
        name: selectedRole?.name || "",
        code_name: selectedRole?.code_name || "",
        description: selectedRole?.description || "",
        permissions: selectedRole?.permissions?.map((perm) => perm.id) || [],
      });
    } else {
      form.reset(initialValues);
    }
  }, [selectedRole, openDialog]);

  const handleFormSubmit = async (formData) => {
    try {
      selectedRole
        ? await updateRole({ ...formData, id: selectedRole?.id }).unwrap()
        : await addRole(formData).unwrap();
    } catch (err) {
      console.error(err);
    }
    setOpenDialog(false);
    setSelectedRoleData(null);
    form.reset(initialValues);
  };
  const handleFormError = (error) => {
    console.error(error);
  };
  return (
    <div>
      <Button onClick={() => setOpenDialog(!openDialog)}>
        + Create New Role
      </Button>

      {openDialog && (
        <DialogCommon
          open={openDialog}
          onOpenChange={(val) => {
            setOpenDialog(val);
            if (!val) {
              setSelectedRoleData(null);
              form.reset(initialValues);
            }
          }}
          headerTitle="Add Role"
          className="sm:max-w-2xl"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit, handleFormError)}
            >
              <InputCommon
                control={form.control}
                name="name"
                label="Role name"
                placeholder="e.g Admin"
              />
              <InputCommon
                control={form.control}
                name="code_name"
                label="Code name"
                placeholder="e.g super_admin"
              />
              <TextAreaCommon
                control={form.control}
                name="description"
                label="Description"
                placeholder="e.g This role is for admin users"
              />
              <div className="mt-4 space-y-4">
                {permissionsData?.data &&
                Object.keys(permissionsData?.data)?.length > 0 ? (
                  Object.keys(permissionsData?.data)?.map(
                    (permission, index) => (
                      <div key={index}>
                        <p>{permission}</p>
                        <div className="grid md:grid-cols-12 gap-2">
                          {permissionsData?.data?.[permission]?.map((perm) => (
                            <div key={perm?.id} className="col-span-6">
                              <CheckboxCommon
                                control={form.control}
                                fieldName="permissions" // The array field name
                                value={perm?.id} // The permission ID to add/remove
                                label={perm?.name}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <p>No permissions available</p>
                )}
              </div>
              <div className="flex items-center justify-between gap-2 mt-5">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={selectedRole ? isUpdateLoading : isPostLoading}
                >
                  {selectedRole ? "Update Role" : "Create Role"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogCommon>
      )}
    </div>
  );
};

export default AddUpdateRole;
