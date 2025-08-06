from django.db import models
import uuid

from .common import BaseModel

class Post(BaseModel):
    id = models.UUIDField(
        primary_key=True, unique=True, default=uuid.uuid4, verbose_name="ID"
    )

    title = models.CharField(max_length=100, verbose_name="제목")
    content = models.TextField(verbose_name="내용", blank=True, null=True)
    author = models.ForeignKey("User", on_delete=models.CASCADE, verbose_name="작성자")

    removed_at = models.DateTimeField(verbose_name="삭제일시", blank=True, null=True)