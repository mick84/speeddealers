import { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Buttons, Form, Inputblock, Page, Button } from "../styles/components";
import { palette } from "../styles/palette";
import { UserAuth } from "../context/AuthContext";
import { changeControlledInput } from "../functions/changeControlledInput";
function Signin(props) {
  const initialInput = {
    email: "",
    password: "",
  };
  const { logIn } = UserAuth();
  const goto = useNavigate();
  const [error, setError] = useState("");
  const [input, setInput] = useState(initialInput);
  const clearForm = () => setInput(() => initialInput);
  const changeInput = (e) => changeControlledInput(e, input, setInput);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(() => "");
    try {
      const newUser = await logIn(input.email, input.password);
      console.log(newUser);
      goto("/account");
    } catch (error) {
      setError(() => error.message);
    }
  };
  return (
    <Page>
      <p>
        Don't have account yet? <Link to="/signup">Sign up</Link>
      </p>
      <Form
        color={palette.raisinblack}
        onReset={clearForm}
        onSubmit={handleSubmit}
      >
        <h2> Sign In</h2>
        <Inputblock>
          <label htmlFor="email"> E-mail:</label>
          <input
            type="email"
            name="email"
            id="email"
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
export default memo(Signin);
