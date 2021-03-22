from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List': 'task-list/',
        'Detail': 'task-detail/',
        'Create': 'task-create/',
        'Delete': 'task-delete/<int:id>/',
        'Update': 'task-update/<int:id>/',

    }
    return Response(api_urls)


@api_view(['GET'])
def taskList(request):
    tasks = Task.objects.all().order_by('-id')
    serializer = TaskSerializer(tasks, many =True)
    return Response(serializer.data)


@api_view(['GET'])
def taskDetail(request, id):
    task = Task.objects.get(id= id)
    serializer = TaskSerializer(task, many= False)
    return Response(serializer.data)


@api_view(['POST'])
def taskCreate(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def taskDelete(request, id):
    task = Task.objects.get(id = id)
    task.delete()
    return Response("Task was deleted.")


@api_view(['POST'])
def taskUpdate(request, id):
    task = Task.objects.get(id=id)
    serializer = TaskSerializer(instance=task, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
