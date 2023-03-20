import { Auth } from "firebase/auth";

export const Kit = (props: { auth: Auth }) => {
  const { auth } = props;
  return (
    <div>
      <h1>Hello, {auth.currentUser?.displayName}</h1>
    </div>
  );
};
