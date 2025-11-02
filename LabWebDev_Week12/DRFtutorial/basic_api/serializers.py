from rest_framework import serializers
from .models import DRFPost
from basic_api.models import DRFPost    

class DRFPostSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = DRFPost
        fields = ['id', 'name', 'author', 'uploaded', 'rating', 'image']