import { useContext } from "react";
import { GolfContext } from "../contexts/GolfContext";

const HoleInput = ({ holeNumber }) => {
  const { currentRound, updateHole } = useContext(GolfContext);
  const holeIndex = holeNumber - 1;
  const hole = currentRound.holes[holeIndex];
  const score = hole.strokes - hole.par;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="font-bold text-lg text-center">Hole {holeNumber}</h3>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Par</label>
          <select
            value={hole.par}
            onChange={(e) =>
              updateHole(holeIndex, { par: parseInt(e.target.value) })
            }
          >
            {" "}
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Strokes
          </label>
          <input
            type="number"
            min="1"
            value={hole.strokes || ""}
            onChange={(e) =>
              updateHole(holeIndex, { strokes: parseInt(e.target.value) || 0 })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-golf-green focus:ring-golf-green focus:ring-opacity-50"
          />
        </div>
      </div>

      <div className="mt-2 text-center">
        <span
          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
            score < 0
              ? "bg-green-100 text-green-800"
              : score > 0
              ? "bg-red-100 text-red-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {" "}
          {score === 0 ? "e" : score > 0 ? `+${score}` : score}
        </span>
      </div>
    </div>
  );
};

export default HoleInput;
