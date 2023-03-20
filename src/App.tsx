import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { KitFeedback } from "./pages/KitFeedback";
import { WeatherSetup } from "./containers/WeatherSetup/WeatherSetup";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/kitfeedback" element={<KitFeedback />} />
        <Route path="/weatherSetup" element={<WeatherSetup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
