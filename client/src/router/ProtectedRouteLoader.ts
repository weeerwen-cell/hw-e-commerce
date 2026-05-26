import { redirect } from "react-router-dom";

export const authLoader = () => {
  const isAuth = !!localStorage.getItem("token");

  if (!isAuth) {
    return redirect("/login");
  }

  return null;
};