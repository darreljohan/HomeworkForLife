import dayjs from "dayjs";
import { useContext, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import LoadingRegister from "../Loading-Register/LoadingRegister";
import { authContext } from "../Provider-Auth/AuthContext";
import FieldName from "../Field-Name/FieldName";
import FieldBirthDate from "../Field-Birthdate/FieldBirthDate";
import FieldAgeExpentancy from "../Field-AgeExpentancy/FieldAgeExpentancy";
import "./SectionSettingForm.css";

type FormValues = {
  name: string;
  birthDate: dayjs.Dayjs | null;
  ageExpentancy: number;
};

export default function SectionSetting() {
  const [loading, setLoading] = useState<boolean>(false);
  const { user, login } = useContext(authContext);
  const formMethod = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      {loading && <LoadingRegister />}
      <div className="sectionSettingForm">
        <FormProvider {...formMethod}>
          <form
            className="sectionSettingFormComponent"
            onSubmit={formMethod.handleSubmit(onSubmit)}
          >
            <FieldName placeholder={user!.displayName!} />
            <FieldBirthDate placeholder={dayjs(user!.birthDate)} />
            <FieldAgeExpentancy placeholder={user!.ageExpentancy} />
            <button className="submitButton" type="submit">
              Save
            </button>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
