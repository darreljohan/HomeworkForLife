import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/logo.png";
import "./LoginForm.css";
import { FcGoogle } from "react-icons/fc";
import { pageContext } from "../../context/PageContext";
import { authContext } from "../../context/AuthContext";
import { ResponseError } from "../../error/ResponseError";
import { useLoading } from "../../context/LoadingContext";

type FormValues = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormValues>();
  const { login } = useContext(authContext);
  const { setPage } = useContext(pageContext);
  const { setMessage } = useLoading();

  const onSubmit = async (data: FormValues) => {
    try {
      await login(data.email, data.password);
      setPage("Home");
    } catch (e) {
      if (e instanceof ResponseError) {
        setMessage(e.message, false);
      } else {
        setMessage("Uncaught Error", false);
      }
    }
  };

  return (
    <div className="LoginForm">
      <button
        className="Exit"
        onClick={() => {
          setPage("Home");
        }}
      >
        X
      </button>
      <div className="LoginForm-Premise">
        <img className="LoginForm-Logo" src={logo} alt="logo" />
        <p className="LoginForm-Title">
          Sign in to <br />
          Homework of Life
        </p>
      </div>
      <form className="LoginForm-Form" onSubmit={handleSubmit(onSubmit)}>
        <div className="Email Section">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
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
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              onChange() {
                trigger("password");
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button className="SubmitButton" type="submit">
          Login
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

export default LoginForm;
