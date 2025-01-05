import "./CardStory.css";
import editLogo from "../../assets/edit.png";

type CardProps = {
  dateWritten: Date;
  note: string;
};

export default function CardStory({ dateWritten, note }: CardProps) {
  return (
    <div className="cardStory">
      <div className="dateSection">
        {dateWritten.toDateString()}
        <div className="editButton">
          <img src={editLogo}></img>
        </div>
      </div>
      <div className="noteSection">{note}</div>
    </div>
  );
}
