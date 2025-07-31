from rest_framework import serializers
from news.models import NewsChannel, NewsItem

class NewsChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsChannel
        fields = "__all__"


class NewsItemSerializer(serializers.ModelSerializer):
    pub_date = serializers.SerializerMethodField()

    class Meta:
        model = NewsItem
        fields = ["title", "pub_date", "source", "link"]

    def get_pub_date(self, obj):
        return obj.pub_date.strftime("%Y년 %m월 %d일")