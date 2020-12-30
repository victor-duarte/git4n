import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import "./index.css";

function RepositoryFilter(props) {
  const [filteredRepositories, setFilteredRepositories] = useState(null);
  const { repositories } = props;

  function handleChange(event) {
    const { value } = event.target;

    if (value.length < 3) {
      setFilteredRepositories(null);

      return false;
    }

    // Searches for existence of filtering text in repositories name and description.
    const reducedMatches = repositories.reduce(
      (acc, cur) => {
        if (cur.name && cur.name.toLowerCase().includes(value.toLowerCase())) {
          acc.byName.push(cur);
        } else if (
          cur.description &&
          cur.description.toLowerCase().includes(value.toLowerCase())
        ) {
          acc.byDescription.push(cur);
        }

        return acc;
      },
      {
        byName: [],
        byDescription: [],
      }
    );

    const formattedReducedMatches = reducedMatches.byName
      .concat(reducedMatches.byDescription)
      .slice(0, 5);

    setFilteredRepositories(formattedReducedMatches);
  }

  return (
    <section className="repository-filter">
      <h2>Filter by Repository</h2>
      <TextField onChange={handleChange} />
      {filteredRepositories && (
        <ul className="repository-filter__list">
          {filteredRepositories.map((match) => (
            <li key={`repository-link-${match.id}`}>
              <a
                href={match.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {match.name}
              </a>
            </li>
          ))}
        </ul>
      )}
      {filteredRepositories && filteredRepositories.length < 1 && (
        <p>No matches found.</p>
      )}
    </section>
  );
}

export default RepositoryFilter;
