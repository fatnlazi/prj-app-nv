import React, { useEffect, useState } from "react";
import {
  deleteApp,
  initializeApp,
  FirebaseApp,
  FirebaseOptions,
} from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  Auth,
  User,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  FirebaseStorage,
} from "firebase/storage";
import {
  addDoc,
  collection,
  getFirestore,
} from "firebase/firestore";

const option: FirebaseOptions = {
  apiKey: "AIzaSyBs9GIUpsl_sIY-phgfFmsiipxZUkPG7DM",
  appId: "1:590581896510:web:5d3232bb7ad34f16ba886f",
  authDomain: "project-app-nhanvan.firebaseapp.com",
  projectId: "project-app-nhanvan",
  messagingSenderId: "590581896510",
  storageBucket: "gs://project-app-nhanvan.appspot.com/",
};

export const name = "prjAppNhanVan";

export const app = initializeApp(option, name);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

export async function storageUploadAsync(
  uri: string,
  path: string,
): Promise<string> {
  let url = "";
  const storageRef = ref(storage, path);
  const blob = await fetch(uri).then((r) => r.blob());
  await uploadBytes(storageRef, blob);
  url = await getDownloadURL(storageRef);
  return url;
}

export async function storageGetDownloadURLAsync(
  path: string,
): Promise<string> {
  let url = "";
  const storageRef = ref(storage, path);
  url = await getDownloadURL(storageRef);
  return url;
}

export async function authSignUp(
  email: string,
  password: string,
): Promise<User | undefined> {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((err) => {
      console.log(err);
    });
  return undefined;
}

export async function authSignIn(
  email: string,
  password: string,
): Promise<User | undefined> {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((err) => {
      console.log(err);
    });
  return undefined;
}

export async function dbAddDataAsync(data) {
  try {
    const docRef = await addDoc(collection(db, "users"), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
