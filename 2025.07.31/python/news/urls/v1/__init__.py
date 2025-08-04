"""
v1 API의 URL 설정을 통합하여 라우팅합니다.

이 모듈은 `news.urls`에서 'v1/' 경로로 포함되며,
`user`와 `news` 관련 엔드포인트를 각각 'users/'와 'news/'로 분기합니다.
"""
from django.urls import path, include
from typing import List

# urlpatterns는 URL 패턴 리스트입니다.
# 'users/'와 'news/' 경로를 각 앱의 URL 설정 파일로 전달합니다.
urlpatterns: List[path] = [
    path("users/", include("news.urls.v1.user")),
    path("news/", include("news.urls.v1.news")),
]
