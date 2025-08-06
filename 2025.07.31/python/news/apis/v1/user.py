"""
이 파일은 사용자 인증(로그인, 로그아웃) 및 사용자 정보 조회와 관련된
API 엔드포인트를 정의합니다.
"""
import datetime
from typing import Dict, Any
from email_validator import validate_email, EmailNotValidError

from django.contrib.auth import authenticate, login, logout
from django.http import HttpRequest, JsonResponse
from rest_framework.views import APIView

from news.models.user import User


class UserSignUpView(APIView):
    """
    사용자 회원가입을 처리하는 API 뷰입니다.
    """
    def post(self, request: HttpRequest) -> JsonResponse:
        """
        POST 요청을 처리하여 사용자를 회원가입시킵니다.
        """

        email: str = request.data.get("email", '')
        password: str = request.data.get("password", '')
        name: str = request.data.get("name", '')
        
        if not email or not password or not name:
            return JsonResponse({
                "status": "BAD_REQUEST",
                "message": "이메일, 비밀번호, 이름은 필수 항목입니다."
            }, status=400)
        
        try:
            validate_email(email)
        except EmailNotValidError as e:
            return JsonResponse({
                "status": "BAD_REQUEST",
                "message": "이메일 형식이 올바르지 않습니다."
            }, status=400)


        if len(password) < 8:
            return JsonResponse({
                "status": "BAD_REQUEST",
                "message": "비밀번호는 8자 이상이어야 합니다."
            }, status=400)

        try:
            user = User.objects.create_user(email=email, password=password, name=name)
        except Exception as e:
            print(e)
            return JsonResponse({
                "status": "INTERNAL_SERVER_ERROR",
                "message": "회원가입 실패"
            }, status=500)
        
        user.save()
        login(request, user)
        
        return JsonResponse({
            "status": "OK",
            "message": "회원가입 성공"
        })


class UserSignInView(APIView):
    """
    사용자 로그인을 처리하는 API 뷰입니다.

    POST 요청을 통해 사용자로부터 이메일(email)과 비밀번호를 받아
    인증을 시도하고, 성공 시 세션을 생성(로그인)합니다.
    """
    # 이 뷰는 인증되지 않은 사용자도 접근할 수 있어야 하므로,
    # 기본 인증 및 권한 클래스를 비활성화하거나 AllowAny로 설정합니다.
    authentication_classes = ()
    permission_classes = ()

    def post(self, request: HttpRequest) -> JsonResponse:
        """
        POST 요청을 처리하여 사용자를 인증하고 로그인시킵니다.

        Args:
            request (HttpRequest): 클라이언트로부터 받은 HTTP 요청 객체.
                                   요청 본문(body)에 `email`과 `password`가
                                   포함되어야 합니다.

        Returns:
            JsonResponse: 인증 결과에 따른 JSON 응답.
                - 성공 시: status "OK"와 함께 사용자 정보를 반환합니다.
                - 실패 시: 401 Unauthorized 상태 코드와 함께 오류 메시지를 반환합니다.
        """
        email: str = request.data.get("email", '')
        password: str = request.data.get("password", '')

        if not email or not password:
            return JsonResponse({
                "status": "BAD_REQUEST",
                "message": "이메일과 비밀번호는 필수 항목입니다."
            }, status=400)

        # `authenticate` 함수는 제공된 자격 증명이 유효하면 사용자 객체를,
        # 그렇지 않으면 None을 반환합니다.
        user: User | None = authenticate(request, email=email, password=password)

        if user is None:
            return JsonResponse({
                "status": "WRONG_CREDENTIALS",
                "message": "이메일 또는 비밀번호를 확인하세요."
            }, status=401)

        # 인증에 성공하면 `login` 함수를 통해 사용자의 세션을 생성합니다.
        # 이로써 후속 요청에서 `request.user`로 사용자 정보에 접근할 수 있게 됩니다.
        login(request, user)

        return JsonResponse({
            "status": "OK",
            "message": "로그인 성공",
            "data": {"email": user.email}
        })


class UserMySelfView(APIView):
    """
    현재 로그인된 사용자의 정보를 조회하는 API 뷰입니다.

    인증된 사용자만 이 엔드포인트에 접근할 수 있습니다.
    """

    def get(self, request: HttpRequest) -> JsonResponse:
        """
        GET 요청을 처리하여 현재 로그인된 사용자의 정보를 반환합니다.

        요청을 보낸 사용자의 `last_login` 필드를 현재 시간으로 업데이트합니다.

        Args:
            request (HttpRequest): 클라이언트로부터 받은 HTTP 요청 객체.
                                   `request.user`에 인증된 사용자 정보가 포함됩니다.

        Returns:
            JsonResponse: 사용자 정보를 담은 JSON 응답.
        """
        user: User = request.user

        # request.user가 실제로 인증된 User 객체인지 확인합니다.
        # IsAuthenticated 권한 클래스가 이 검사를 이미 수행하지만,
        # 코드의 명확성을 위해 한 번 더 확인합니다.
        if user.is_authenticated:
            # 마지막 로그인 시간을 현재 시간으로 갱신합니다.
            user.last_login = datetime.datetime.now()
            user.save(update_fields=['last_login'])

            user_dict: Dict[str, Any] = {
                "id": user.id,
                "email": user.email,
                "name": user.name,
                "last_login": user.last_login.strftime("%Y-%m-%d %H:%M:%S")
            }

            return JsonResponse({
                "status": "OK",
                "message": "유저 정보를 조회하였습니다.",
                "data": user_dict
            })
        else:
            # 이 코드는 IsAuthenticated 설정 상 도달하기 어렵지만,
            # 예외적인 경우를 대비하여 남겨둡니다.
            return JsonResponse({
                "status": "UNAUTHORIZED",
                "message": "인증되지 않은 사용자입니다."
            }, status=401)


class UserSignOutView(APIView):
    """
    사용자 로그아웃을 처리하는 API 뷰입니다.
    """

    def post(self, request: HttpRequest) -> JsonResponse:
        """
        POST 요청을 처리하여 현재 사용자를 로그아웃시킵니다.

        `logout` 함수를 호출하여 현재 요청과 연결된 세션 데이터를 삭제합니다.

        Args:
            request (HttpRequest): 클라이언트로부터 받은 HTTP 요청 객체.

        Returns:
            JsonResponse: 로그아웃 성공 메시지를 담은 JSON 응답.
        """
        logout(request)

        return JsonResponse({
            "status": "OK",
            "message": "로그아웃 되었습니다."
        })
