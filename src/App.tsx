import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Profile from "./pages/dashboard/Dashboard";
import Transfer from "./pages/transfer/Transfer";
import MfaVerification from "./pages/auth/mfa";
import ProtectedRoute from "./components/protected";
import PaymentSuccess from "./pages/payment-successful";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/verify" element={<MfaVerification />} />
        <Route path="/dashboard" element={<ProtectedRoute children={<Profile />} />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
    </Router>
  );
};

export default App;
