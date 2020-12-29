import { Formik, Form, Field } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useCookies } from "react-cookie";
import "./index.css";

const formData = {
  birthdate: "",
  email: "",
  firstName: "",
  githubUser: "",
  lastName: "",
  userId: "",
};

function UserRegister() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  // Renders option to clear the `user` cookie
  if (cookies.user) {
    return (
      <section className="user-register">
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

  return (
    <section className="user-register">
      <Formik
        initialValues={formData}
        onSubmit={(values, { setSubmitting }) => {
          setCookie("user", values, { path: "/" });
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <div>
              <Field
                as={TextField}
                label="First Name"
                name="firstName"
                type="text"
              />
            </div>
            <div>
              <TextField
                as={TextField}
                label="Last Name"
                name="lastName"
                type="text"
              />
            </div>
            <div>
              <TextField
                as={TextField}
                name="userId"
                type="text"
                label="User ID"
              />
            </div>
            <div>
              <TextField
                as={TextField}
                label="Birth Date"
                name="birthdate"
                type="date"
              />
            </div>
            <div>
              <TextField
                as={TextField}
                label="Email"
                name="email"
                type="email"
              />
            </div>
            <div>
              <TextField
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
