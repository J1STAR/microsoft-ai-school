from django.db import models
import uuid

from .common import BaseModel


class Memo(BaseModel):
    title = models.CharField(max_length=100, verbose_name="제목")
    content = models.TextField(verbose_name="내용", blank=True, null=True)
    author = models.ForeignKey("User", on_delete=models.CASCADE, verbose_name="작성자")

    def __str__(self):
        return self.title
