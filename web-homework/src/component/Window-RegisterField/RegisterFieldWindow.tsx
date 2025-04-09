import "./RegisterFieldWindow.css";
import { useForm, Controller } from "react-hook-form";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

type RegisterFieldProps = {
  setRegisterFieldState: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormValues = {
  name: string;
  email: string;
  password: string;
  birthdate: dayjs.Dayjs | null;
  expecteddate: dayjs.Dayjs | null;
};

function RegisterFieldWindow({ setRegisterFieldState }: RegisterFieldProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  return (
    <>
      <div className="blurBackground"></div>
      <div className="registerFieldWindow">
        <button
          className="closeButton"
          onClick={() => {
            setRegisterFieldState(false);
          }}
        >
          X
        </button>
        <form className="registerForm" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="titlePane">Registering to Homework for </h1>
          <div className="nameSection section">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="name"
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+\- ]+$/,
                  message: "Name only can consist alphanumberic",
                },
              })}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div className="emailSection section">
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
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="birthDate section">
            <label htmlFor="birthDate">Birth Date</label>
            <Controller
              name="birthdate"
              control={control}
              defaultValue={dayjs()} // Default value for the date picker
              rules={{ required: "Date is required" }}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
                    format="DD/MM/YYYY"
                    sx={{
                      backgroundColor: `#f4f4f4`,
                      fontFamily: `Verdana`,
                      "& .MuiInputBase-root": {
                        fontSize: "0.8rem", // Adjust font size
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />
            {errors.birthdate && <p>{errors.birthdate.message}</p>}
          </div>
          <div className="expectedDate section">
            <label htmlFor="expectedDate">Expected Date</label>
            <Controller
              name="expecteddate"
              control={control}
              defaultValue={dayjs()} // Default value for the date picker
              rules={{ required: "Date is required" }}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="datePicker"
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
                    format="DD/MM/YYYY"
                    sx={{
                      backgroundColor: `#f4f4f4`,
                      fontFamily: `Verdana`,
                      "& .MuiInputBase-root": {
                        fontSize: "0.8rem", // Adjust font size
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />
          </div>
          <div className="password section">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="off"
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
              })}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <button className="submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default RegisterFieldWindow;
