import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import "./TodayStoryCard.css";
import { MdEdit } from "react-icons/md";

interface StoryCardProps {
  dateWritten: Dayjs;
  note: string;
  glow?: string;
  slideIn?: string;
}

const TodayStoryCard: React.FC<StoryCardProps> = (props) => {
  const [note, setNote] = useState(props.note);
  const [isEdit, setIsEdit] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
    adjustTextareaHeight();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      setIsEdit(false);
    }
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
    <div className={`TodayStoryCard ${props.glow} ${props.slideIn}`}>
      <div className="CardHeader">
        <p>{dayjs(props.dateWritten).format("dddd, DD/MM/YYYY")}</p>
        <MdEdit onClick={() => setIsEdit(!isEdit)} />
      </div>
      <div className="CardContent">
        {isEdit ? (
          <textarea
            ref={textareaRef}
            className="TodayStoryInput"
            value={note ? note : ""}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={() => setIsEdit(false)}
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
