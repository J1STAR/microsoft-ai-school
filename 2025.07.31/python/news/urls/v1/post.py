from django.urls import path
from news.apis.v1.post import PostCreateView, PostListView, PostRetrieveView, PostUpdateView, PostDestroyView

urlpatterns = [
    path("", PostListView.as_view(), name="post-list"),
    path("", PostCreateView.as_view(), name="post-create"),
    path("<int:pk>/", PostRetrieveView.as_view(), name="post-detail"),
    path("<int:pk>/", PostUpdateView.as_view(), name="post-update"),
    path("<int:pk>/", PostDestroyView.as_view(), name="post-delete"),
]
