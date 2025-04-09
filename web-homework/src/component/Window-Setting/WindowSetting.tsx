import BackgroundBlur from "../Background-Blur/BackgroundBlur";
import SectionSetting from "../Section-SettingForm/SectionSettingForm";
import "./WindowSetting.css";

type SettingWindowProps = {
  setSettingWindowState: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function WindowSetting({
  setSettingWindowState,
}: SettingWindowProps) {
  return (
    <>
      <BackgroundBlur zIndex={1009} />
      <div className="windowSetting">
        <div
          className="exitWindowSetting"
          onClick={() => setSettingWindowState(false)}
        >
          X
        </div>
        <div className="settingPremise">Settings</div>
        <div className="settingSubPremise">
          Set up your data to match your preference!
        </div>
        <SectionSetting />
      </div>
    </>
  );
}
