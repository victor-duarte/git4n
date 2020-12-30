import { useEffect, useState } from "react";
import UserRegister from "./components/UserRegister";
import { useCookies } from "react-cookie";
import Repositories from "./components/Repositories";
import Summary from "./components/Summary";
import "./App.css";

function getUserDataUrl(user) {
  return `https://api.github.com/users/${user}`;
}

function App() {
  const [cookies] = useCookies(["user"]);
  const [repositories, setRepositories] = useState(null);

  useEffect(async () => {
    if (!cookies.user) {
      setRepositories(null);

      return false;
    }

    const response = await fetch(getUserDataUrl(cookies.user.githubUser));
    const data = await response.json();

    const response2 = await fetch(data.repos_url);
    const publicRepositories = await response2.json();

    setRepositories(publicRepositories);
  }, [cookies]);

  return (
    <div className="App">
      <h1>Github User Reviewer</h1>
      <Summary />
      <UserRegister />
      {repositories && <Repositories repositories={repositories} />}
    </div>
  );
}

export default App;
