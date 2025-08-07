import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Session {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
}

interface SessionActions {
  setTokens: (accessToken: string, refreshToken: string) => void;
  setUser: (user: User | null) => void;
  clearSession: () => void;
}

export type SessionState = Session & SessionActions;

const storage: StateStorage = {
  setItem: (name, value) => {
    if (Platform.OS === "web") {
      return localStorage.setItem(name, value);
    }
    return SecureStore.setItemAsync(name, value);
  },
  getItem: async (name) => {
    if (Platform.OS === "web") {
      return localStorage.getItem(name);
    }
    return await SecureStore.getItemAsync(name);
  },
  removeItem: (name) => {
    if (Platform.OS === "web") {
      return localStorage.removeItem(name);
    }
    return SecureStore.deleteItemAsync(name);
  },
};

const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      setUser: (user) => set({ user }),
      clearSession: () =>
        set({ accessToken: null, refreshToken: null, user: null }),
    }),
    {
      name: "session-storage",
      storage: createJSONStorage(() => storage),
    },
  ),
);

export default useSessionStore;
