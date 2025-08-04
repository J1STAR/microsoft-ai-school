"""
뉴스 앱의 API URL 설정을 통합 관리합니다.

이 모듈은 `project.urls`에 'api/' 경로로 포함(include)됩니다.
버전별 API URL을 이곳에서 분기하여 관리할 수 있습니다.
"""
from django.urls import path, include
from typing import List

# urlpatterns는 URL 패턴 리스트입니다.
# 'v1/' 경로로 시작하는 모든 요청을 `news.urls.v1` 모듈로 전달합니다.
urlpatterns: List[path] = [
    path("v1/", include("news.urls.v1")),
]
