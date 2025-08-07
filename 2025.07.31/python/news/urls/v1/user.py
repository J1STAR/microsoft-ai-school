"""
사용자 인증 및 정보 관련 API 엔드포인트의 URL을 정의합니다.

이 URL 설정은 `news.urls.v1` 모듈의 `users/` 경로에 포함(include)되어 사용됩니다.
전체 URL 경로는 `api/v1/users/`가 됩니다.
"""
from django.urls import path
from news.apis.v1.user import UserSignInView, UserMySelfView, UserSignUpView

urlpatterns = [
    # /v1/users/sign-up
    # 사용자 회원가입을 처리하는 엔드포인트입니다.
    # POST 요청을 통해 이메일, 비밀번호, 이름을 받아 회원가입을 수행합니다.
    path("sign-up", UserSignUpView.as_view(), name="user-sign-up"),

    # /v1/users/sign-in
    # 사용자 로그인을 처리하는 엔드포인트입니다.
    # POST 요청을 통해 이메일과 비밀번호를 받아 인증을 수행합니다.
    path("sign-in", UserSignInView.as_view(), name="user-sign-in"),

    # /v1/users/me
    # 현재 로그인된 사용자의 정보를 조회하는 엔드포인트입니다.
    # GET 요청을 통해 인증된 사용자의 정보를 반환합니다.
    path("me", UserMySelfView.as_view(), name="user-me"),
]
