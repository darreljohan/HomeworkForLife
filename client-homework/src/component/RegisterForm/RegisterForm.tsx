import { useForm } from "react-hook-form";
import "./RegisterForm.css";
import logo from "../../assets/logo.png";
import { FcGoogle } from "react-icons/fc";
import { pageContext } from "../../context/PageContext";
import { useContext } from "react";
import { authContext } from "../../context/AuthContext";
import { useLoading } from "../../context/LoadingContext";
import { ResponseError } from "../../error/ResponseError";

interface ShortMessageProps {
  slideState: React.Dispatch<React.SetStateAction<string>>;
}

type FormValues = {
  email: string;
  password: string;
  repeatPassword: string;
};

const RegisterForm: React.FC<ShortMessageProps> = ({ slideState }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    watch,
    trigger,
  } = useForm<FormValues>();
  const { setPage } = useContext(pageContext);
  const { registerUser } = useContext(authContext);
  const { setMessage } = useLoading();

  const onSubmit = async (data: FormValues) => {
    try {
      await registerUser(data.email, data.password);
      setPage("Login");
      setMessage("Account created successfully", true);
    } catch (error) {
      if (error instanceof ResponseError) {
        setMessage(error.message, false);
      } else {
        setMessage("Uncaught Error", false);
      }
    }
  };

  return (
    <div className="RegisterForm">
      <button
        className="Exit"
        onClick={() => {
          setPage("Home");
        }}
      >
        X
      </button>
      <div className="RegisterForm-Premise">
        <img className="RegisterForm-Logo" src={logo} alt="logo" />
        <p className="RegisterForm-Title">Create An Account</p>
      </div>
      <form className="RegisterForm-Form" onSubmit={handleSubmit(onSubmit)}>
        <div className="Email Section">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className={
              dirtyFields.email ? (errors.email ? "invalid" : "valid") : ""
            }
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter your email",
              },
              onChange() {
                trigger("email");
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="Password Section">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="off"
            className={
              dirtyFields.password
                ? errors.password
                  ? "invalid"
                  : "valid"
                : ""
            }
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+$/,
                message: "Enter your password",
              },
              onChange() {
                trigger("password");
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="RepeatPassword Section">
          <label htmlFor="repeatPassword">Repeat Password</label>
          <input
            id="repeatPassword"
            className={
              "passwordInput " + dirtyFields.repeatPassword &&
              watch("repeatPassword")
                ? errors.repeatPassword
                  ? "invalid"
                  : "valid"
                : ""
            }
            type="password"
            placeholder="Repeat Password"
            {...register("repeatPassword", {
              required: "Repeat Password is required",
              validate: (value) =>
                value === watch("password") || "The passwords do not match",
              onChange() {
                trigger("repeatPassword");
              },
            })}
          />
          {errors.repeatPassword && (
            <div className="errorMessage">
              {errors.repeatPassword.message?.toString()}
            </div>
          )}
        </div>
        <button className="submit" type="submit">
          Submit
        </button>
      </form>
      <div className="AlternativeForm">
        <div className="DivideLine">Or</div>
        <button className="GoogleButton">
          <FcGoogle className="GoogleIcon" />
          <p>Sign Up with Google</p>
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
