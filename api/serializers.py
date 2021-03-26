from rest_framework import serializers
from rest_framework.response import Response
from .models import Task

class BatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['batch',]


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            'id', 'title', 'completed', 'batch', 'user',
            ]
        depth = 1
