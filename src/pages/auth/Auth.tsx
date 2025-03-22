import React, { useState } from "react";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import Modal from "../../components/Modal";

import authService from "../../services/authService"; // Import authService

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await authService.login({ email, password });
        // Redirect to dashboard or handle successful login
      } else {
        await authService.register({ fullname, email, password, phone, address });
        // Redirect to login or handle successful registration
      }
    } catch (err) {
      console.error("Login/Registration error:", err); // Log the error for debugging
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <FormInput
              type="text"
              value={fullname}
              label="Full Name"
              onChange={(e) => setFullname(e.target.value)}
              // required
            />
            <FormInput
              type="text"
              value={phone}
              label="Phone"
              onChange={(e) => setPhone(e.target.value)}
              // required
            />
            <FormInput
              type="text"
              value={address}
              label="Address"
              onChange={(e) => setAddress(e.target.value)}
              // required
            />
          </>
        )}
        <FormInput type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <FormInput type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit">{isLogin ? "Login" : "Register"}</Button>
      </form>
      <Button onClick={() => setIsLogin(!isLogin)}>Switch to {isLogin ? "Register" : "Login"}</Button>
    </div>
  );
};

export default Auth;
