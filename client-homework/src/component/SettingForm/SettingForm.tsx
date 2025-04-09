import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { pageContext } from "../../context/PageContext";
import dayjs, { Dayjs } from "dayjs";
import { authContext } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./SettingForm.css";

type FormValues = {
  displayName: string;
  birthDate: Dayjs;
  ageExpentancy: number;
};

const SettingForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    control,
  } = useForm<FormValues>();
  const { user } = useContext(authContext);
  const { setPage } = useContext(pageContext);
  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="SettingForm">
      <button
        className="Exit"
        onClick={() => {
          setPage("Home");
        }}
      >
        X
      </button>
      <div className="SettingForm-Premise">
        <img className="SettingForm-Logo" src={logo} alt="logo" />
        <p className="SettingForm-Title">Settings</p>
        <p className="SettingForm-Subtitle">Setting your death reminder here</p>
      </div>
      <form className="SettingForm-Form" onSubmit={handleSubmit(onSubmit)}>
        <div className="DisplayName Section">
          <label htmlFor="displayName">Display Name</label>
          <input
            id="displayName"
            type="name"
            {...register("displayName", {
              required: "Display Name is required",
              pattern: {
                value: /^[a-zA-Z0-9 _\-.,@!?()]+$/,
                message: "Display Name should have minimum 1 character",
              },
              onChange() {
                trigger("displayName");
              },
            })}
          />
          {errors.displayName && <p>{errors.displayName.message}</p>}
        </div>
        <div className="BirthDate SectionSpec">
          <label htmlFor="birthDate">Birth Date</label>
          <Controller
            name="birthDate"
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
                    borderRadius: "0.5rem",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderSize: "2px", // Set border size
                        borderColor: "#3a3937", // Set border color
                      },
                      "&:hover fieldset": {
                        borderSize: "2px",
                        borderColor: "#3a3937", // Set border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderSize: "2px",
                        borderColor: "#3a3937", // Set border color when focused
                      },
                    },
                    "& .MuiInputBase-root": {
                      fontSize: "0.8rem", // Adjust font size
                      color: "rgba(255, 255, 255, 0.87);",
                    },
                    "& .MuiSvgIcon-root": {
                      color: "rgba(255, 255, 255, 0.87);",
                    },
                  }}
                  slotProps={{
                    day: {
                      sx: {
                        "&.Mui-selected": {
                          backgroundColor: "var(--success-color) !important", // Correct selector for selected day
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "var(--success-color) !important", // Hover color for selected day
                        },
                        "&.Mui-selected:focus": {
                          backgroundColor: "var(--success-color) !important", // Focus color for selected day
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />
          {errors.birthDate && <p>{errors.birthDate?.message?.toString()}</p>}
        </div>
        <div className="AgeExpenctacy Section">
          <label htmlFor="ageExpentancy">Age Expentancy</label>
          <input
            id="ageExpentancy"
            type="number"
            autoComplete="off"
            {...register("ageExpentancy", {
              required: "Password is required",
              minLength: {
                value: 1,
                message: "Age Expentancy must be at least 8 characters",
              },
              pattern: {
                value: /^[1-9][0-9]*$/,
                message: "Age Expentancy  must be at counting number",
              },
              onChange() {
                trigger("ageExpentancy");
              },
            })}
          />
          {errors.ageExpentancy && <p>{errors.ageExpentancy.message}</p>}
        </div>
        <button className="SubmitButton" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default SettingForm;
