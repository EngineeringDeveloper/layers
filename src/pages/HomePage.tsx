import { Auth } from "firebase/auth";
import { Kit } from "../components/Kit";

export const HomePage = (props: { auth: Auth }) => {
  const { auth } = props;
  console.log("Auth...", auth);
  return (
    <div>
      Homepage.
      <Kit auth={auth} />
    </div>
  );
};
