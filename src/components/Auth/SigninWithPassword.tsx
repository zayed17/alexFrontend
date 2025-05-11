"use client";

import React, { useState, ChangeEvent, FocusEvent, FormEvent } from "react";
import Link from "next/link";
import { setCookie } from "cookies-next";
import toast from "react-hot-toast";
import { Checkbox } from "../FormElements/checkbox";
import { z } from "zod";

// Define the validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;
type ErrorState = Partial<Record<keyof LoginFormData, string>>;

export default function SigninWithPassword() {
  const [data, setData] = useState<LoginFormData>({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorState>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | { target: { name: string; type: string; value?: string; checked?: boolean } }
  ) => {
    const { name, type, value = "", checked = false } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setData(prev => ({
      ...prev,
      [name]: newValue,
    }));

    if (errors[name as keyof LoginFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateField = (name: keyof LoginFormData, value: any): string => {
    try {
      const fieldSchema = z.object({ [name]: loginSchema.shape[name] });
      fieldSchema.parse({ [name]: value });
      return "";
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors.find(err => err.path[0] === name);
        return fieldError ? fieldError.message : "";
      }
      return "";
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const errorMessage = validateField(name as keyof LoginFormData, value);

    if (errorMessage) {
      setErrors(prev => ({
        ...prev,
        [name]: errorMessage,
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      loginSchema.parse(data);

      setLoading(true);
      setErrors({});

      try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (
          data.email === process.env.NEXT_PUBLIC_DEMO_USER_MAIL &&
          data.password === process.env.NEXT_PUBLIC_DEMO_USER_PASS
        ) {
          setCookie("admin-auth", "true", {
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60,
          });

          window.location.href = "/admin";
        } else {
          toast.error("Invalid credentials");
          setLoading(false);
        }
      } catch (error) {
        console.error("Login error", error);
        toast.error("Something went wrong");
        setLoading(false);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: ErrorState = {};
        error.errors.forEach(err => {
          const key = err.path[0] as keyof LoginFormData;
          newErrors[key] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Input */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email Address
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <svg
              className={`h-5 w-5 ${errors.email ? "text-red-500" : "text-gold-500"}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <input
            id="email"
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`focus:ring-gold-500 focus:border-gold-500 block w-full rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"
              } bg-white py-4 pl-12 pr-4 transition-all focus:outline-none focus:ring-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
            placeholder="Enter your email"
            disabled={loading}
          />
        </div>
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Password
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <svg
              className={`h-5 w-5 ${errors.password ? "text-red-500" : "text-gold-500"}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={data.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`focus:ring-gold-500 focus:border-gold-500 block w-full rounded-lg border ${errors.password ? "border-red-500" : "border-gray-300"
              } bg-white py-4 pl-12 pr-12 transition-all focus:outline-none focus:ring-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
            placeholder="Enter your password"
            disabled={loading}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                  clipRule="evenodd"
                />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Checkbox
            label="Remember me"
            name="remember"
            withIcon="check"
            minimal
            radius="md"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleChange({
                target: {
                  name: "remember",
                  type: "checkbox",
                  checked: e.target.checked,
                },
              });
            }}
          />
        </div>
        <Link
          href="/auth/forgot-password"
          className={`text-gold-600 hover:text-gold-500 dark:text-gold-400 dark:hover:text-gold-300 text-sm font-medium ${loading ? "pointer-events-none opacity-50" : ""
            }`}
        >
          Forgot Password?
        </Link>
      </div>

      {/* Sign In Button */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className={`from-gold-600 to-gold-500 hover:from-gold-700 hover:to-gold-600 focus:ring-gold-500 flex w-full items-center justify-center rounded-lg border border-transparent bg-gradient-to-r px-4 py-4 text-sm font-medium text-white shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${loading ? "cursor-not-allowed opacity-75" : ""
            }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="mr-3 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Signing In...</span>
            </div>
          ) : (
            "Sign In to Dashboard"
          )}
        </button>
      </div>

      {/* Support Contact */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Need assistance? Contact support at
          <a
            href="mailto:leadrives@gmail.com"
            className="text-gold-600 hover:text-gold-500 dark:text-gold-400 ml-1"
          >
            leadrives@gmail.com
          </a>
        </p>
      </div>
    </form>
  );
}