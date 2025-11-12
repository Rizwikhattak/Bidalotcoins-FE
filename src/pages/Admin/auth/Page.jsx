import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../../components/auth/AuthScheema";
import { InputCommon } from "../../../components/common/FormCommons";
import AuthLayout from "../../../components/layout/AuthLayout";
import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
import { TypographyMuted } from "../../../components/common/Typography";
import { Label } from "../../../components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../../app/features/auth/authApi";
import { Eye, EyeOff } from "lucide-react";
import { GLOBAL_ROUTES } from "../../../utils/Constants";
const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    username: "",
    password: "",
  };
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: initialValues,
  });

  const handleFormSubmit = async (data) => {
    try {
      await loginUser(data).unwrap();
      navigate(GLOBAL_ROUTES.ADMIN_DASHBOARD);
    } catch (err) {
      console.error(err);
    }
  };
  const handleFormError = (error) => {
    console.error("Form error: ", error);
  };
  return (
    <AuthLayout title="Login" description="Enter email and password">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit, handleFormError)}>
          <InputCommon
            name="username"
            label="Email"
            placeholder="e.g john@example.com"
            control={form.control}
          />
          <InputCommon
            control={form.control}
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            inputType="password"
            iconOnClick={(e) => {
              e.stopPropagation();
              setShowPassword(!showPassword);
            }}
            icon={
              !showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )
            }
          />
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Checkbox id="remember">Remember me</Checkbox>{" "}
              <Label htmlFor="remember">Remember Me</Label>
            </div>
            <TypographyMuted className="text-primary">
              <Link to={GLOBAL_ROUTES.ADMIN_FORGET_PASSWORD_ONE}>
                Forgot Password?
              </Link>
            </TypographyMuted>
          </div>
          <Button type="submit" className="w-full mt-10" isLoading={isLoading}>
            Login
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default AdminLoginPage;
