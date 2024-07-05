import { ChangeEvent, FormEvent, useState } from "react";

interface IFormNewFieldProps<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
}

const useFormNewField = <T extends Record<string, unknown>>({
  initialValues,
  onSubmit,
}: IFormNewFieldProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleInputChange = <K extends keyof T>(
    e: ChangeEvent<HTMLInputElement & { name: K }>
  ) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(values);
  };

  return { values, handleInputChange, handleSubmit };
};

export default useFormNewField;
