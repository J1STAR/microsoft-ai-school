import React, { createContext, useState, useEffect } from "react";

interface AuthContextType {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  isSignedIn?: boolean | null;
  isLoading: boolean;
  csrfToken: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

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
          setCsrfToken(getCsrfToken());
          setIsSignedIn(true);
        } else {
          setIsSignedIn(false);
        }
      } catch {
        setIsSignedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSignedInUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    let signInResponse = await fetch(
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

    setCsrfToken(getCsrfToken());
    setIsSignedIn(true);
  };

  const signUp = async (name: string, email: string, password: string) => {
    const signUpResponse = await fetch(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/v1/users/sign-up`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
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
    setCsrfToken(getCsrfToken());
    setIsSignedIn(true);
  };

  const signOut = () => {
    setIsSignedIn(false);
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
      value={{ signIn, signUp, signOut, isSignedIn, isLoading, csrfToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
