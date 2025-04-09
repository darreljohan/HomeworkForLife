import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import BackgroundBlur from "../Background-Blur/BackgroundBlur";
import "./WindowJournalShowcase.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CardStory from "../Card-Story/CardStory";

export default function WindowJournalShowcase() {
  return (
    <>
      <BackgroundBlur zIndex={1009} />

      <div className="windowJournalShowcase">
        <div className="exitWindowJournalShowcase" onClick={() => {}}>
          X
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            sx={{
              margin: 0,
              "& .MuiPickersDay-root": {
                color: "var(--foreground-color)",
                backgorunColor: "var(--success-color)",
              },
              "& .MuiDayCalendar-weekDayLabel": {
                color: "var(--foreground-color)",
              },
              "& .MuiPickersArrowSwitcher-root .MuiIconButton-root": {
                color: "white", // Color for left and right arrows
              },
              "& .MuiPickersDay-root.Mui-selected": {
                border: "2px solid var(--success-color)", // Green circle border for selected day
                borderRadius: "50%", // Make the border circular
                color: "var(--foreground-color)", // Text color for selected day
                backgroundColor: "var(--success-color)", // Background color for selected day
                transition: "none",
              },
              "& .MuiPickersDay-root.Mui-selected:selected": {
                backgroundColor: "var(--success-color)", // Hover color for selected day
                transition: "none",
              },
              "& .MuiPickersDay-root.Mui-selected:hover": {
                backgroundColor: "var(--success-color)", // Hover color for days
                transition: "none",
              },
              "& .MuiPickersDay-root.Mui-selected.Mui-focusVisible": {
                backgroundColor: "var(--success-color) !important", // Focus visible color for selected day
                transition: "none",
              },
              "& .MuiPickersDay-today": {
                borderColor: "var(--success-color) !important", // Hover color for days
                transition: "none",
              },
              "& .MuiButtonBase-root.Mui-selected": {
                backgroundColor: "var(--success-color) !important", // Background color for selected day
                transition: "none",
              },
            }}
          />
        </LocalizationProvider>
        <CardStory
          dateWritten={new Date(2024, 12, 1)}
          note="testing card note"
        ></CardStory>
      </div>
    </>
  );
}
