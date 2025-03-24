import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { ProfileTypes, TokenResponse } from "@/utils/types/profile";
import { LoaderCircle } from "lucide-react";
import authService from "@/services/authService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { saveAuthTokens } from "@/utils/constant";
import { useAuth } from "@/context/auth.context";

type LoginProps = {
  setAuthType: Dispatch<SetStateAction<"login" | "register">>;
};

/**
 * Form values for user login.
 *
 * @typedef FormValues
 * @type {object}
 * @property {string} email - User's email address from ProfileTypes
 * @property {string} password - User's password for authentication
 */
type FormValues = Pick<ProfileTypes, "email"> & {
  password: string;
};

export function LoginForm({ className, setAuthType, ...props }: React.ComponentPropsWithoutRef<"div"> & LoginProps) {
  const { setIsAuthenticated } = useAuth();
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    register,
  } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    try {
      const res = (await authService.login(data)) as TokenResponse;
      saveAuthTokens(res);
      navigate("/dashboard");
      setIsAuthenticated(true);
      toast("Login successful");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
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
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a> */}
                </div>
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
              <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
                {isSubmitting && <LoaderCircle className="animate-spin" />}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Button
                variant={"link"}
                onClick={() => setAuthType("register")}
                className="underline underline-offset-4 cursor-pointer"
              >
                Sign up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
