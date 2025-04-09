import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import dayjs from "dayjs";
import Logo from "../../assets/dark-logo.png";
import SectionOauth from "../Section-Oauth/SectionOauth";
import "./SectionRegisterForm.css";
import FieldEmailRegister from "../Field-EmailRegister/FieldEmailRegister";
import FieldPasswordSection from "../Field-PasswordRegister/FieldPasswordRegister";
import LoadingRegister from "../Loading-Register/LoadingRegister";

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

export default function SectionRegisterForm({
  setRegisterFieldState,
}: RegisterFieldProps) {
  const [formFlow, setFormFlow] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const formMethod = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    switch (formFlow) {
      case 1:
        setFormFlow(2);
        break;
      case 2:
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        break;
    }
  };

  const renderFormSection = (): React.ReactNode => {
    switch (formFlow) {
      case 1:
        return <FieldEmailRegister />;
      case 2:
        return <FieldPasswordSection />;
    }
  };

  return (
    <>
      {loading && <LoadingRegister />}
      <div className="registerField">
        <div className="registerFieldLogo">
          <img className="registerFieldImg" src={Logo} alt="Logo" />
          <div className="registerFieldLogoTitle">Homework For Life</div>
          <div
            className="registerFieldExit"
            onClick={() => {
              setRegisterFieldState(false);
            }}
          >
            X
          </div>
        </div>
        <div className="registerFieldForm">
          <FormProvider {...formMethod}>
            <form
              className="registerFieldFormComponent"
              onSubmit={formMethod.handleSubmit(onSubmit)}
            >
              <div className="registerFieldFormPremise">
                <div className="title">
                  Let's Begin Your Life Changing Habit!
                </div>
                <div className="sectionChooser">
                  Fill in your details to begin
                </div>
              </div>
              {renderFormSection()}
            </form>
          </FormProvider>
          <div className="alternativeSignup">
            <div className="borderAlternative">Or Login with</div>
            <SectionOauth />
          </div>
        </div>
      </div>
    </>
  );
}
