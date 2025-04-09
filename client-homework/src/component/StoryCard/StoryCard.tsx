import { Dayjs } from "dayjs";
import React from "react";

interface StoryCardProps {
  dateWritten: Dayjs;
  note: string;
}

const StoryCard: React.FC<StoryCardProps> = (props) => {
  return <div>{/* Your component implementation */}</div>;
};

export default StoryCard;
