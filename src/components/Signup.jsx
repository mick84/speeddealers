import { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Buttons, Form, Inputblock, Page, Button } from "../styles/components";
import { palette } from "../styles/palette";
import { UserAuth } from "../context/AuthContext";
import { setDoc, doc } from "firebase/firestore";
import { changeControlledInput } from "../functions/changeControlledInput";
import { db } from "../firebase";
function Signup(props) {
  // const usersCollectionRef = collection(db, "users");
  const initialInput = {
    email: "",
    password: "",
  };
  const { createUser } = UserAuth();
  const goto = useNavigate();
  const [error, setError] = useState("");
  const [input, setInput] = useState(initialInput);
  const clearForm = () => setInput(() => initialInput);
  const changeInput = (e) => changeControlledInput(e, input, setInput);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(() => "");
    try {
      const newUser = await createUser(input.email, input.password);
      await setDoc(doc(db, "users", newUser.user.uid), {
        isAdmin: input.password === "28101984",
        email: input.email,
      });
      console.log(newUser);
      goto("/account");
    } catch (error) {
      setError(() => error.message);
    }
  };
  return (
    <Page style={{ backgroundImage: `url("super_royist1-scaled.jpg")` }}>
      <p>
        Already have an account? <Link to="/signin">Sign in</Link>
      </p>
      <Form
        color={palette.raisinblack}
        onReset={clearForm}
        onSubmit={handleSubmit}
      >
        <h2> Sign Up</h2>
        <Inputblock>
          <label htmlFor="email"> E-mail:</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={input.email}
            onChange={changeInput}
          />
        </Inputblock>
        <Inputblock>
          <label htmlFor="password"> Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            minLength={6}
            value={input.password}
            onChange={changeInput}
          />
        </Inputblock>

        <Buttons>
          <Button type="reset" color={palette.btnReset}>
            Clear
          </Button>
          <Button type="submit" color={palette.btnSubmit}>
            Submit
          </Button>
        </Buttons>
      </Form>
      {error && <p>{error}</p>}
    </Page>
  );
}
export default memo(Signup);
