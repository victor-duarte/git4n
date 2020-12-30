import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import "./index.css";

function RepositoryFilter(props) {
  const [matches, setMatches] = useState(null);
  const { repositories } = props;

  function handleChange(event) {
    const { value } = event.target;

    if (value.length < 3) {
      setMatches(null);

      return false;
    }

    // TODO: add debounce
    // TODO: add other conditions to identify similar repositories?
    // TODO: describe logic
    // TODO: suggestions
    const matchesx = repositories.reduce(
      (acc, cur) => {
        if (cur.name.toLowerCase().includes(value.toLowerCase())) {
          acc.byName.push(cur);
        } else if (
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

    const t = matchesx.byName.concat(matchesx.byDescription).slice(0, 5);

    setMatches(t);
  }

  return (
    <section className="repository-filter">
      <h2>Filter by Repository</h2>
      <TextField onChange={handleChange} />
      {matches && (
        <ul className="repository-filter__list">
          {matches.map((match) => (
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
    </section>
  );
}

export default RepositoryFilter;
