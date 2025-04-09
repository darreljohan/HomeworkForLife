import "./BackgroundBlur.css";

type BackgroundBlurProps = {
  zIndex: number;
};

export default function BackgroundBlur({ zIndex }: BackgroundBlurProps) {
  return <div className="backgroundBlur" style={{ zIndex: zIndex }}></div>;
}
