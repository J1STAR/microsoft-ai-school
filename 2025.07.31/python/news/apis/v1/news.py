"""
이 파일은 뉴스 목록을 제공하는 API 엔드포인트를 정의합니다.
"""
from typing import Dict, Any

from django.http import HttpRequest, JsonResponse
from rest_framework.views import APIView

from news.models import NewsItem
from news.serializers.news import NewsItemSerializer


class NewsItemListAPIView(APIView):
    """
    뉴스 기사 목록을 조회하기 위한 API 뷰입니다.

    이 뷰는 클라이언트(예: 모바일 앱)의 요청에 따라 데이터베이스에 저장된
    모든 뉴스 기사 목록을 JSON 형식으로 반환합니다.
    """

    def get(self, request: HttpRequest, *args: Any, **kwargs: Any) -> JsonResponse:
        """
        GET 요청을 처리하여 모든 뉴스 기사 목록을 반환합니다.

        데이터베이스에서 모든 `NewsItem` 객체를 가져와 최신 발행일 순으로 정렬합니다.
        정렬된 데이터는 `NewsItemSerializer`를 통해 직렬화되어 JSON 응답으로
        클라이언트에게 전달됩니다.

        Args:
            request (HttpRequest): 클라이언트로부터 받은 HTTP 요청 객체.
            *args: 추가적인 위치 인수.
            **kwargs: 추가적인 키워드 인수.

        Returns:
            JsonResponse: API 응답. 다음 키를 포함하는 딕셔너리를 JSON으로 변환한 값입니다.
                - "status" (str): 응답 상태 (항상 "OK").
                - "message" (str): 응답에 대한 설명 메시지.
                - "data" (list): 직렬화된 뉴스 기사 객체의 리스트.
        """
        # 데이터베이스에서 모든 NewsItem 객체를 가져와 발행일(pub_date)의
        # 내림차순(최신순)으로 정렬합니다.
        news_items = NewsItem.objects.all().order_by("-pub_date")

        # 쿼리셋(news_items)을 NewsItemSerializer를 사용하여 직렬화합니다.
        # many=True 옵션은 쿼리셋에 여러 개의 아이템이 포함되어 있음을 나타냅니다.
        serializer = NewsItemSerializer(news_items, many=True)

        # 최종 응답 데이터를 구성합니다.
        response_data: Dict[str, Any] = {
            "status": "OK",
            "message": "뉴스 목록을 조회하였습니다.",
            "data": serializer.data
        }

        return JsonResponse(response_data)
