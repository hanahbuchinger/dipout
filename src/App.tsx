import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import CaptureNoShow from "./pages/CaptureNoShow";
import CustomerLookup from "./pages/CustomerLookup";
import CustomerDetails from "./pages/CustomerDetails";
import Settings from "./pages/Settings";
import SubscriptionPage from "./pages/SubscriptionPage";
import PaymentPage from "./pages/PaymentPage";
import PricingPage from "./pages/PricingPage";
import SignupPage from "./pages/SignupPage";
import LandingPage from "./pages/LandingPage";
import PaywallWrapper from "./components/PaywallWrapper";
import { NoShowProvider } from "./context/NoShowContext";

function App() {
  return (
    <NoShowProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <PaywallWrapper>
                  <Dashboard />
                </PaywallWrapper>
              }
            />
            <Route
              path="capture"
              element={
                <PaywallWrapper>
                  <CaptureNoShow />
                </PaywallWrapper>
              }
            />
            <Route
              path="lookup"
              element={
                <PaywallWrapper>
                  <CustomerLookup />
                </PaywallWrapper>
              }
            />
            <Route
              path="customer/:phoneNumber"
              element={
                <PaywallWrapper>
                  <CustomerDetails />
                </PaywallWrapper>
              }
            />
            <Route path="settings" element={<Settings />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="settings/billing" element={<SubscriptionPage />} />
            <Route path="settings/payment" element={<PaymentPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </NoShowProvider>
  );
}

export default App;
