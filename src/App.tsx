import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Profile from "./pages/dashboard/Dashboard";
import Transfer from "./pages/transfer/Transfer";
import TransactionHistory from "./pages/transaction-history/TransactionHistory";
import MfaVerification from "./pages/auth/mfa";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/verify" element={<MfaVerification />} />
        <Route path="/dashboard" element={<Profile />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/transactions" element={<TransactionHistory />} />
      </Routes>
    </Router>
  );
};

export default App;
