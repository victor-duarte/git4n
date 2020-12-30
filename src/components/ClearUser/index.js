import Button from "@material-ui/core/Button";
import { useCookies } from "react-cookie";
import "./index.css";

function ClearUser(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const { message } = props;

  if (!cookies.user) {
    return false;
  }

  return (
    <section className="clear-user">
      {message && <p>{message}</p>}
      <Button
        color="secondary"
        onClick={() => {
          removeCookie("user");
        }}
        variant="contained"
      >
        Clear user
      </Button>
    </section>
  );
}

export default ClearUser;
