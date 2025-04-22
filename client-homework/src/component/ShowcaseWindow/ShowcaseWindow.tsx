import React, { useContext, useEffect, useState } from "react";
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
import dayjs, { Dayjs } from "dayjs";
import { Note } from "../../models/note";
import TodayStoryCard from "../StoryCard/TodayStoryCard";
import { getYearOfNotes } from "../../utils/getYearOfNotes";
import { useLoading } from "../../context/LoadingContext";
import { ResponseError } from "../../error/ResponseError";

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
  const { setLoading, setMessage } = useLoading();
  const [selectedCard, setSelectedCard] = useState<Note[]>([]);
  const [glowCardId, setGlowCardId] = useState<string | null>(null);
  const [slideInCardId, setSlideInCardId] = useState<string | null>(null);
  const [cardState, setCardState] = useState<Note[]>([]);
  const [firstRenderLoading, setFirstRenderLoading] = useState<boolean>(true);
  const [currentViewYear, setCurrentViewYear] = useState<Dayjs>(dayjs());

  useEffect(() => {
    const initialize = async () => {
      try {
        await firstRenderHandler(); // Wait for firstRenderHandler to finish
      } catch (error) {
        console.error("Error during first render:", error);
      } finally {
        setFirstRenderLoading(false);
      }
    };
    initialize();
  }, []);

  const firstRenderHandler = async () => {
    try {
      const result = await getYearOfNotes(dayjs().year());
      const notes = result.map((note) => ({
        ...note,
        dateWritten: dayjs(note.dateWritten).format("YYYY-MM-DD"),
      }));
      setCardState(notes);
    } catch (error) {
      if (error instanceof ResponseError) {
        setMessage(error.message, false);
      } else {
        setMessage("Uncaught error", false);
      }
    }
  };

  const onChangeHandler = (date: Dayjs | null) => {
    if (date) {
      const existingNote = selectedCard.find((note) =>
        dayjs(note.dateWritten).isSame(date, "day")
      );

      if (existingNote) {
        setGlowCardId(existingNote.id);
        setTimeout(() => setGlowCardId(null), 500); // Remove glow after 1 second
        return;
      }

      const notes = cardState.filter((note) =>
        dayjs(note.dateWritten).isSame(date, "day")
      );

      if (notes.length === 0) {
        notes[0] = {
          id: date.toString(),
          dateWritten: date.toString(),
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

  const onYearChangeHandler = async (newYear: Dayjs) => {
    try {
      setFirstRenderLoading(true);
      setCurrentViewYear(newYear);
      const result = await getYearOfNotes(newYear.year());
      const notes = result.map((note) => ({
        ...note,
        dateWritten: dayjs(note.dateWritten).format("YYYY-MM-DD"),
      }));
      setCardState([...cardState, ...notes]);
    } catch (error) {
      if (error instanceof ResponseError) {
        setMessage(error.message, false);
      } else {
        setMessage("Uncaught error", false);
      }
    } finally {
      setFirstRenderLoading(false);
    }
  };

  const onMonthChangeHandler = async (newMonth: Dayjs) => {
    if (newMonth.subtract(1, "month").year() != currentViewYear.year()) {
      await onYearChangeHandler(newMonth);
    }
  };

  const renderMarkedDay = (pickersDayProps: PickersDayProps<Dayjs>) => {
    const isInCardState = cardState.some((note) =>
      dayjs(note.dateWritten).isSame(pickersDayProps.day, "day")
    );

    return (
      <PickersDay
        {...pickersDayProps}
        sx={{
          ...(isInCardState && {
            border: "2px solid green",
          }),
        }}
      />
    );
  };

  const renderLoadingComponent = () => {
    return (
      <div className="showcase-spinner-container">
        <div className="showcase-spinner"></div>
      </div>
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
            slots={{ day: renderMarkedDay }}
            onChange={onChangeHandler}
            onYearChange={onYearChangeHandler}
            onMonthChange={onMonthChangeHandler}
            renderLoading={renderLoadingComponent}
            loading={firstRenderLoading}
          ></StyledDateCalendar>
        </LocalizationProvider>
        <div className="NoteContainer">
          {selectedCard.map((note) => (
            <TodayStoryCard
              key={note.id}
              dateWritten={dayjs(note.dateWritten)}
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
