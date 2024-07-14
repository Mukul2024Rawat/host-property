"use client";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import { SetModalProps } from "@/types/userAuthentication";
import { login as loginApi } from "../../api";

const LoginModal: React.FC<
  SetModalProps & { onSwitchToRegister: () => void }
> = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    apiErrors: {} as Record<string, string>,
  });

  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
    setErrors({
      ...errors,
      [id]: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await loginApi(formData);

      setIsLoading(false);

      if (response.status === 201) {
        const token = response.data.token;
        login(token);
        onClose();
      } else {
        throw new Error("Login failed. Please try again.");
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const apiErrorsArray = error.response.data.message;
        const apiErrors = apiErrorsArray.reduce(
          (
            acc: Record<string, string>,
            err: { property?: string; message: string }
          ) => {
            if (err.property) {
              acc[err.property] = err.message;
            }
            return acc;
          },
          {}
        );

        setErrors({
          ...errors,
          apiErrors,
        });
      } else {
        console.error("An unexpected error occurred:", error);
        setErrors({
          ...errors,
          apiErrors: { general: "An unexpected error occurred." },
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    setErrors({
      ...errors,
      ...newErrors,
    });

    return isValid;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Login"
      actionLabel="Continue"
      onSubmit={handleSubmit}
      disabled={isLoading}
      body={
        <div className="flex flex-col gap-4">
          {errors.apiErrors.general && (
            <div className="text-red-500 text-md text-center">
              {errors.apiErrors.general}
            </div>
          )}
          <Heading
            title="Welcome Back to Airnb"
            subtitle="Login to your account!"
          />
          <Input
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            error={errors.email || errors.apiErrors.email}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            error={errors.password || errors.apiErrors.password}
          />
        </div>
      }
      footer={
        <div className="flex flex-col gap-4 mt-3">
          <hr />
          <div className="text-neutral-500 text-center mt-4 font-light">
            <p>
              Don&apos;t have an account?
              <span
                onClick={onSwitchToRegister}
                className="text-neutral-800 cursor-pointer hover:underline"
              >
                {" "}
                Register
              </span>
            </p>
          </div>
        </div>
      }
    />
  );
};

export default LoginModal;
