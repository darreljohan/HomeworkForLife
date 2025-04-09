import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Controller, useFormContext } from "react-hook-form";

type FieldProps = {
  placeholder: dayjs.Dayjs;
};

export default function FieldBirthDate({ placeholder }: FieldProps) {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <div className="birthDate section">
      <label htmlFor="birthDate">
        Birth Date
        <span className="infoSymbol" title="Select your birth date">
          ℹ️
        </span>
      </label>
      <Controller
        name="birthdate"
        control={control}
        defaultValue={placeholder} // Default value for the date picker
        rules={{ required: "Date is required" }}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={field.value}
              onChange={(date) => field.onChange(date)}
              format="DD/MM/YYYY"
              sx={{
                backgroundColor: `#f4f4f4`,
                fontFamily: `Segoe UI`,
                "& .MuiInputBase-root": {
                  fontSize: "0.8rem", // Adjust font size
                },
              }}
            />
          </LocalizationProvider>
        )}
      />
      {errors.birthdate && <p>{errors.birthDate?.message?.toString()}</p>}
    </div>
  );
}
