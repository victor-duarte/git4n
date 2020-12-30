import React, { useEffect, useState } from "react";
import UserRegister from "./components/UserRegister";
import { useCookies } from "react-cookie";
import CssBaseline from "@material-ui/core/CssBaseline";
import Repositories from "./components/Repositories";
import RepositoryFilter from "./components/RepositoryFilter";
import Summary from "./components/Summary";
import "./App.css";

function getUserRepositoryDataUrl(user) {
  // TODO: add logic for greater that user repository is greater than 100
  return `https://api.github.com/users/${user}/repos?per_page=100`;
}

function App() {
  const [cookies] = useCookies(["user"]);
  const [repositories, setRepositories] = useState(null);

  useEffect(() => {
    if (!cookies.user) {
      setRepositories(null);

      return false;
    }

    (async () => {
      const data = await fetch(
        getUserRepositoryDataUrl(cookies.user.githubUser)
      ).then((response) => response.json());

      setRepositories(data);
    })();
  }, [cookies]);

  return (
    <React.Fragment>
      <CssBaseline />
      <div className="App">
        <h1>Github User Reviewer</h1>
        <Summary />
        <UserRegister />
        {repositories && (
          <React.Fragment>
            <Repositories repositories={repositories} />
            <RepositoryFilter repositories={repositories} />
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

export default App;
