"""
이 파일은 애플리케이션의 사용자 모델과 사용자 관리를 위한 매니저 클래스를 정의합니다.

Django의 기본 사용자 모델(`AbstractBaseUser`)을 확장하여,
이메일을 주 식별자(username)로 사용하는 커스텀 `User` 모델을 구현합니다.
"""
from typing import Any

from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models

from news.models.common import BaseModel


class UserManager(BaseUserManager):
    """
    커스텀 `User` 모델을 위한 매니저 클래스입니다.

    `create_user`, `create_superuser`와 같은 메서드를 제공하여
    사용자 생성 로직을 중앙에서 관리합니다.
    """
    use_in_migrations = True

    def _create_user(self, username: str, password: str, **extra_fields: Any) -> "User":
        """
        사용자 이름과 비밀번호로 사용자를 생성하고 저장하는 내부 메서드입니다.

        Args:
            username (str): 사용자의 이메일 주소.
            password (str): 사용자의 비밀번호.
            **extra_fields (Any): 사용자의 추가 필드.

        Raises:
            ValueError: 사용자 이름(이메일)이 제공되지 않은 경우.

        Returns:
            User: 생성된 사용자 객체.
        """
        if not username:
            raise ValueError("The given username must be set")
        # 이메일 주소를 정규화합니다 (예: 도메인 소문자 변환).
        username = self.model.normalize_username(username)
        user = self.model(username=username, **extra_fields)
        # 비밀번호를 해시하여 저장합니다.
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username: str, password: str | None = None, **extra_fields: Any) -> "User":
        """
        일반 사용자를 생성합니다.

        `is_superuser` 필드를 기본적으로 `False`로 설정합니다.

        Args:
            username (str): 사용자의 이메일 주소.
            password (str | None): 사용자의 비밀번호.
            **extra_fields (Any): 사용자의 추가 필드.

        Returns:
            User: 생성된 일반 사용자 객체.
        """
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(username, password, **extra_fields)

    def create_superuser(self, username: str, password: str, **extra_fields: Any) -> "User":
        """
        관리자(superuser)를 생성합니다.

        `is_superuser` 필드를 `True`로 설정합니다.

        Args:
            username (str): 관리자의 이메일 주소.
            password (str): 관리자의 비밀번호.
            **extra_fields (Any): 관리자의 추가 필드.

        Raises:
            ValueError: `is_superuser`가 `True`가 아닌 경우.

        Returns:
            User: 생성된 관리자 객체.
        """
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(username, password, **extra_fields)


class User(BaseModel, AbstractBaseUser, PermissionsMixin):
    """
    애플리케이션의 커스텀 사용자 모델입니다.

    `BaseModel`을 상속받아 생성/수정 시간을 기록하고,
    `AbstractBaseUser`와 `PermissionsMixin`을 상속받아
    Django의 인증 시스템과 완벽하게 호환됩니다.

    이메일 주소를 사용자 이름(`USERNAME_FIELD`)으로 사용합니다.

    Attributes:
        username (EmailField): 사용자의 이메일 주소. 고유해야 합니다.
        name (CharField): 사용자의 이름.
        objects (UserManager): 커스텀 사용자 매니저.
    """
    USERNAME_FIELD = 'username'
    # superuser 생성 시 'username' 필드는 USERNAME_FIELD로 자동 포함되므로
    # REQUIRED_FIELDS에 추가할 필요가 없습니다.
    REQUIRED_FIELDS: list[str] = ['name']

    username = models.EmailField(
        max_length=50, unique=True, verbose_name="이메일",
        help_text="로그인 시 사용될 사용자의 이메일 주소입니다."
    )
    name = models.CharField(
        max_length=30, null=True, blank=True, verbose_name="이름",
        help_text="사용자의 실명 또는 별명입니다."
    )
    
    objects = UserManager()

    class Meta:
        """User 모델의 메타 옵션을 정의합니다."""
        verbose_name = "유저"
        verbose_name_plural = verbose_name

    def __str__(self) -> str:
        """
        객체를 문자열로 표현할 때 이메일과 이름을 함께 반환합니다.

        Returns:
            str: "이메일 (이름)" 형식의 문자열.
        """
        return f"{self.username} ({self.name})"
