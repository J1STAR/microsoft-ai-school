import "@/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ButtonGroup, Header } from "@rneui/themed";
import { Stack } from "expo-router";
import { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const supportLanguages = ["en", "ko"];

function StackLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      }}
    />
  );
}

export default function RootLayout() {
  const { i18n } = useTranslation();

  const changeLanguage = async (language: "en" | "ko") => {
    i18n.changeLanguage(language);
    await AsyncStorage.setItem("@app_language", language);
  };

  const [selectedIndex, setSelectedIndex] = useState(
    supportLanguages.indexOf(i18n.language),
  );

  useEffect(() => {
    if (i18n.language) {
      const initialIndex = supportLanguages.indexOf(i18n.language);
      if (initialIndex !== -1) {
        setSelectedIndex(initialIndex);
      }
    }
  }, [i18n.language]);

  return (
    <Suspense fallback={null}>
      <SafeAreaProvider>
        <Header
          centerComponent={{
            text: "React Native",
            style: {
              fontSize: 32,
              fontWeight: "bold",
              color: "#fff",
              justifyContent: "center",
            },
          }}
          rightComponent={
            <ButtonGroup
              buttons={supportLanguages.map((language) =>
                language.toUpperCase(),
              )}
              selectedIndex={selectedIndex}
              onPress={(value) => {
                setSelectedIndex(value);
                changeLanguage(supportLanguages[value] as "en" | "ko");
              }}
            />
          }
        />
        <StackLayout />
      </SafeAreaProvider>
    </Suspense>
  );
}
