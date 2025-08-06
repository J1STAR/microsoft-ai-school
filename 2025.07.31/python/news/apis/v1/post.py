"""
게시물 관련 API 뷰입니다.
"""

import uuid

from django.db.models import Q
from django.http import HttpRequest, JsonResponse
from django.utils import timezone
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView

from news.models import Post
from news.serializers.post import PostSerializer


class PostObjectMixin:
    """게시물 객체를 가져오는 Mixin입니다."""

    def get_object(self, pk: uuid.UUID) -> Post:
        """
        게시물 객체를 가져오거나 404 에러를 발생시키는 헬퍼 메서드입니다.

        Args:
            pk: 게시물의 기본 키입니다.

        Returns:
            Post 인스턴스입니다.

        Raises:
            NotFound: 주어진 pk를 가진 게시물이 존재하지 않거나 삭제된 경우 발생합니다.
        """
        try:
            return Post.objects.get(pk=pk, removed_at__isnull=True)
        except Post.DoesNotExist:
            raise NotFound(detail="게시글을 찾을 수 없습니다.")


# C: Create
# R: Retrieve (List)
class PostListView(APIView):
    """게시물을 생성하거나 게시물 목록을 조회합니다."""

    def post(self, request: HttpRequest) -> JsonResponse:
        """새로운 게시물을 생성합니다."""
        if not request.user.is_authenticated:
            return JsonResponse(
                {"status": "error", "message": "로그인이 필요합니다."}, status=401
            )

        data = request.data
        title = data.get("title", "")
        content = data.get("content", "")

        if not title or not content:
            return JsonResponse(
                {"status": "error", "message": "제목과 내용은 필수 항목입니다."},
                status=400,
            )

        try:
            post = Post.objects.create(
                title=title, content=content, author=request.user
            )
            serializer = PostSerializer(post)
        except Exception as e:
            print(e)
            return JsonResponse(
                {"status": "INTERNAL_SERVER_ERROR", "message": "게시글 생성 실패"},
                status=500,
            )

        return JsonResponse(
            {
                "status": "ok",
                "message": "게시글을 생성하였습니다.",
                "data": serializer.data,
            }
        )

    def get(self, request: HttpRequest) -> JsonResponse:
        """
        게시물 목록을 조회합니다.

        'q' 쿼리 파라미터를 사용하여 필터링할 수 있습니다.
        """
        query = request.query_params.get("q", "")

        posts = Post.objects.filter(
            Q(removed_at__isnull=True)
            & (Q(title__icontains=query) | Q(content__icontains=query))
        )
        serializer = PostSerializer(posts, many=True)

        return JsonResponse(
            {
                "status": "ok",
                "message": "게시글 목록을 조회하였습니다.",
                "data": serializer.data,
            }
        )


# R: Retrieve (Detail)
# U: Update
# D: Destroy
class PostDetailView(PostObjectMixin, APIView):
    """단일 게시물을 조회, 수정, 삭제합니다."""

    def get(self, request: HttpRequest, pk: uuid.UUID) -> JsonResponse:
        """
        단일 게시물을 조회합니다.

        Args:
            request: HTTP 요청입니다.
            pk: 게시물의 기본 키입니다.

        Returns:
            직렬화된 게시물 데이터가 포함된 JsonResponse입니다.
        """
        post = self.get_object(pk)
        serializer = PostSerializer(post)
        return JsonResponse(
            {
                "status": "ok",
                "message": "게시글을 조회하였습니다.",
                "data": serializer.data,
            }
        )

    def put(self, request: HttpRequest, pk: uuid.UUID) -> JsonResponse:
        """
        게시물을 업데이트합니다 (전체 업데이트).

        Args:
            request: HTTP 요청입니다.
            pk: 게시물의 기본 키입니다.

        Returns:
            업데이트된 게시물 데이터 또는 에러 메시지가 포함된 JsonResponse입니다.
        """
        return self._update(request, pk, partial=False)

    def patch(self, request: HttpRequest, pk: uuid.UUID) -> JsonResponse:
        """
        게시물을 부분적으로 업데이트합니다.

        Args:
            request: HTTP 요청입니다.
            pk: 게시물의 기본 키입니다.

        Returns:
            업데이트된 게시물 데이터 또는 에러 메시지가 포함된 JsonResponse입니다.
        """
        return self._update(request, pk, partial=True)

    def _update(
        self, request: HttpRequest, pk: uuid.UUID, partial: bool
    ) -> JsonResponse:
        post = self.get_object(pk)

        if not request.user.is_authenticated:
            return JsonResponse(
                {"status": "error", "message": "로그인이 필요합니다."}, status=401
            )

        if post.author != request.user:
            return JsonResponse(
                {"status": "error", "message": "수정 권한이 없습니다."}, status=403
            )

        serializer = PostSerializer(post, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(
                {
                    "status": "ok",
                    "message": "게시글을 수정하였습니다.",
                    "data": serializer.data,
                }
            )
        return JsonResponse(
            {"status": "error", "message": serializer.errors}, status=400
        )

    def delete(self, request: HttpRequest, pk: uuid.UUID) -> JsonResponse:
        """
        게시물을 소프트 삭제합니다.

        Args:
            request: HTTP 요청입니다.
            pk: 게시물의 기본 키입니다.

        Returns:
            상태 코드 204의 JsonResponse입니다.
        """
        post = self.get_object(pk)

        if not request.user.is_authenticated:
            return JsonResponse(
                {"status": "error", "message": "로그인이 필요합니다."}, status=401
            )

        if post.author != request.user:
            return JsonResponse(
                {"status": "error", "message": "삭제 권한이 없습니다."}, status=403
            )

        post.removed_at = timezone.now()
        post.save()

        return JsonResponse(
            {"status": "ok", "message": "게시글을 삭제하였습니다."}, status=204
        )
