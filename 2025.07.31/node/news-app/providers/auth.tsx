import React, { createContext, useState, useEffect } from "react";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    name: string,
    email: string,
    password: string,
    address: string,
    phone_number: string,
  ) => Promise<void>;
  signOut: () => void;
  isSignedIn?: boolean | null;
  isLoading: boolean;
  csrfToken: string | null;
  currentUser: User | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const checkSignedInUser = async () => {
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/v1/users/me`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          },
        );

        if (response.ok) {
          const userData = await response.json();
          setCurrentUser(userData.data);
          setCsrfToken(getCsrfToken());
          setIsSignedIn(true);
        } else {
          setIsSignedIn(false);
          setCurrentUser(null);
        }
      } catch {
        setIsSignedIn(false);
        setCurrentUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSignedInUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    const signInResponse = await fetch(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/v1/users/sign-in`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      },
    );

    if (!signInResponse.ok) {
      const signInData = await signInResponse.json();
      alert(signInData.message);
      return;
    }

    // 로그인 성공 후 사용자 정보 다시 가져오기
    const userResponse = await fetch(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/v1/users/me`,
      { credentials: "include" },
    );
    if (userResponse.ok) {
      const userData = await userResponse.json();
      setCurrentUser(userData.data);
    }

    setCsrfToken(getCsrfToken());
    setIsSignedIn(true);
  };

  const signUp = async (
    name: string,
    email: string,
    password: string,
    address: string,
    phone_number: string,
  ) => {
    const signUpResponse = await fetch(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/v1/users/sign-up`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          address,
          phone_number,
        }),
        credentials: "include",
      },
    );

    if (!signUpResponse.ok) {
      const signUpData = await signUpResponse.json();
      alert(signUpData.message);
      return;
    }

    // 회원가입 성공 시, 바로 로그인 상태로 만들어줍니다.
    alert(`환영합니다! ${name}님`);

    const userResponse = await fetch(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/v1/users/me`,
      { credentials: "include" },
    );
    if (userResponse.ok) {
      const userData = await userResponse.json();
      setCurrentUser(userData.data);
    }

    setCsrfToken(getCsrfToken());
    setIsSignedIn(true);
  };

  const signOut = () => {
    setIsSignedIn(false);
    setCurrentUser(null);
  };

  const getCsrfToken = () => {
    let cookieValue = null;
    const key = "csrftoken";

    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.substring(0, key.length + 1) === key + "=") {
          cookieValue = decodeURIComponent(cookie.substring(key.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        isSignedIn,
        isLoading,
        csrfToken,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
