import { useFormContext } from "react-hook-form";

export default function FieldPasswordLogin() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="fieldPasswordLogin section">
      <label htmlFor="password">Password</label>
      <input
        id="password"
        className="passwordInput"
        type="password"
        placeholder="Password"
        {...register("password", {
          required: "Password is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+$/,
            message: "Enter your email",
          },
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        })}
      />
      {errors.password && (
        <div className="errorMessage">
          {errors.password.message?.toString()}
        </div>
      )}
    </div>
  );
}
