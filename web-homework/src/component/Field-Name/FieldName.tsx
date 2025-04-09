import { useFormContext } from "react-hook-form";
import "./FieldName.css";

type FieldProps = {
  placeholder: string;
};
export default function FieldName({ placeholder }: FieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="fieldName section">
      <label htmlFor="name">
        Display Name
        <span className="infoSymbol" title="Enter your full name">
          ℹ️
        </span>
      </label>
      <input
        id="name"
        className="nameInput"
        type="name"
        placeholder={placeholder}
        defaultValue={placeholder}
        {...register("name", {
          required: "Name is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]/,
            message: "Enter your Name",
          },
        })}
      />
      {errors.name && (
        <div className="errorMessage">{errors.name.message?.toString()}</div>
      )}
    </div>
  );
}
