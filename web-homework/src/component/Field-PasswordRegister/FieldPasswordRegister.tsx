import "./FieldPasswordRegister.css";
import { useFormContext } from "react-hook-form";

export default function FieldPasswordSection() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  return (
    <div className="fieldPasswordRegister">
      <div className="passwordSection section">
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
      <div className="repeatPasswordSection section">
        <label htmlFor="password">Repeat Password</label>
        <input
          id="password"
          className="passwordInput"
          type="password"
          placeholder="Repeat Password"
          {...register("repeatPassword", {
            required: "Repeat Password is required",
            validate: (value) =>
              value === watch("password") || "The passwords do not match",
          })}
        />
        {errors.repeatPassword && (
          <div className="errorMessage">
            {errors.repeatPassword.message?.toString()}
          </div>
        )}
      </div>
      <button className="continueButton" type="submit">
        Register
      </button>
    </div>
  );
}
