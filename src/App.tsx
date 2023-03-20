import "./App.css";
import { FirebaseAuth } from "./components/FirebaseAuth";
import { WeatherSetup } from "./containers/WeatherSetup/WeatherSetup";
function App() {
  return (
    <div className="App">
      <WeatherSetup />
      <FirebaseAuth />
    </div>
  );
}

export default App;
