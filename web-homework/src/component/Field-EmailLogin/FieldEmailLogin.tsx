import { useFormContext } from "react-hook-form";
import "./FieldEmailLogin.css";

export default function FieldEmailLogin() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="fieldEmailLogin section">
      <label htmlFor="email">Email</label>
      <input
        id="email"
        className="emailInput"
        type="email"
        placeholder="Email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Enter your email",
          },
        })}
      />
      {errors.email && (
        <div className="errorMessage">{errors.email.message?.toString()}</div>
      )}
    </div>
  );
}
