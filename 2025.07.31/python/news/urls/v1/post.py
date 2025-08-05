from django.urls import path
from news.apis.v1.post import PostListView

urlpatterns = [
    path("", PostListView.as_view(), name="post-list"),
]