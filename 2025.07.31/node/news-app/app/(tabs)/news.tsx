/**
 * 이 파일은 뉴스 목록을 표시하는 화면을 정의합니다.
 * 백엔드 API로부터 뉴스 데이터를 가져와 사용자에게 리스트 형태로 보여줍니다.
 */
import { useState, useEffect } from "react";
import { Text, Anchor, YStack, YGroup, XGroup, ScrollView } from "tamagui";

/**
 * @interface NewsItem
 * @description 뉴스 기사 항목의 데이터 구조를 정의하는 인터페이스입니다.
 * @property {string} id - 뉴스의 고유 ID.
 * @property {string} title - 뉴스 기사의 제목.
 * @property {string} pub_date - 기사 발행일.
 * @property {string} source - 뉴스 출처.
 * @property {string} link - 원본 기사 링크.
 */
interface NewsItem {
  id: string;
  title: string;
  pub_date: string;
  source: string;
  link: string;
}

/**
 * NewsScreen 컴포넌트
 * @description 뉴스 기사 목록을 표시하는 메인 화면 컴포넌트입니다.
 * @returns {React.ReactNode} 뉴스 목록 화면을 렌더링한 JSX 요소.
 */
export default function NewsScreen(): React.ReactNode {
  /**
   * 뉴스 목록 데이터를 저장하는 상태 변수입니다.
   * @type {NewsItem[]} - 뉴스 아이템 객체의 배열.
   */
  const [newsList, setNewsList] = useState<NewsItem[]>([]);

  /**
   * 개별 뉴스 아이템을 렌더링하는 함수입니다.
   * @param {{ item: NewsItem }} props - 렌더링할 뉴스 아이템을 포함하는 객체.
   * @returns {React.ReactNode} 한 개의 뉴스 아이템에 대한 JSX 요소.
   */

  const renderItem = ({ item }: { item: NewsItem }): React.ReactNode => {
    return (
      // Anchor 컴포넌트는 웹의 <a> 태그와 유사하게 동작하며, 클릭 시 지정된 URL로 이동합니다.
      <Anchor
        key={item.id}
        href={item.link}
        style={{
          padding: 16,
          borderBottomWidth: 1,
          borderColor: "#e5e7eb",
          backgroundColor: "#fff",
          textDecorationLine: "none", // 밑줄 제거
        }}
      >
        <YGroup style={{ gap: 4 }}>
          {/* 뉴스 제목 */}
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#222" }}>
            {item.title}
          </Text>
          {/* 발행일과 출처 정보 */}
          <XGroup
            style={{
              gap: 2,
              alignItems: "center",
              fontSize: 12,
              color: "#6b7280",
            }}
          >
            <Text>{item.pub_date}</Text>
            <Text> | </Text>
            <Text>{item.source}</Text>
          </XGroup>
        </YGroup>
      </Anchor>
    );
  };

  // 컴포넌트가 처음 마운트될 때 한 번만 실행되는 효과(Effect)입니다.
  useEffect(() => {
    // 백엔드 API에 GET 요청을 보내 뉴스 데이터를 가져옵니다.
    fetch("http://127.0.0.1:8000/api/v1/news")
      .then((res) => res.json()) // 응답을 JSON 형태로 파싱합니다.
      .then((responseJson) => {
        // API 응답 데이터 구조에 맞게 실제 뉴스 목록을 추출합니다.
        // (예: { status: "OK", message: "...", data: [...] })
        const newsData = responseJson.data.map((item: NewsItem) => ({
          id: item.id,
          title: item.title,
          pub_date: item.pub_date, // 날짜 형식을 현지화
          source: item.source,
          link: item.link,
        }));

        // 가져온 데이터로 newsList 상태를 업데이트합니다.
        setNewsList(newsData);
      })
      .catch((error) => {
        // 네트워크 요청이나 처리 과정에서 오류가 발생했을 때 콘솔에 로그를 남깁니다.
        console.error("Failed to fetch news:", error);
      });
  }, []); // 빈 배열을 두 번째 인자로 전달하여 마운트 시에만 실행되도록 합니다.

  return (
    // YStack은 자식 요소들을 수직으로 쌓는 레이아웃 컴포넌트입니다.
    <ScrollView>
      <YStack style={{ flex: 1 }}>
        {/* newsList 배열을 순회하며 각 아이템을 renderItem 함수를 통해 렌더링합니다. */}
        {newsList.map((item) => renderItem({ item }))}
      </YStack>
    </ScrollView>
  );
}
