"""
뉴스 데이터 관련 API 엔드포인트의 URL을 정의합니다.

이 URL 설정은 `news.urls.v1` 모듈의 `news/` 경로에 포함(include)되어 사용됩니다.
전체 URL 경로는 `api/v1/news/`가 됩니다.
"""
from django.urls import path
from news.apis.v1.news import NewsItemListAPIView

urlpatterns = [
    # /v1/news/
    # 뉴스 기사 목록을 조회하는 엔드포인트입니다.
    # GET 요청을 통해 전체 뉴스 목록을 반환합니다.
    path("", NewsItemListAPIView.as_view(), name="news-list"),
]
