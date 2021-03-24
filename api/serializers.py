from rest_framework import serializers
from rest_framework.response import Response
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class BatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['batch',]
