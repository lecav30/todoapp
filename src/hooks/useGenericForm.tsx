import { ChangeEvent, FormEvent, useState } from "react";

interface IGenericFormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
}

const useGenericForm = <T extends Record<string, unknown>>({
  initialValues,
  onSubmit,
}: IGenericFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleInputChange = <K extends keyof T>(
    e: ChangeEvent<HTMLInputElement & { name: K }>,
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

export default useGenericForm;
