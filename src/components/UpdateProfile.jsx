import { Page, Form, Inputblock, Buttons, Button } from "../styles/components";
import { palette } from "../styles/palette";
import { UserAuth } from "../context/AuthContext";
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeControlledInput } from "../functions/changeControlledInput";
const UpdateProfile = () => {
  const { updateUser, user, updateUserEmail, updateUserPassword } = UserAuth();
  const emptyInput = {
    displayName: "",
    photoURL: "",
    email: "",
    password: "",
  };
  const goto = useNavigate();
  const [error, setError] = useState("");
  const [input, setInput] = useState({
    displayName: user.displayName || "",
    photoURL: user.photoURL || "",
    email: user.email,
    password: "",
  });
  const clearForm = () => setInput(() => emptyInput);
  const changeInput = (e) => changeControlledInput(e, input, setInput);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(() => "");
    try {
      input.email && (await updateUserEmail(input.email));
      input.password && (await updateUserPassword(input.password));
      (input.displayName || input.photoURL) &&
        (await updateUser(
          input.displayName || user.displayName,
          input.photoURL || user.photoURL
        ));
      goto("/account");
    } catch (error) {
      setError(() => error.message);
      console.log(error);
    }
  };
  return (
    <Page>
      <Form
        color={palette.raisinblack}
        onReset={clearForm}
        onSubmit={handleSubmit}
      >
        <h2>Update Profile</h2>
        <Inputblock>
          <label htmlFor="displayName"> Name:</label>
          <input
            type="text"
            name="displayName"
            id="displayName"
            value={input.displayName}
            onChange={changeInput}
          />
        </Inputblock>
        <Inputblock>
          <label htmlFor="photoURL"> Picture:</label>
          <input
            type="url"
            name="photoURL"
            id="photoURL"
            minLength={6}
            value={input.photoURL}
            onChange={changeInput}
          />
        </Inputblock>
        {/* <Inputblock>
          <label htmlFor="email"> Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder=" format: user@domain"
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
            placeholder="at least 6 craracters"
            value={input.password}
            onChange={changeInput}
          />
        </Inputblock> */}
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
};
export default memo(UpdateProfile);
