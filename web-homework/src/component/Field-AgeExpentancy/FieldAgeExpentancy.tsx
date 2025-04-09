import { useFormContext } from "react-hook-form";

type fieldProps = {
  placeholder: number;
};
export default function FieldAgeExpentancy({ placeholder }: fieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="fieldAgeExpentacy section">
      <label htmlFor="ageExpentancy">
        Age Expentancy
        <span
          className="infoSymbol"
          title="Enter your age expentancy as a number"
        >
          ℹ️
        </span>
      </label>
      <input
        id="ageExpentancy"
        className="ageExpentancyInput"
        type="number"
        placeholder={placeholder.toString()}
        defaultValue={placeholder}
        {...register("ageExpentancy", {
          valueAsNumber: true,
          required: "name is required",
          validate: (value) =>
            value >= 0 || "Age expentancy must be a positive number",
        })}
      />
      {errors.name && (
        <div className="errorMessage">
          {errors.ageExpentancy?.message?.toString()}
        </div>
      )}
    </div>
  );
}
