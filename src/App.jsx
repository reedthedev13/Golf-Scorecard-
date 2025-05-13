import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GolfPlace } from "./contexts/GolfContext";
import Scorecard from "./components/ScoreCard";
import RoundHistory from "./components/RoundHistory";
import "./index.css";

function App() {
  return (
    <GolfPlace>
      <Router>
        <Routes>
          <Route path="/" element={<Scorecard />} />
          <Route path="/history" element={<RoundHistory />} />
        </Routes>
      </Router>
    </GolfPlace>
  );
}

export default App;
