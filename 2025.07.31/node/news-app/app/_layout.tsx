/**
 * 이 파일은 애플리케이션의 최상위 레이아웃을 정의합니다.
 * 모든 화면에 공통적으로 적용되는 폰트, 테마, 네비게이션 구조 등을 설정합니다.
 */
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/useColorScheme';

import { TamaguiProvider } from 'tamagui';

import { tamaguiConfig } from '../tamagui.config';

/**
 * RootLayout 컴포넌트
 * @description 앱의 전체적인 구조와 테마를 설정하는 최상위 컴포넌트입니다.
 * @returns {JSX.Element | null} 폰트가 로드되지 않았을 경우 null을, 로드되었을 경우 앱의 루트 레이아웃을 반환합니다.
 */
export default function RootLayout() {
  // 현재 디바이스의 컬러 스킴(dark/light)을 가져옵니다.
  const colorScheme = useColorScheme();
  
  // 앱에서 사용할 커스텀 폰트를 로드합니다.
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // 폰트가 로딩 중일 때는 아무것도 렌더링하지 않습니다.
  // Expo에서는 폰트 로딩이 완료될 때까지 스플래시 화면이 기본적으로 보여집니다.
  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    
    <SafeAreaProvider>
      {/* TamaguiProvider: Tamagui UI 라이브러리를 앱 전체에 적용하기 위한 컨텍스트 프로바이더입니다. */}
      {/* config: Tamagui의 설정을 전달합니다. */}
      {/* defaultTheme: 앱의 기본 테마를 디바이스의 컬러 스킴에 맞춰 설정합니다. */}
      <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
        {/* ThemeProvider: React Navigation의 테마를 설정하는 컨텍스트 프로바이더입니다. */}
        {/* value: 컬러 스킴에 따라 다크 모드 또는 라이트 모드 테마를 적용합니다. */}
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <SafeAreaView style={{ flex: 1 }} edges={['top']}>
            {/* Stack: Expo Router의 스택 네비게이터입니다. 화면들을 스택처럼 쌓아 관리합니다. */}
            <Stack>
              {/* (tabs) 경로에 해당하는 화면 그룹을 스택에 추가합니다. */}
              {/* headerShown: false 옵션으로 탭 화면 자체의 헤더는 숨깁니다. */}
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

              {/* 일치하는 경로가 없을 때 보여줄 404 에러 화면을 스택에 추가합니다. */}
              <Stack.Screen name="+not-found" />
            </Stack>

            {/* StatusBar: 디바이스 상단 상태 표시줄의 스타일을 설정합니다. */}
            {/* style="auto"는 현재 테마(dark/light)에 맞춰 아이콘 색상을 자동으로 조정합니다. */}
            <StatusBar style="auto" />
          </SafeAreaView>
        </ThemeProvider>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}
