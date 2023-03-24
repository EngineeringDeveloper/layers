import { Auth, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { defaultKit } from "../assets/DefaultKit";
import { WeatherSetup } from "../containers/WeatherSetup/WeatherSetup";
import { db } from "../firebase";
import { kitOptions } from "../types/User.types";
export const Kit = (props: { auth: Auth }) => {
  const { auth } = props;
  const [userInfo, setUserInfo] = useState<User>();
  const [userKit, setUserKit] = useState<kitOptions>();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        setUserInfo(user);
        const userRef = doc(db, "users", uid);
        console.log("userRef", userRef);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const userDetails = docSnap.data();
          if (userDetails.kit) {
            setUserKit(userDetails.kit);
          } else {
            await setDoc(doc(db, "users", uid), defaultKit);
          }
        } else {
          await setDoc(doc(db, "users", uid), defaultKit);
        }
      }
    });
  }, []);
  const showKits = () => {
    const hats = [];
    if (userKit) {
      let k: keyof typeof userKit;
      for (k in userKit) {
        for (const [key, value] of Object.entries(userKit[k])) {
          for (const kit in value) {
            const kitItem = value[kit];
            hats.push(
              <div>
                {kitItem.label}
                {kitItem.tempMax}
                {kitItem.tempMin}
                {kitItem.waterResistance}
              </div>
            );
          }
        }
      }
    }
    return hats;
  };

  return (
    <div>
      <h1>Hello, {auth.currentUser?.displayName}</h1>
      <p>Lets get your kit</p>
      <>{userKit && showKits()}</>
      <WeatherSetup/>
    </div>
  );
};
