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
    const saved = localStorage.getItem("golfRounds");
    if (saved) setRoundHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("golfRounds", JSON.stringify(roundHistory));
  }, [roundHistory]);

  const updateHoleData = (holeIndex, data) => {
    setCurrentRound((prev) => ({
      ...prev,
      holes: prev.holes.map((hole, i) =>
        i === holeIndex ? { ...hole, ...data } : hole
      ),
    }));
  };
};
