import { useContext, useState } from "react";
import DeathProgressBar from "../Bar-DeathProgress/DeathProgressBar";
import "./HomePage.css";
import Header from "../Header/Header";

import { authContext } from "../Provider-Auth/AuthContext";
import CarouselStoryCard from "../Carousel-StoryCard/CarouselStoryCard";
import CarouselMessage from "../Carousel-Message/CarouselMessage";

function HomePage() {
  const [name, setName] = useState("John Doe");
  const { user } = useContext(authContext);
  const [deathDate, setDeathDate] = useState<Date>(
    (user?.expectedDeathDate as Date) || new Date(2030, 11, 31)
  );
  const [birthDate, setBirthDate] = useState<Date>(
    (user?.birthDate as Date) || new Date(2002, 11, 31)
  );

  function dateDiffInDays(a: Date, b: Date) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  return (
    <div className="homePage">
      <Header />
      <div className="deathStatement">
        <h2>
          Be aware {name}, you're {dateDiffInDays(birthDate, deathDate)} days
          closer to death
        </h2>
      </div>
      <DeathProgressBar />
      <div className="ageReminder">
        <p>
          You expected yourself to die in 70 years old,{" "}
          {deathDate.toDateString()}
        </p>
      </div>
      <CarouselStoryCard />
      <CarouselMessage />
    </div>
  );
}

export default HomePage;
