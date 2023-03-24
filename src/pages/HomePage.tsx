import { Auth, onAuthStateChanged } from "firebase/auth";
import { Kit } from "../components/Kit";

export const HomePage = (props: { auth: Auth }) => {
  const { auth } = props;
  return (
    <div>
      Homepage.
      <Kit auth={auth} />
    </div>
  );
};
