import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "./AuthScheema";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import AuthLayout from "../layout/AuthLayout";
import { InputCommon } from "../common/FormCommons";
import { GLOBAL_ROUTES } from "../../utils/Constants";
import { TypographyMuted } from "../common/Typography";
import { useSendForgetPasswordLinkMutation } from "../../app/features/auth/authApi";
import { forgetPasswordLinkSchema } from "./AuthScheema";
const ForgetPasswordPage1 = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [sendForgetPasswordLink, { isLoading }] =
    useSendForgetPasswordLinkMutation();
  const initialValues = {
    email: "",
  };
  const form = useForm({
    resolver: zodResolver(forgetPasswordLinkSchema),
    defaultValues: initialValues,
  });

  const handleFormSubmit = async (data) => {
    try {
      await sendForgetPasswordLink(data).unwrap();
      // navigate(GLOBAL_ROUTES.ADMIN_DASHBOARD);
    } catch (err) {
      console.error(err);
    }
  };
  const handleFormError = (error) => {
    console.error("Form error: ", error);
  };
  return (
    <AuthLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit, handleFormError)}>
          <InputCommon
            name="email"
            label="Email"
            placeholder="e.g john@example.com"
            control={form.control}
          />
          <div className="space-y-4 flex flex-col justify-center items-center">
            <Button
              type="submit"
              className="w-full mt-10"
              isLoading={isLoading}
            >
              Send Reset Link
            </Button>
            <TypographyMuted className="text-primary">
              <Link to={GLOBAL_ROUTES.ADMIN_LOGIN} className="underline">
                Back to Login
              </Link>
            </TypographyMuted>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default ForgetPasswordPage1;
