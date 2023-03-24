import "./App.css";
import { FirebaseAuth } from "./components/FirebaseAuth";
import { WeatherSetup } from "./containers/WeatherSetup/WeatherSetup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getAuth } from "firebase/auth";
import AuthRoute from "./components/AuthRoute";
import { HomePage } from "./pages/HomePage";
function App() {
  const auth = getAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute>
              <HomePage auth={auth} />
            </AuthRoute>
          }
        />
        <Route path="/weather" element={<WeatherSetup />} />
        <Route path="/login" element={<FirebaseAuth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
