from django.http import JsonResponse
from rest_framework.views import APIView

from news.models import Post


class PostListView(APIView):
    def get(self, request):
        posts = Post.objects.filter(removed_at__isnull=True)
        data = list(posts.values())

        return JsonResponse(
            {"status": "ok", "message": "게시글 목록을 조회하였습니다.", "data": data}
        )

    def post(self, request):
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
        except Exception as e:
            print(e)
            return JsonResponse(
                {"status": "INTERNAL_SERVER_ERROR", "message": "게시글 생성 실패"},
                status=500,
            )

        return JsonResponse(
            {"status": "ok", "message": "게시글을 생성하였습니다.", "data": post}
        )
