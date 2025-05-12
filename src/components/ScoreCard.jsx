import { useContext } from "react";
import { GolfContext } from "../contexts/GolfContext";
import HoleInput from "./HoleInput";

const Scorecard = () => {
  const { currentRound, saveRound } = useContext(GolfContext);

  const totalStrokes = currentRound.holes.reduce(
    (sum, hole) => sum + hole.strokes,
    0
  );
  const totalPar = currentRound.holes.reduce((sum, hole) => sum + hole.par, 0);
  const totalScore = totalStrokes - totalPar;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-golf-green text-white p-4 rounded-t-lg">
        <h1 className="text-2xl font-bold">Golf Scorecard</h1>
        <div className="flex justify-between items-center mt-2">
          <input
            type="text"
            placeholder="Course name"
            value={currentRound.course}
            onChange={(e) =>
              setCurrentRound((prev) => ({ ...prev, course: e.target.value }))
            }
            className="bg-white/20 placeholder-white/70 rounded px-3 py-1 text-white focus:outline-none focus:ring-1 focus:ring-white"
          />
          <span className="text-sm">{currentRound.date}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 bg-golf-fariway rounded-b-lg">
        {currentRound.holes.map((hole) => (
          <HoleInput key={hole.holeNumber} holeNumber={hole.holeNumber} />
        ))}
      </div>

      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">Round Summary</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-100 p-3 rounded">
            <p className="text-sm text-gray-600">Total Strokes</p>
            <p className="text-2xl font-bold">{totalStrokes}</p>
          </div>
          <div className="bg-gray-100 p-3 rounded">
            <p className="text-sm text-gray-600">Total Par</p>
            <p className="text-2xl font-bold">{totalPar}</p>
          </div>
          <div
            className={`p-3 rounded ${
              totalScore < 0
                ? "bg-green-100 text-green-800"
                : totalScore > 0
                ? "bg-red-100 text-red-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            <p className="text-sm">Total Score</p>
            <p className="text-2xl font-bold">
              {totalScore === 0
                ? "E"
                : totalScore > 0
                ? `+${totalScore}`
                : totalScore}
            </p>
          </div>
        </div>
        <button
          onClick={saveRound}
          className="mt-4 w-full bg-golf-green hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Save Round
        </button>
      </div>
    </div>
  );
};

export default Scorecard;
