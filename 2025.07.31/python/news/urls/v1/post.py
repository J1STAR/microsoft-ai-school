from django.urls import path
from news.apis.v1.post import PostListView, PostDetailView

urlpatterns = [
    path("", PostListView.as_view(), name="post-list"),
    path("<uuid:pk>/", PostDetailView.as_view(), name="post-detail"),
]
