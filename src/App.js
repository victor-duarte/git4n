import UserRegister from "./components/UserRegister";
import "./App.css";
import Summary from "./components/Summary";

function App() {
  return (
    <div className="App">
      <h1>Github User Reviewer</h1>
      <Summary />
      <UserRegister />
    </div>
  );
}

export default App;
