import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

export const GolfContext = createContext();

export const GolfPlace = ({ children }) => {
  const [currentRound, setCurrentRound] = useState(() => ({
    id: uuidv4(),
    date: format(new Date(), "yyyy-MM-dd"),
    course: "",
    holes: Array(18)
      .fill()
      .map((_, i) => ({
        holeNumber: i + 1,
        par: 4,
        strokes: 0,
      })),
  }));

  const [roundHistory, setRoundHistory] = useState([]);

  useEffect(() => {
    const savedRounds = localStorage.getItem("golfRounds");
    if (savedRounds) {
      setRoundHistory(JSON.parse(savedRounds));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("golfRounds", JSON.stringify(roundHistory));
  }, [roundHistory]);

  const updateHole = (holeIndex, data) => {
    setCurrentRound((prev) => ({
      ...prev,
      holes: prev.holes.map((hole, i) =>
        i === holeIndex ? { ...hole, ...data } : hole
      ),
    }));
  };

  const saveRound = () => {
    if (currentRound.holes.some((hole) => hole.strokes === 0)) {
      alert("Please complete all holes before saving");
      return;
    }

    if (!currentRound.course.trim()) {
      alert("Please enter a course name");
      return;
    }

    setRoundHistory((prev) => [...prev, currentRound]);

    setCurrentRound({
      id: uuidv4(),
      date: format(new Date(), "yyyy-MM-dd"),
      course: "",
      holes: Array(18)
        .fill()
        .map((_, i) => ({
          holeNumber: i + 1,
          par: 4,
          strokes: 0,
        })),
    });

    alert("Round saved successfully!");
  };

  return (
    <GolfContext.Provider
      value={{
        currentRound,
        roundHistory,
        updateHole,
        saveRound,
        setCurrentRound,
      }}
    >
      {children}
    </GolfContext.Provider>
  );
};
