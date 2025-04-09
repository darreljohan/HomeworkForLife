import dayjs from "dayjs";
import "./CardStoryAdd.css";
import editLogo from "../../assets/edit.png";

export default function CardStoryAdd() {
  return (
    <div className="cardStory">
      <div className="dateSection">
        <div>{dayjs().format("ddd MMM D YYYY").toString()}</div>
        <div className="editButton">
          <img src={editLogo}></img>
        </div>
      </div>
      <div className="addSection">
        <div>Today is storyworthy. Write now, remember forever!</div>
      </div>
    </div>
  );
}
