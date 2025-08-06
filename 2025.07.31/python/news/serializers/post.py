from rest_framework import serializers
from news.models import Post

class PostSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    author_id = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = "__all__"

    def get_author(self, obj):
        return obj.author.name
    
    def get_author_id(self, obj):
        return obj.author.id