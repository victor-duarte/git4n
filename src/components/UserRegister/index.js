import { Formik, Form, Field } from "formik";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useCookies } from "react-cookie";
import "./index.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "80%",
    },
  },
}));

const formData = {
  birthdate: "",
  email: "",
  firstName: "",
  githubUser: "",
  lastName: "",
  userId: "",
};

function UserRegister() {
  const [cookies, setCookie] = useCookies(["user"]);
  const classes = useStyles();

  if (cookies.user) {
    return false;
  }
  return (
    <section className="user-register">
      <h2>User Registry</h2>
      <Formik
        initialValues={formData}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          setCookie("user", values, { path: "/" });
        }}
      >
        {({ isSubmitting }) => (
          <Form className={classes.root}>
            <div>
              <Field
                as={TextField}
                label="First Name"
                name="firstName"
                type="text"
              />
            </div>
            <div>
              <Field
                as={TextField}
                label="Last Name"
                name="lastName"
                type="text"
              />
            </div>
            <div>
              <Field as={TextField} name="userId" type="text" label="User ID" />
            </div>
            <div>
              <Field
                as={TextField}
                label="Birth Date"
                name="birthdate"
                type="date"
              />
            </div>
            <div>
              <Field as={TextField} label="Email" name="email" type="email" />
            </div>
            <div>
              <Field
                as={TextField}
                label="Github User"
                name="githubUser"
                required
                type="text"
              />
            </div>
            <div>
              <Button
                color="secondary"
                disabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default UserRegister;
