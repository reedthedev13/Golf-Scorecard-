import { useContext } from "react";
import { GolfContext } from "../contexts/GolfContext";
import { Link } from "react-router-dom";

const RoundHistory = () => {
  const { roundHistory } = useContext(GolfContext);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Golf Rounds</h1>
      <Link
        to="/"
        className="mb-4 inline-block bg-golf-green text-white px-4 py-2 rounded hover:bg-green-800"
      >
        Back to Scorecard
      </Link>

      {roundHistory.length === 0 ? (
        <p>No rounds saved yet. Play a round to see it here!</p>
      ) : (
        <div className="grid gap-4">
          {roundHistory.map((round, index) => (
            <div key={round.id} className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">
                {round.course || "Unnamed Course"} - {round.date}
              </h2>
              <div className="grid grid-cols-3 gap-4 mt-3">
                <div>
                  <p className="text-sm text-gray-600">Total Strokes</p>
                  <p className="text-lg font-bold">
                    {round.holes.reduce((sum, hole) => sum + hole.strokes, 0)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Par</p>
                  <p className="text-lg font-bold">
                    {round.holes.reduce((sum, hole) => sum + hole.par, 0)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Score</p>
                  <p className="text-lg font-bold">
                    {round.holes.reduce((sum, hole) => sum + hole.strokes, 0) -
                      round.holes.reduce((sum, hole) => sum + hole.par, 0)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoundHistory;
