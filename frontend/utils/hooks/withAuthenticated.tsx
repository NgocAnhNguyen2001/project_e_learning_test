import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { Role } from "@/types/Auth";

import { useStore } from "./zustand";

const routes = {
  "/adult": Role.Parent,
  "/student": Role.Student,
  "/navigator": Role.Teacher,
};

const withAuthenticated = <T,>(
  Component: React.ComponentType<T>,
): React.ComponentType<T> => {
  const WithAuthenticated: React.FC<T> = (props) => {
    const router = useRouter();
    const accessToken = useStore((state) => state.auth?.accessToken || null);
    const logout = useStore((state) => state.logout);
    const user = useStore((state) => state.user);
    const [isAllowed, setIsAllowed] = React.useState(false);

    useEffect((): void => {
      let allowed = true;
      if (!accessToken || !user) {
        allowed = false;
      }
      if (accessToken) {
        const decoded = jwt_decode(accessToken);
        const now = new Date().getTime();
        const timeDiff = (decoded as any).exp * 1000 - now;
        if (timeDiff < 0) {
          allowed = false;
        }
      }
      for (const key in routes) {
        if (router.pathname.startsWith(key)) {
          if (
            !allowed ||
            !user ||
            !user.role ||
            user.role !== (routes as any)[key]
          ) {
            // If we are checking the /parent path, we need to see if they are a parent trying to sign in
            // This is indicated by the router.query.childLogin property
            // This occurs because the user is set before the router is finished pushing
            if (
              key === "/adult" &&
              ((router.query.childLogin &&
                router.query.childLogin === "true") ||
                user?.role === "STUDENT")
            ) {
              router.push({
                query: { childLogin: true },
                pathname: "/student/home",
              });
              break;
            }

            allowed = false;
            logout();
            router.push(
              `${key == "/navigator" ? "/navigator/" : "/"}auth/login${
                !key.includes("navigator")
                  ? `?type=${key.includes("adult") ? "adult" : "student"}`
                  : ""
              }`,
            );
            break;
          }
        }
      }
      if (Cookies.get("authorized") || Cookies.get("role")) {
        Cookies.remove("authorized");
        Cookies.remove("role");
      }
      if (allowed) {
        Cookies.set("authorized", "true");
        Cookies.set("role", String(user?.role));
      }
      // If all checks pass, means they are allowed
      setIsAllowed(allowed);
    }, [router, accessToken, user, isAllowed, setIsAllowed, logout]);

    return (
      <>
        {
          isAllowed ? <Component {...props} /> : null // Show loading here
        }
      </>
    );
  };

  return WithAuthenticated;
};

export default withAuthenticated;
