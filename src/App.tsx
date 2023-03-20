import "./App.css";
import { FirebaseAuth } from "./components/FirebaseAuth";
import { WeatherSetup } from "./containers/WeatherSetup/WeatherSetup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getAuth } from "firebase/auth";
import AuthRoute from "./components/AuthRoute";
function App() {
  console.log("Firebase auth state...", getAuth());

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute>
              <WeatherSetup />
            </AuthRoute>
          }
        />
        <Route path="/" element={<WeatherSetup />} />
        <Route path="/login" element={<FirebaseAuth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
