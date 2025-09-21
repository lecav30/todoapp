"use client";
import * as Yup from "yup";
import TodoButton from "@components/atoms/TodoButton";
import TodoInput from "@components/atoms/TodoInput";
import { useAuth } from "@context/AuthContext";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { handleRegister, isAuthenticated } = useAuth();
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm password is required"),
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await validationSchema.validate(state, { abortEarly: false });
      setErrors({});
      handleRegister({ email: state.email, password: state.password });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: typeof errors = {};
        err.inner.forEach((error) => {
          if (error.path)
            newErrors[error.path as keyof typeof errors] = error.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const haveErrors = Object.keys(errors).length > 0;

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center gap-4 p-4 h-screen"
    >
      <b className="text-3xl mb-5">Register</b>
      <div
        className="flex flex-col items-center gap-4 border-2 border-gray-400 rounded-lg
        p-8"
      >
        <TodoInput
          type="text"
          placeholder="Email"
          value={state.email}
          onChange={(e) => {
            setState((prev) => {
              const newState = { ...prev };
              newState.email = e.target.value;
              return newState;
            });
            setErrors((prev) => {
              const newErrors = { ...prev };
              delete newErrors.email;
              return newErrors;
            });
          }}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}
        <TodoInput
          type="password"
          placeholder="Password"
          value={state.password}
          onChange={(e) => {
            setState((prev) => {
              const newState = { ...prev };
              newState.password = e.target.value;
              return newState;
            });
            setErrors((prev) => {
              const newErrors = { ...prev };
              delete newErrors.password;
              return newErrors;
            });
          }}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password}</span>
        )}
        <TodoInput
          type="password"
          placeholder="Confirm Password"
          value={state.confirmPassword}
          onChange={(e) => {
            setState((prev) => {
              const newState = { ...prev };
              newState.confirmPassword = e.target.value;
              return newState;
            });
            setErrors((prev) => {
              const newErrors = { ...prev };
              delete newErrors.confirmPassword;
              return newErrors;
            });
          }}
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">{errors.confirmPassword}</span>
        )}
        <p className="text-sm text-gray-200">
          Do you already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
        <TodoButton
          customclass={haveErrors ? "" : "cursor-pointer"}
          type="submit"
          disabled={haveErrors}
        >
          Register
        </TodoButton>
      </div>
    </form>
  );
};

export default Register;
