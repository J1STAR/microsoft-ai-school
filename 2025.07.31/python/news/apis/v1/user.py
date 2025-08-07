"""
이 파일은 사용자 인증(회원가입, 로그인) 및 사용자 정보 조회와 관련된
API 엔드포인트를 정의합니다.
"""

import datetime
from email_validator import validate_email, EmailNotValidError

from django.contrib.auth import authenticate
from django.http import HttpRequest, JsonResponse
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from news.models.user import User
from news.serializers.user import UserSerializer


class UserSignUpView(APIView):
    """
    사용자 회원가입을 처리하는 API 뷰입니다.
    """

    authentication_classes = ()
    permission_classes = ()

    def post(self, request: HttpRequest) -> JsonResponse:
        """
        POST 요청을 처리하여 사용자를 회원가입시킵니다.
        """
        email: str = request.data.get("email", "")
        password: str = request.data.get("password", "")
        name: str = request.data.get("name", "")
        address: str = request.data.get("address", "")
        phone_number: str = request.data.get("phone_number", "")

        if not email or not password or not name:
            return JsonResponse(
                {
                    "status": "BAD_REQUEST",
                    "message": "이메일, 비밀번호, 이름은 필수 항목입니다.",
                },
                status=400,
            )

        try:
            validate_email(email)
        except EmailNotValidError as e:
            return JsonResponse(
                {
                    "status": "BAD_REQUEST",
                    "message": "이메일 형식이 올바르지 않습니다.",
                },
                status=400,
            )

        if len(password) < 8:
            return JsonResponse(
                {
                    "status": "BAD_REQUEST",
                    "message": "비밀번호는 8자 이상이어야 합니다.",
                },
                status=400,
            )

        if address is not None:
            if len(address) > 255:
                return JsonResponse(
                    {
                        "status": "BAD_REQUEST",
                        "message": "주소는 255자 이하여야 합니다.",
                    },
                    status=400,
                )
        else:
            return JsonResponse(
                {"status": "BAD_REQUEST", "message": "주소는 필수 항목입니다."},
                status=400,
            )

        if phone_number is not None:
            if len(phone_number) > 20:
                return JsonResponse(
                    {
                        "status": "BAD_REQUEST",
                        "message": "전화번호는 20자 이하여야 합니다.",
                    },
                    status=400,
                )
        else:
            return JsonResponse(
                {"status": "BAD_REQUEST", "message": "전화번호는 필수 항목입니다."},
                status=400,
            )

        try:
            user = User.objects.create_user(
                email=email,
                password=password,
                name=name,
                address=address,
                phone_number=phone_number,
            )
        except Exception as e:
            print(e)
            return JsonResponse(
                {"status": "INTERNAL_SERVER_ERROR", "message": "회원가입 실패"},
                status=500,
            )

        user.save()

        return JsonResponse(
            {
                "status": "OK",
                "message": "회원가입 성공. 로그인을 진행해주세요.",
            },
            status=201,
        )


class UserSignInView(APIView):
    """
    사용자 로그인을 처리하고 JWT 토큰을 발급하는 API 뷰입니다.
    """

    authentication_classes = ()
    permission_classes = ()

    def post(self, request: HttpRequest) -> JsonResponse:
        email: str = request.data.get("email", "")
        password: str = request.data.get("password", "")

        if not email or not password:
            return JsonResponse(
                {
                    "status": "BAD_REQUEST",
                    "message": "이메일과 비밀번호는 필수 항목입니다.",
                },
                status=400,
            )

        user: User | None = authenticate(request, email=email, password=password)

        if user is None:
            return JsonResponse(
                {
                    "status": "WRONG_CREDENTIALS",
                    "message": "이메일 또는 비밀번호를 확인하세요.",
                },
                status=401,
            )

        # JWT 토큰 생성
        refresh = RefreshToken.for_user(user)
        user_data = UserSerializer(user).data

        return JsonResponse(
            {
                "status": "OK",
                "message": "로그인 성공",
                "data": {
                    "user": user_data,
                    "access_token": str(refresh.access_token),
                    "refresh_token": str(refresh),
                },
            }
        )


class UserMySelfView(APIView):
    """
    현재 로그인된 사용자의 정보를 조회하는 API 뷰입니다.
    JWT를 통해 인증된 사용자만 접근할 수 있습니다.
    """

    def get(self, request: HttpRequest) -> JsonResponse:
        """
        GET 요청을 처리하여 현재 로그인된 사용자의 정보를 반환합니다.
        """
        user: User = request.user

        if user.is_authenticated:
            user.last_login = datetime.datetime.now()
            user.save(update_fields=["last_login"])
            user_data = UserSerializer(user).data
            return JsonResponse(
                {
                    "status": "OK",
                    "message": "유저 정보를 조회하였습니다.",
                    "data": user_data,
                }
            )
        else:
            return JsonResponse(
                {"status": "UNAUTHORIZED", "message": "인증되지 않은 사용자입니다."},
                status=401,
            )
