import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import "./TodayStoryCard.css";
import { MdEdit } from "react-icons/md";
import { apiClient } from "../../utils/axiosInstance";
import { AxiosResponse } from "axios";
import { Note } from "../../models/note";

interface StoryCardProps {
  id: string;
  key: string;
  dateWritten: Dayjs;
  note: string;
  isPlaceholder: boolean;
  isToday?: boolean;
  glow?: string;
  slideIn?: string;
  onNoteUpdated?: () => void;
}

const TodayStoryCard: React.FC<StoryCardProps> = (props) => {
  const [note, setNote] = useState(props.note);
  const [placeholderStatus, setPlaceholderStatus] = useState<boolean>(
    props.isPlaceholder
  );
  const [idStatus, setIdStatus] = useState<string>(props.id);
  const [isEdit, setIsEdit] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
    adjustTextareaHeight();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      setIsEdit(false);
      console.log("call key down");
      saveIfNeeded();
    }
  };

  const handleBlur = () => {
    setIsEdit(false);
    console.log("call blur");
    saveIfNeeded();
  };

  const saveIfNeeded = async () => {
    const trimmedNote = note.trim();
    const originalTrimmedNote = props.note.trim();
    const accessToken = localStorage.getItem("token");
    const year = props.dateWritten.year();

    if (!placeholderStatus) {
      if (trimmedNote !== originalTrimmedNote) {
        try {
          const result = await apiClient.put(
            "/note",
            {
              id: idStatus,
              note: trimmedNote,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (result.status === 200) {
            console.log("Note saved!");
            localStorage.removeItem(`${year}`);
            if (props.onNoteUpdated) {
              props.onNoteUpdated();
            }
          } else {
            console.error("Failed to save note");
          }
        } catch (error) {
          console.error("Error saving note", error);
        }
      } else {
        console.log("No change detected, skipping POST.");
      }
    } else {
      try {
        const result: AxiosResponse<{ data: Note }> = await apiClient.post(
          "/note",
          {
            dateWritten: props.dateWritten.startOf("day").toISOString(),
            note: trimmedNote,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (result.status === 200) {
          console.log("Note added!");
          setPlaceholderStatus(false);
          setIdStatus(result.data.data.id);
          localStorage.removeItem(`${year}`);
          if (props.onNoteUpdated) {
            props.onNoteUpdated();
          }
        } else {
          console.error("Failed to save note");
        }
      } catch (error) {
        console.error("Error saving note", error);
      }
    }

    setIsEdit(false);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [note]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [note]);

  useEffect(() => {
    if (isEdit && textareaRef.current) {
      const length = textareaRef.current.value.length;
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(length, length);
      adjustTextareaHeight();
    }
  }, [isEdit]);

  return (
    <div
      className={`TodayStoryCard ${props.glow} ${props.slideIn} ${
        props.isToday
          ? `todayCard ${placeholderStatus ? "blueGlow" : "greenGlow"}`
          : ""
      }`}
    >
      <div className="CardHeader">
        <div className="CardHeaderLeftSide">
          <div className={`CardHeaderTags`}>
            <div
              className={`WrittenTag ${
                placeholderStatus ? "blueGlow" : "greenGlow"
              }`}
            ></div>
          </div>
          <div className="CardTodayTag"></div>
          <p>{dayjs(props.dateWritten).format("dddd, DD/MM/YYYY")}</p>
        </div>
        <MdEdit onClick={() => setIsEdit(!isEdit)} className="clickable" />
      </div>
      <div className="CardContent">
        {isEdit ? (
          <textarea
            ref={textareaRef}
            className="TodayStoryInput"
            value={note ? note : ""}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            autoFocus
          />
        ) : (
          <p>{note ? note : "You haven't write for this day"}</p>
        )}
      </div>
    </div>
  );
};

export default TodayStoryCard;
