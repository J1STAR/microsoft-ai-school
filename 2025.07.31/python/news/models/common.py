"""
이 파일은 데이터베이스 모델에서 공통적으로 사용될 기본 필드와 설정을 정의합니다.
"""
from django.db import models


class BaseModel(models.Model):
    """
    모든 모델이 공통적으로 상속받는 추상 기본 모델 클래스입니다.
    
    이 모델은 생성 시간(`created_at`)과 수정 시간(`updated_at`) 필드를 자동으로
    관리하여, 모든 데이터 레코드의 생성 및 마지막 수정 시점을 기록합니다.
    `abstract = True`로 설정되어 있어, 이 모델은 자체적으로 데이터베이스 테이블을
    생성하지 않고 다른 모델에 상속 용도로만 사용됩니다.

    Attributes:
        created_at (DateTimeField): 객체가 처음 생성된 날짜와 시간을 저장합니다.
                                  자동으로 현재 시간이 추가됩니다.
        updated_at (DateTimeField): 객체가 마지막으로 수정된 날짜와 시간을 저장합니다.
                                  객체가 저장될 때마다 현재 시간으로 갱신됩니다.
    """
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="생성일시")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="수정일시")

    class Meta:
        """
        BaseModel의 메타 옵션을 정의합니다.
        """
        abstract = True
