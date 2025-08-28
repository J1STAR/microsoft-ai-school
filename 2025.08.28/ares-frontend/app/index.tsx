import { Link } from "expo-router";
import { View } from "react-native";

import { Text } from "@rneui/themed";
import { useTranslation } from "react-i18next";

export default function Index() {
  const { t } = useTranslation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
      }}
    >
      <Text style={{ fontSize: 64, fontWeight: "bold" }}>
        {t("welcome")}
      </Text>

      <Link href="/example">Go to Example</Link>
    </View>
  );
}
