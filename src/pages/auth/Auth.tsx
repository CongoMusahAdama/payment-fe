import React, { useState } from "react";

import { LoginForm } from "@/components/auth/login";
import Signup from "@/components/auth/signup";

const Auth = () => {
  const [authType, setAuthType] = useState<"login" | "register">("login");

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {authType === "register" ? <Signup setAuthType={setAuthType} /> : <LoginForm setAuthType={setAuthType} />}
      </div>
    </div>
  );
};

export default Auth;
