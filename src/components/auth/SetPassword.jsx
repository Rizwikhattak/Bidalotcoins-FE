import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { loginSchema, setPasswordScheema } from "./AuthScheema";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import AuthLayout from "../layout/AuthLayout";
import { CheckboxCommon, InputCommon } from "../common/FormCommons";
import { GLOBAL_ROUTES } from "../../utils/Constants";
import { TypographyMuted } from "../common/Typography";
import {
  useActivateAccountMutation,
  useSendForgetPasswordLinkMutation,
  useSetPasswordMutation,
} from "../../app/features/auth/authApi";
import { forgetPasswordLinkSchema } from "./AuthScheema";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
const SetPassword = () => {
  const location = useLocation();
  const { isActivateAccount = false, token = "" } = location.state || {};
  const navigate = useNavigate();
  const [setPassword, { isLoading: isSetPasswordLoading }] =
    useSetPasswordMutation();
  const [activateAccount, { isLoading: isActivateAccountLoading }] =
    useActivateAccountMutation();

  const initialValues = {
    new_password: "",
    confirm_password: "",
    terms_conditions: false,
  };
  const form = useForm({
    resolver: zodResolver(setPasswordScheema),
    defaultValues: initialValues,
  });
  const termsAccepted = form.watch("terms_conditions");
  const handleFormSubmit = async (data) => {
    try {
      delete data?.terms_conditions;
      isActivateAccount
        ? await activateAccount({ ...data, token }).unwrap()
        : await setPassword({ ...data, token }).unwrap();
      isActivateAccount
        ? navigate(GLOBAL_ROUTES.ADMIN_LOGIN)
        : navigate(GLOBAL_ROUTES.ADMIN_LOGIN);
      // await sendForgetPasswordLink(data).unwrap();
      // navigate(GLOBAL_ROUTES.ADMIN_DASHBOARD);
    } catch (err) {
      console.error(err);
    }
  };
  const handleFormError = (error) => {
    console.error("Form error: ", error);
  };
  return (
    <AuthLayout
      title={isActivateAccount ? "Account Activation" : "Reset Your Password"}
      description={
        isActivateAccount
          ? "Set password to activate your account."
          : "Please enter your new password below."
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit, handleFormError)}>
          <InputCommon
            name="new_password"
            label="Password"
            placeholder="Enter Your Password"
            control={form.control}
            inputType="password"
          />
          <InputCommon
            name="confirm_password"
            label="Confirm Password"
            placeholder="Confirm Password"
            control={form.control}
            inputType="password"
          />
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
                  I agree to terms and conditions
                </Label>
              </div>
            )}
          />

          {console.log("form.getValues", form.getValues("terms_conditions"))}
          <div className="space-y-4 flex flex-col justify-center items-center">
            <Button
              type="submit"
              className="w-full mt-10"
              isLoading={
                isActivateAccount
                  ? isActivateAccountLoading
                  : isSetPasswordLoading
              }
              disabled={!termsAccepted}
            >
              {isActivateAccount ? "Activate Account" : "Reset Password"}
            </Button>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default SetPassword;
