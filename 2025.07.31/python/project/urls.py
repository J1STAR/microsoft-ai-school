"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

# `urlpatterns` 리스트는 URL 패턴과 해당 패턴을 처리할 뷰 또는 다른 URLconf 모듈을 매핑합니다.
urlpatterns = [
    # 'admin/' 경로로 들어오는 모든 요청을 Django 관리자 사이트로 라우팅합니다.
    path('admin/', admin.site.urls),

    # 'v1/users' 경로로 시작하는 모든 요청을 `news.urls.v1.user` 모듈로 전달합니다.
    # 이 모듈은 사용자 인증(로그인, 로그아웃 등)과 관련된 URL을 처리합니다.
    path('v1/users', include('news.urls.v1.user')),

    # 'v1/news' 경로로 시작하는 모든 요청을 `news.urls.v1.news` 모듈로 전달합니다.
    # 이 모듈은 뉴스 데이터(목록 조회 등)와 관련된 URL을 처리합니다.
    path('v1/news', include('news.urls.v1.news')),
]
