from rest_framework import serializers
from news.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "name", "last_login", "created_at", "updated_at"]


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "name", "address", "phone_number", "last_login", "created_at", "updated_at"]