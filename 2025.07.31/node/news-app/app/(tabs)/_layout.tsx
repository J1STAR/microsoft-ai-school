/**
 * 이 파일은 애플리케이션의 메인 탭 네비게이션 레이아웃을 정의합니다.
 * 화면 하단에 표시되는 탭 바와 각 탭에 해당하는 화면을 설정합니다.
 */
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

/**
 * TabLayout 컴포넌트
 * @description `expo-router`의 `Tabs`를 사용하여 탭 바 UI와 각 탭 화면을 구성합니다.
 * @returns {JSX.Element} 탭 레이아웃을 렌더링한 JSX 요소.
 */
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      // screenOptions: 모든 탭 화면에 공통적으로 적용될 옵션을 설정합니다.
      screenOptions={{
        // tabBarActiveTintColor: 활성화된 탭의 아이콘 및 텍스트 색상을 설정합니다.
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // headerShown: 각 탭 화면 상단의 헤더를 표시하지 않습니다.
        headerShown: false,
        // tabBarButton: 탭 버튼을 커스텀 컴포넌트(HapticTab)로 교체하여 햅틱 피드백을 추가합니다.
        tabBarButton: HapticTab,
        // tabBarBackground: 탭 바의 배경을 커스텀 컴포넌트(TabBarBackground)로 설정하여
        // iOS에서 블러 효과를 적용합니다.
        tabBarBackground: TabBarBackground,
        // tabBarStyle: 플랫폼(iOS/Android)에 따라 탭 바 스타일을 다르게 적용합니다.
        tabBarStyle: Platform.select({
          ios: {
            // iOS에서는 탭 바를 반투명하게 만들어 블러 효과가 보이도록 `absolute` 포지션을 사용합니다.
            position: 'absolute',
          },
          android: {
            // Android에서는 기본 스타일을 사용합니다.
          },
        }),
      }}>
      {/* 
        Tabs.Screen: 개별 탭을 정의합니다. `name` 속성은 파일 시스템 경로와 일치해야 합니다.
        (예: name="index"는 `app/(tabs)/index.tsx` 파일을 가리킵니다.)
      */}
      
      {/* 홈 탭 */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home', // 탭 바에 표시될 이름
          // tabBarIcon: 탭 아이콘을 렌더링하는 함수입니다.
          // `color` 파라미터는 탭의 활성/비활성 상태에 따라 `tabBarActiveTintColor` 또는 기본 색상을 받습니다.
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />

      {/* 탐색 탭 */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />

      {/* 뉴스 탭 */}
      <Tabs.Screen
        name="news"
        options={{
          title: 'News',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="newspaper.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
