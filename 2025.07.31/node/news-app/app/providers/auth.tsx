import React, { createContext, useState, useEffect } from "react";

interface AuthContextType {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  isSignedIn?: boolean | null;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

    setIsSignedIn(true);
  };

  const signOut = () => {
    setIsSignedIn(false);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, isSignedIn, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
