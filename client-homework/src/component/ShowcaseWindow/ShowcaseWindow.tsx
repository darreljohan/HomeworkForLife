import React, { useContext, useState } from "react";
import { pageContext } from "../../context/PageContext";
import {
  DateCalendar,
  LocalizationProvider,
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./ShowcaseWindow.css";
import { styled } from "@mui/material";
import logo from "../../assets/logo.png";
import MOCK_DATA from "./MOCK_NOTE.json";
import dayjs, { Dayjs } from "dayjs";
import { Note } from "../../models/note";
import TodayStoryCard from "../StoryCard/TodayStoryCard";

const StyledDateCalendar = styled(DateCalendar)({
  borderRadius: "0.5rem",
  backgroundColor: `#f4f4f4`,
  "& .MuiInputBase-root": {
    fontSize: "0.8rem", // Adjust font size
  },
  "& .MuiPickersCalendarHeader-label": {
    color: "rgba(0, 0, 0, 0.87);",
  },
  "& .MuiPickersDay-root.Mui-selected": {
    backgroundColor: "var(--success-color) !important", // Correct selector for selected day
  },
  "& .MuiPickersDay-root.Mui-selected:hover": {
    backgroundColor: "var(--success-color) !important", // Hover color for selected day
  },
  "& .MuiPickersDay-root.Mui-selected:focus": {
    backgroundColor: "var(--success-color) !important", // Focus color for selected day
  },
  "& .MuiPickersYear-root": {
    color: "rgba(0, 0, 0, 0.87);",
  },
});

const ShowcaseWindow: React.FC = () => {
  const { setPage } = useContext(pageContext);
  const [selectedCard, setSelectedCard] = useState<Note[]>([]);
  const [glowCardId, setGlowCardId] = useState<string | null>(null);
  const [slideInCardId, setSlideInCardId] = useState<string | null>(null);

  const onChangeHandler = (date: Dayjs | null) => {
    if (date) {
      const existingNote = selectedCard.find((note) =>
        dayjs(note.date_written).isSame(date, "day")
      );

      if (existingNote) {
        setGlowCardId(existingNote.id);
        setTimeout(() => setGlowCardId(null), 500); // Remove glow after 1 second
        return;
      }

      const notes = MOCK_DATA.filter((note) =>
        dayjs(note.date_written).isSame(date, "day")
      );

      if (notes.length === 0) {
        notes[0] = {
          id: date.toString(),
          date_written: date.toString(),
          note: "You haven't written anything on this day.",
        };
      }

      if (selectedCard.length <= 2) {
        setSelectedCard([...selectedCard, notes[0]]);
        setSlideInCardId(notes[0].id);
        setTimeout(() => setSlideInCardId(null), 500); // Remove slide-in class after animation
        setGlowCardId(notes[0].id);
        setTimeout(() => setGlowCardId(null), 500); // Remove glow after 1 second
        return;
      } else {
        setSelectedCard([notes[0], selectedCard[0], selectedCard[1]]);
        setSlideInCardId(notes[0].id);
        setTimeout(() => setSlideInCardId(null), 500); // Remove slide-in class after animation
        setGlowCardId(notes[0].id);
        setTimeout(() => setGlowCardId(null), 500);
      }
    }
  };

  const renderDay = (pickersDayProps: PickersDayProps<Dayjs>) => {
    const isInMockData = MOCK_DATA.some((note) =>
      dayjs(note.date_written).isSame(pickersDayProps.day, "day")
    );

    return (
      <PickersDay
        {...pickersDayProps}
        sx={{
          ...(isInMockData && {
            border: "2px solid green",
          }),
        }}
      />
    );
  };

  return (
    <div className="Showcase">
      <div className="ShowcaseHeader">
        <div className="ShowcaseTitle">
          <img className="SettingForm-Logo" src={logo} alt="logo" />
          <p>All Your Notes</p>
        </div>
        <button className="closeSettingWindow" onClick={() => setPage("Home")}>
          X
        </button>
      </div>
      <div className="CalendarContainer">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StyledDateCalendar
            slots={{ day: renderDay }}
            onChange={onChangeHandler}
          ></StyledDateCalendar>
        </LocalizationProvider>
        <div className="NoteContainer">
          {selectedCard.map((note) => (
            <TodayStoryCard
              key={note.id}
              dateWritten={dayjs(note.date_written)}
              note={note.note}
              glow={note.id === glowCardId ? "glow" : ""}
              slideIn={note.id === slideInCardId ? "slide-in" : ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowcaseWindow;
