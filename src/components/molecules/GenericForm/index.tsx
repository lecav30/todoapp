import TodoButton from "@components/atoms/TodoButton";
import TodoInput from "@components/atoms/TodoInput";
import useGenericForm from "@hooks/useGenericForm";
import { FC } from "react";

interface FormField {
  name: string;
  placeholder?: string;
  type: string;
  required?: boolean;
}

interface GenericFormProps<T> {
  setIsOpen: (isOpen: boolean) => void;
  onSubmit: (values: Record<string, unknown> & T) => void;
  initialValues: Record<string, unknown> & T;
  fields: FormField[];
  submitButtonText: string;
}

const GenericForm: FC<GenericFormProps<Record<string, unknown>>> = ({
  setIsOpen,
  onSubmit,
  initialValues,
  fields,
  submitButtonText,
}) => {
  const { values, handleInputChange, handleSubmit } = useGenericForm({
    initialValues,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form
      className="flex flex-col space-y-6"
      onSubmit={(e) => {
        handleSubmit(e);
        setIsOpen(false);
      }}
    >
      {fields.map((field) => (
        <TodoInput
          key={field.name}
          type={field.type}
          name={field.name}
          required={field.required}
          placeholder={field.placeholder}
          value={values[field.name] as string}
          onChange={handleInputChange}
        />
      ))}
      <TodoButton type="submit" customclass="mx-auto cursor-pointer">
        {submitButtonText}
      </TodoButton>
    </form>
  );
};

export default GenericForm;
