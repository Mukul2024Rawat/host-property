"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import { SetModalProps } from "@/types/userAuthentication";
import { register as registerApi } from "../../api";

const RegisterModal: React.FC<
  SetModalProps & { onSwitchToLogin: () => void }
> = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    apiErrors: {} as Record<string, string>,
  });

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

    const { confirmPassword, ...requestData } = formData;

    try {
      const response = await registerApi(requestData);

      setIsLoading(false);

      if (response.status === 201) {
        onClose();
      } else {
        throw new Error("Registration failed. Please try again.");
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
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    };

    let isValid = true;

    if (!formData.name) {
      newErrors.name = "Name is required.";
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
      isValid = false;
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits.";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must be 8-16 characters long, contain an uppercase letter, a lowercase letter, a digit, and a special character.";
      isValid = false;
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword =
        "Password and confirm password does not match.";
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
      title="Register"
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
          <Heading title="Welcome to Airnb" subtitle="Create an account!" />
          <Input
            id="name"
            label="Name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            error={errors.name || errors.apiErrors.name}
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
            id="phone"
            label="Phone Number"
            type="text"
            value={formData.phone}
            onChange={handleChange}
            required
            error={errors.phone || errors.apiErrors.phone}
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
          <Input
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            error={errors.confirmPassword}
          />
        </div>
      }
      footer={
        <div className="flex flex-col gap-4 mt-3">
          <hr />
          <div className="text-neutral-500 text-center mt-4 font-light">
            <p>
              Already have an account?
              <span
                onClick={onSwitchToLogin}
                className="text-neutral-800 cursor-pointer hover:underline"
              >
                {" "}
                Login
              </span>
            </p>
          </div>
        </div>
      }
    />
  );
};

export default RegisterModal;
