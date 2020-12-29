import { useCookies } from "react-cookie";
import "./index.css";

function formatUserData([key, value]) {
  return (
    <>
      <dt>{key}</dt>
      <dd>{value}</dd>
    </>
  );
}

function Summary() {
  const [cookies] = useCookies(["user"]);
  const { user } = cookies;

  if (!user) {
    return null;
  }

  return (
    <section className="summary">
      <h2>User information</h2>
      <dl className="summary__list">
        {Object.entries(user).map(formatUserData)}
      </dl>
    </section>
  );
}

export default Summary;
