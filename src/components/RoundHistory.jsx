import { useContext } from "react";
import { GolfContext } from "../contexts/GolfContext";
import { subMilliseconds } from "date-fns";

const RoundHistory = () => {
  const { roundHistory } = useContext(GolfContext);

  if (roundHistory.length === 0) return null;

  return (
    <div className="mt-8 bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-3">Past Rounds</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roundHistory.map((round) => {
              const totalStrokes = round.holes.reduce(
                (sum, hole) => sum + hole.strokes,
                0
              );
              const totalPar = round.holes.reduce(
                (sum, hole) => sum + hole.par,
                0
              );
              const totalScore = totalStrokes - totalPar;

              return (
                <tr key={round.id}>
                  <td className="px-4 py-2 whitespace-nowrap">{round.date}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {round.course || "Unknown"}
                  </td>
                  <td
                    className={`px-4 py-2 whitespace-nowrap font-medium ${
                      totalScore < 0
                        ? "text-green-600"
                        : totalScore > 0
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    {totalScore === 0
                      ? "E"
                      : totalScore > 0
                      ? `+${totalScore}`
                      : totalScore}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoundHistory;
