import type React from "react";

import { useState, useRef, useEffect } from "react";
import { ArrowLeftIcon, LoaderCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MfaVerification() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Set up the countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Focus the first input on component mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take the last character if multiple are pasted
    setOtp(newOtp);

    // Clear any previous errors
    if (error) setError(null);

    // Auto-advance to next input if a digit was entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Go to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle arrow keys for navigation
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.slice(0, 6).split("");
    const newOtp = [...otp];

    digits.forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });

    setOtp(newOtp);

    // Focus the input after the last pasted digit
    const focusIndex = Math.min(digits.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerify = () => {
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsVerifying(true);
    setError(null);

    // Simulate verification process
    setTimeout(() => {
      // For demo purposes, let's say "123456" is the correct OTP
      if (otpString === "123456") {
        // Redirect or show success
        window.location.href = "/verification-success";
      } else {
        setError("Invalid verification code. Please try again.");
        setIsVerifying(false);
      }
    }, 1500);
  };

  const handleResend = () => {
    // Reset OTP fields
    setOtp(Array(6).fill(""));
    // Reset timer
    setTimeLeft(30);
    setCanResend(false);
    // Clear any errors
    setError(null);
    // Focus first input
    inputRefs.current[0]?.focus();

    // Here you would typically call your API to resend the OTP
    console.log("Resending OTP...");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-200 rounded-xl shadow-xl p-8">
          <div className="flex items-center mb-6">
            <Link to="/" className="text-gray-400 hover:text-gray-300 mr-4">
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold ">Verification Code</h1>
          </div>

          <p className="text-gray-500 mb-8">
            We've sent a 6-digit verification code to your email
            <span className="font-medium "> j***@example.com</span>
          </p>

          <div className="flex justify-between mb-8">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`w-12 h-14 text-center text-xl font-bold border-2 ${
                  error ? "border-red-500" : digit ? "border-indigo-500" : "border-gray-600"
                } rounded-lg focus:border-indigo-400 focus:ring-indigo-400 `}
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>

          {error && <div className="mb-4 text-red-400 text-sm font-medium">{error}</div>}

          <Button
            onClick={handleVerify}
            disabled={isVerifying || otp.join("").length !== 6}
            className="w-full bg-indigo-600 hover:bg-indigo-700  py-3 rounded-lg font-medium mb-4 transition-colors cursor-pointer"
          >
            {isVerifying ? (
              <span className="flex items-center justify-center">
                <LoaderCircleIcon className="animate-spin mr-2 h-5 w-5" />
                Verifying...
              </span>
            ) : (
              "Verify"
            )}
          </Button>

          <div className="text-center">
            <p className="text-gray-500 text-sm mb-2">Didn't receive the code?</p>
            {canResend ? (
              <Button
                variant="link"
                onClick={handleResend}
                className="text-indigo-500 hover:text-indigo-300 font-medium cursor-pointer"
              >
                Resend Code
              </Button>
            ) : (
              <p className="text-gray-500 text-sm">
                Resend code in <span className="font-medium text-gray-400">{timeLeft}s</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
