//ts-ignore
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { db } from "../firebase";
const defaultKit = {
  hat: {
    baseLayer: [],
    outerLayer: [
      {
        label: "Helmet",
        id: 0,
        tempMin: -20,
        tempMax: 100,
      },
    ],
    overLayer: [],
  },
  torso: {
    baseLayer: [
      {
        label: "warm Baselayer",
        id: 0,
        tempMin: -10,
        tempMax: 15,
      },
    ],
    outerLayer: [
      {
        label: "Long Sleeve Jersey",
        id: 0,
        tempMin: -10,
        tempMax: 10,
      },
      {
        label: "Short Sleeve Jersey",
        id: 1,
        tempMin: 10,
        tempMax: 40,
      },
    ],
    overLayer: [
      {
        label: "Rain Jacket",
        id: 0,
        tempMin: -10,
        tempMax: 10,
        waterResistance: false,
      },
    ], // Rain Jacket
  },
  legs: {
    baseLayer: [],
    outerLayer: [
      {
        label: "Warm Bib Tights",
        id: 0,
        tempMin: -10,
        tempMax: 10,
      },
      {
        label: "Bib Shorts",
        id: 1,
        tempMin: 10,
        tempMax: 40,
      },
    ],
    overLayer: [],
  },
  feet: {
    baseLayer: [
      {
        label: "Warm socks",
        id: 0,
        tempMin: -10,
        tempMax: 15,
      },
      {
        label: "light socks",
        id: 1,
        tempMin: 15,
        tempMax: 40,
      },
    ],
    outerLayer: [
      {
        label: "Cycling Shoes",
        id: 0,
        tempMin: 0,
        tempMax: 0,
      },
    ],
    overLayer: [
      {
        label: "Overshoes",
        id: 0,
        tempMin: -10,
        tempMax: 10,
      },
    ],
  },
  hands: {
    baseLayer: [],
    outerLayer: [
      {
        label: "Gloves",
        id: 0,
        tempMin: -10,
        tempMax: 10,
      },
    ],
    overLayer: [],
  },
};

export const KitSetup = () => {
  const setupKit = async () => {
    console.log("Setting up kit...");
    const tomfordRef = doc(db, "users", "tomford");
    await updateDoc(tomfordRef, {
      hands: {
        baseLayer: [
          {
            label: "Merino Liner",
            id: 0,
            tempMin: -10,
            tempMax: 4,
          },
        ],
      },
    });
    // "hands": "baseLayer": {
    //     id: 0,
    //     label: "Warm Gloves",
    //     tempMin: -10,
    //     tempMax: 10,
    // })
    // await setDoc(doc(db, "users", "tomford"), defaultKit);
  };

  const [kit, setKit] = useState({});

  useEffect(() => {
    const retrieveUsers = async () => {
      // const userCollectionRef = ;
      const userSnapshot = await getDocs(collection(db, "users"));
      console.log("User Snaps: ", userSnapshot);
      userSnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
      // console.log("Colleciton: ", userCollectionRef);
    };

    const retrieveKit = async () => {
      const tomfordRef = doc(db, "users", "tomford");
      const docSnap = await getDoc(tomfordRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setKit(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    retrieveUsers();
    retrieveKit();
  }, []);

  return (
    <div>
      Kit Setup.<button onClick={() => setupKit()}>Basic Kit</button>
      {kit && kitFormat()}
    </div>
  );
};
