import { ProfileTypes } from "@/utils/types/profile";
import React, { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import authService from "@/services/authService";
import { toast } from "sonner";
import { useNavigate, useNavigation } from "react-router-dom";

type RegisterProps = {
  setAuthType: Dispatch<SetStateAction<"login" | "register">>;
};

type FormValues = Pick<ProfileTypes, "Fullname" | "email" | "phone" | "address"> & {
  password: string;
};

const Signup = ({ className, setAuthType, ...props }: React.ComponentPropsWithoutRef<"div"> & RegisterProps) => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    register,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await authService.register(data);
      console.log(res);
      navigate("/verify");
      toast("Account created successfully");
    } catch (error) {
      toast("An error occurred. Please try again.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Create a new account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  type="text"
                  {...register("Fullname", {
                    required: "Full name is required",
                  })}
                />
                {errors.Fullname && <p className="text-sm text-red-500">{errors.Fullname.message}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  type="text"
                  {...register("address", {
                    required: "Address is required",
                  })}
                />
                {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
              </div>

              <Button type="submit" className="w-full mt-2 cursor-pointer" disabled={isSubmitting}>
                {isSubmitting ? "Creating account..." : "Sign Up"}
                {isSubmitting && <LoaderCircle className="ml-2 animate-spin" />}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Button
                variant={"link"}
                onClick={() => setAuthType("login")}
                className="underline underline-offset-4 cursor-pointer"
              >
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
