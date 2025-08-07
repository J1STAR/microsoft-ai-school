import useSessionStore from "../store/session";

const api = async (
  url: string,
  options: RequestInit = {},
): Promise<Response> => {
  const { accessToken } = useSessionStore.getState();

  const headers = new Headers(options.headers);

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // TODO: 401 응답 시 토큰 갱신 로직 추가
  if (response.status === 401) {
    // 1. Refresh Token으로 새로운 Access Token 요청
    // 2. 성공 시, 새로운 토큰으로 원래 요청 재시도
    // 3. 실패 시, 로그아웃 처리
    console.log("Token expired or invalid.");
  }

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "An unknown error occurred" }));
    throw new Error(errorData.message || "API request failed");
  }

  return response;
};

export default api;
