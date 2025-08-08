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

//most stable calendar
/*
const StyledDateCalendar = styled(DateCalendar)({
  borderRadius: "0.5rem",
  backgroundColor: `#f4f4f4`,
  width: "60%",
  maxWidth: "60%",
  height: "40%", // Takes 40% of the parent height
  maxHeight: "40%",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
  overflow: "hidden", // Prevent any potential overflow issues

  // Header takes 15% of the calendar's height
  "& .MuiPickersCalendarHeader-root": {
    display: "flex",
    height: "15%", // 15% of calendar height
    maxHeight: "15%",
    minHeight: "15%",
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    alignItems: "center",
  },

  "& .MuiPickersCalendarHeader-labelContainer": {
    margin: "auto",
  },

  "& .MuiPickersCalendarHeader-label": {
    color: "rgba(0, 0, 0, 0.87);",
    fontSize: "clamp(0.8rem, 1vh, 1rem)",
  },

  // Day calendar takes 85% of the calendar height (remaining space)
  "& .MuiDayCalendar-root": {
    height: "90%", // 85% of calendar height
    maxHeight: "90%",
    minHeight: "90%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  },

  // Divide MuiDayCalendar equally: header + 6 week rows = 7 equal parts
  "& .MuiDayCalendar-header": {
    display: "flex",
    justifyContent: "space-between",
    height: "calc(100% / 7)", // 1/7th of day calendar height
    minHeight: "calc(100% / 7)",
    maxHeight: "calc(100% / 7)",
    alignItems: "center",
    margin: 0,
    padding: 0,
  },

  "& .MuiPickersSlideTransition-root": {
    display: "flex",
    height: "calc(6 * 100% / 7)", // 6/7th of day calendar height
    width: "100%",
    overflow: "hidden",
  },
  "& .MuiDayCalendar-slideTransition": {
    minHeight: "unset",
  },
  "& .MuiDayCalendar-monthContainer": {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
  },

  // Each week row gets 1/6th of the remaining space (which is 6/7th of the day calendar)
  "& .MuiDayCalendar-weekContainer": {
    display: "flex",
    justifyContent: "space-between",
    height: "calc(100% / 6)", // Each row gets 1/6th of the month container
    minHeight: "calc(100% / 6)",
    maxHeight: "calc(100% / 6)",
    alignItems: "center",
    margin: 0,
    padding: 0,
  },

  "& .MuiDayCalendar-weekDayLabel": {
    margin: 0,
    padding: 0,
    flex: 1,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "clamp(0.75rem, 1vh, 1rem)",
  },

  // Day cells maintain square aspect ratio
  "& .MuiPickersDay-root": {
    margin: 0,
    flex: 1,
    aspectRatio: "1/1",
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "clamp(0.75rem, 1vh, 1rem)",
    maxWidth: "calc(100% / 7 - 4px)",
  },

  // Selected day styling
  "& .MuiPickersDay-root.Mui-selected": {
    backgroundColor: "var(--success-color) !important",
  },
  "& .MuiPickersDay-root.Mui-selected:hover": {
    backgroundColor: "var(--success-color) !important",
  },
  "& .MuiPickersDay-root.Mui-selected:focus": {
    backgroundColor: "var(--success-color) !important",
  },
  "& .MuiPickersYear-root": {
    color: "rgba(0, 0, 0, 0.87);",
  },
});
*/

const StyledDateCalendar = styled(DateCalendar)({
  backgroundColor: `#f4f4f4`,
  height: "40%",
  maxHeight: "40%",
  width: "60%",
  borderRadius: "min(0.5vh, 0.5vw)",
  padding: "1vh 1rem 1vh 1rem",
  "& .MuiPickersCalendarHeader-root": {
    display: "flex",
    height: "15%", // 15% of calendar height
    maxHeight: "15%",
    minHeight: "15%",
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    alignItems: "center",
  },
  "& .MuiPickersArrowSwitcher-button": {
    padding: 0,
    boxSizing: "border-box",
    alignItems: "center",
  },
  "& > div:not(.MuiPickersCalendarHeader-root)": {
    flex: 1, // Take up remaining space
    display: "flex",
    flexDirection: "column",
    height: "85%", // Take 85% of calendar height
    minHeight: "85%", // Enforce minimum height
  },
  "& .MuiDayCalendar-root": {
    height: "100%", // 85% of calendar height
    maxHeight: "100%",
    minHeight: "100%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  "& .MuiDayCalendar-header": {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gridTemplateRows: "1fr",
  },
  "& .MuiDayCalendar-monthContainer ": {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  "& .MuiDayCalendar-weekDayLabel": {
    width: "unset",
    height: "unset",
    fontFamily: "poppins",
  },
  "& .MuiDayCalendar-weekContainer ": {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gridTemplateRows: "1fr",
    flexGrow: 1,
    width: "unset",
    height: "unset",
    margin: 0,
  },
  "& .MuiPickersDay-root": {
    width: "unset",
    height: "unset",
    margin: "unset",
    fontFamily: "poppins",
  },
  "& .MuiDayCalendar-slideTransition": {
    minHeight: "unset",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },

  // Selected day styling
  "& .MuiPickersCalendarHeader-label": {
    color: "rgba(0, 0, 0, 0.87);",
    fontSize: "clamp(0.8rem, 1vh, 1rem)",
  },
  "& .MuiPickersDay-root.Mui-selected": {
    backgroundColor: "var(--success-color) !important",
  },
  "& .MuiPickersDay-root.Mui-selected:hover": {
    backgroundColor: "var(--success-color) !important",
  },
  "& .MuiPickersDay-root.Mui-selected:focus": {
    backgroundColor: "var(--success-color) !important",
  },
  "& .MuiPickersYear-root": {
    color: "rgba(0, 0, 0, 0.87);",
  },
});

const ShowcaseWindow: React.FC = () => {
  const { setPage } = useContext(pageContext);
  const { setMessage } = useLoading();
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
          isPlaceholder: true,
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

  const refreshCalendar = React.useCallback(async () => {
    // Use the current view year to refresh the calendar
    await onYearChangeHandler(currentViewYear);
  }, [currentViewYear, onYearChangeHandler]);

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
          {selectedCard.length == 0 ? (
            <div className="NoteContainerOnEmpty">Select Date on calendar to show the note here</div>
          ) : (
            selectedCard.map((note) => (
              <div className="CardOnShowcase">
                <TodayStoryCard
                  key={note.id}
                  id={note.id}
                  isPlaceholder={note.isPlaceholder || false}
                  dateWritten={dayjs(note.dateWritten)}
                  note={note.note}
                  glow={note.id === glowCardId ? "glow" : ""}
                  slideIn={note.id === slideInCardId ? "slide-in" : ""}
                  onNoteUpdated={refreshCalendar}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowcaseWindow;
