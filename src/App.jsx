import { GolfPlace } from "./contexts/GolfContext";
import Scorecard from "./components/ScoreCard";
import RoundHistory from "./components/RoundHistory";
import "./index.css";

function App() {
  return (
    <GolfPlace>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <Scorecard />
          <RoundHistory />
        </div>
      </div>
    </GolfPlace>
  );
}

export default App;
