"use client";
import * as Yup from "yup";
import TodoButton from "@components/atoms/TodoButton";
import TodoInput from "@components/atoms/TodoInput";
import { useAuth } from "@context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const validationSchema = Yup.object({
    email: Yup.string().email("Email inválido").required("Email es requerido"),
    password: Yup.string()
      .min(6, "Mínimo 6 caracteres")
      .required("Contraseña es requerida"),
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await validationSchema.validate(
        { email, password },
        { abortEarly: false },
      );
      setErrors({});
      handleLogin({ email, password });
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
      <b className="text-3xl mb-5">Login</b>
      <div
        className="flex flex-col items-center gap-4 border-2 border-gray-400 rounded-lg
        p-8"
      >
        <TodoInput
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
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
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
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
        <TodoButton
          customclass={haveErrors ? "" : "cursor-pointer"}
          type="submit"
          disabled={haveErrors}
        >
          Login
        </TodoButton>
      </div>
    </form>
  );
};

export default Login;
