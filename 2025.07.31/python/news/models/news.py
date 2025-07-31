"""
이 파일은 뉴스 채널 및 개별 뉴스 기사와 관련된 데이터베이스 모델을 정의합니다.

이 모듈은 `NewsChannel`과 `NewsItem` 두 가지 주요 모델을 포함하며,
이는 각각 뉴스 소스(RSS 피드 등)와 개별 뉴스 항목을 나타냅니다.
"""
from django.db import models

from news.models.common import BaseModel


class NewsChannel(BaseModel):
    """
    뉴스 채널(RSS 피드)의 메타데이터를 저장하는 모델입니다.

    이 모델은 각 뉴스 소스의 기본적인 정보(예: 채널명, 링크, 설명)를 관리합니다.
    크롤러를 통해 수집된 RSS 피드의 `<channel>` 요소에 해당하는 정보를 저장합니다.

    Attributes:
        generator (CharField): 이 채널을 생성한 프로그램이나 시스템. (예: "WordPress")
        title (CharField): 채널의 이름. (예: "The New York Times")
        link (URLField): 채널의 웹사이트 URL.
        language (CharField): 채널 콘텐츠의 언어 코드. (예: "en-us")
        web_master (EmailField): 채널 관리자의 이메일 주소.
        copyright (TextField): 채널 콘텐츠의 저작권 정보.
        last_build_date (DateTimeField): 채널 콘텐츠가 마지막으로 업데이트된 시간.
        image_title (CharField): 채널을 대표하는 이미지의 제목.
        image_url (URLField): 채널을 대표하는 이미지의 URL.
        image_link (URLField): 이미지를 클릭했을 때 이동할 URL.
        image_width (IntegerField): 대표 이미지의 너비.
        image_height (IntegerField): 대표 이미지의 높이.
        description (TextField): 채널에 대한 설명.
    """
    generator = models.CharField(max_length=255, blank=True, null=True, help_text="채널을 생성한 프로그램")
    title = models.CharField(max_length=500, help_text="채널 이름")
    link = models.URLField(max_length=1000, help_text="채널 웹사이트 URL")
    language = models.CharField(max_length=10, help_text="콘텐츠 언어 (예: en-us)")
    web_master = models.EmailField(max_length=255, blank=True, null=True, help_text="채널 관리자 이메일")
    copyright = models.TextField(blank=True, null=True, help_text="저작권 정보")
    last_build_date = models.DateTimeField(blank=True, null=True, help_text="콘텐츠 마지막 업데이트 시간")
    image_title = models.CharField(max_length=500, blank=True, null=True, help_text="대표 이미지 제목")
    image_url = models.URLField(max_length=1000, blank=True, null=True, help_text="대표 이미지 URL")
    image_link = models.URLField(max_length=1000, blank=True, null=True, help_text="대표 이미지 클릭 시 이동 URL")
    image_width = models.IntegerField(blank=True, null=True, help_text="대표 이미지 너비")
    image_height = models.IntegerField(blank=True, null=True, help_text="대표 이미지 높이")
    description = models.TextField(blank=True, null=True, help_text="채널 설명")

    def __str__(self) -> str:
        """
        객체를 문자열로 표현할 때 채널의 제목을 반환합니다.

        Returns:
            str: 뉴스 채널의 제목.
        """
        return self.title


class NewsItem(BaseModel):
    """
    개별 뉴스 기사 항목을 저장하는 모델입니다.

    이 모델은 RSS 피드의 각 `<item>` 요소에 해당하는 정보를 저장하며,
    어떤 `NewsChannel`에 속하는지를 `channel` 외래 키로 참조합니다.

    Attributes:
        channel (ForeignKey): 이 기사가 속한 `NewsChannel`. 채널이 삭제되면 관련 기사도 함께 삭제됩니다.
        title (CharField): 기사의 제목.
        link (URLField): 기사의 원문 링크.
        guid (CharField): 기사를 고유하게 식별하는 ID. 중복 저장을 방지하기 위해 `unique=True`로 설정됩니다.
        pub_date (DateTimeField): 기사가 발행된 날짜와 시간.
        description (TextField): 기사의 요약 내용. HTML을 포함할 수 있습니다.
        source (CharField): 기사의 출처 또는 원본 소스. (예: "Reuters")
        source_url (URLField): 기사 출처의 URL.
    """
    channel = models.ForeignKey(NewsChannel, on_delete=models.CASCADE, related_name="items", help_text="기사가 속한 뉴스 채널")

    title = models.CharField(max_length=500, help_text="기사 제목")
    link = models.URLField(max_length=1000, help_text="기사 원문 링크")
    guid = models.CharField(max_length=1000, unique=True, help_text="기사 고유 식별자")
    pub_date = models.DateTimeField(help_text="기사 발행일")
    description = models.TextField(blank=True, null=True, help_text="기사 요약 내용")
    source = models.CharField(max_length=255, blank=True, null=True, help_text="기사 출처")
    source_url = models.URLField(max_length=1000, blank=True, null=True, help_text="기사 출처 URL")

    def __str__(self) -> str:
        """
        객체를 문자열로 표현할 때 기사의 제목을 반환합니다.

        Returns:
            str: 뉴스 기사의 제목.
        """
        return self.title

    class Meta:
        """
        NewsItem 모델의 메타 옵션을 정의합니다.
        
        `ordering` 옵션을 통해 쿼리 시 기본 정렬 순서를 지정합니다.
        """
        ordering = ['-pub_date']
