import "./CardGridStory.css";

type CardProps = {
  dateWritten: Date;
  note: string;
};

export default function CardGridStory({ dateWritten, note }: CardProps) {
  return (
    <div className={`cardGridStory`}>
      <div className="dateWritten">
        <p>{dateWritten.toDateString()}</p>
      </div>
      <div className="noteWritten">
        <p>{note}</p>
      </div>
    </div>
  );
}
