import { useContext, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import LoadingRegister from "../Loading-Register/LoadingRegister";
import FieldEmailLogin from "../Field-EmailLogin/FieldEmailLogin";
import FieldPasswordLogin from "../Field-PasswordLogin/FieldPasswordLogin";
import "./SectionDefaultLoginForm.css";
import { authContext } from "../Provider-Auth/AuthContext";

type FormValues = {
  email: string;
  password: string;
};

type LoginWindowProps = {
  setLoginWindowState: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SectionDefaultLoginForm({
  setLoginWindowState,
}: LoginWindowProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useContext(authContext);
  const formMethod = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    setLoading(true);
    login();
    setTimeout(() => {
      setLoading(false);
      setLoginWindowState(false);
    }, 2000);
  };

  return (
    <>
      {loading && <LoadingRegister />}
      <div className="sectionDefaultLoginForm">
        <FormProvider {...formMethod}>
          <form
            className="defaultLoginFormComponent"
            onSubmit={formMethod.handleSubmit(onSubmit)}
          >
            <FieldEmailLogin />
            <FieldPasswordLogin />
            <button className="submitButton" type="submit">
              Login
            </button>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
