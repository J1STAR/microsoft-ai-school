import { createContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import useSessionStore, { SessionState } from "../store/session";
import api from "../utils/api";

interface AuthContextType {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    name: string,
    email: string,
    password: string,
    address: string,
    phone_number: string,
  ) => Promise<void>;
  signOut: () => Promise<void>;
  session: SessionState;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const session = useSessionStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = useSessionStore.persist.onFinishHydration(() => {
      setIsLoading(false);
    });

    // Check if hydration is already finished
    if (useSessionStore.persist.hasHydrated()) {
      setIsLoading(false);
    }

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const signInResponse = await api(
        `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/v1/users/sign-in`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      if (!signInResponse.ok) {
        const signInData = await signInResponse.json();
        alert(signInData.message);
        return;
      }

      // 로그인 성공 후 응답 본문에서 사용자 정보와 JWT 토큰을 추출
      const { data } = await signInResponse.json();

      if (data.access_token && data.refresh_token) {
        session.setTokens(data.access_token, data.refresh_token);
      }

      if (data.user) {
        session.setUser(data.user);
      }

      router.replace("/");
    } catch (error) {
      console.error("Sign in failed:", error);
      alert("로그인에 실패했습니다.");
    }
  };

  const signUp = async (
    name: string,
    email: string,
    password: string,
    address: string,
    phone_number: string,
  ) => {
    try {
      const signUpResponse = await api(
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
        },
      );

      if (!signUpResponse.ok) {
        const signUpData = await signUpResponse.json();
        alert(signUpData.message);
        return;
      }

      alert(`환영합니다! ${name}님. 로그인 페이지로 이동합니다.`);

      // 회원가입 성공 시, 로그인 페이지로 이동하여 로그인을 유도합니다.
      router.replace("/sign-in");
    } catch (error) {
      console.error("Sign up failed:", error);
      alert("회원가입에 실패했습니다.");
    }
  };

  const signOut = async () => {
    session.clearSession();
    router.replace("/sign-in");
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
