import { Button, Buttons, Page, ProfileLayout } from "../styles/components";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { palette } from "../styles/palette";

export default function Account(props) {
  const goto = useNavigate();
  const { user, deleteUser } = UserAuth();
  const handleUserDeletion = async () => {
    try {
      await deleteUser(user);
      goto("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Page>
      <ProfileLayout imageurl={user.photoURL}>
        <h2 className="username">{user.displayName}</h2>
        <hr />
        <div className="picture" />
        <p className="email">E-mail: {user.email}</p>

        <Buttons>
          <Button color="red" type="button" onClick={handleUserDeletion}>
            Delete
          </Button>
          <Button
            color={palette.bluepantone}
            type="button"
            onClick={() => goto("/account/update")}
          >
            Edit
          </Button>
        </Buttons>
      </ProfileLayout>
    </Page>
  );
}
