from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Task, Batch
from .serializers import TaskSerializer, BatchSerializer
import datetime

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List': 'task-list/',
        'Detail': 'task-detail/',
        'Create': 'task-create/',
        'Delete': 'task-create/<int:id>/',
        'Update': 'task-update/<int:id>/',
    }
    return Response(api_urls)


@api_view(['GET'])
def taskList(request):
    batch_today = Batch.objects.get(batch = datetime.date.today())
    tasks = Task.objects.filter(user = request.user, batch_id = batch_today.id).order_by('-id')
    serializer = TaskSerializer(tasks, many =True)
    return Response(serializer.data)


@api_view(['GET'])
def taskDetail(request, id):
    task = Task.objects.get(id= id)
    serializer = TaskSerializer(task, many= False)
    return Response(serializer.data)


@api_view(['POST'])
def taskCreate(request):
    check_batch = Batch.objects.filter(batch = datetime.date.today()).first()
    if check_batch is None:
        check_batch = Batch.objects.create(batch = datetime.date.today())
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(batch = check_batch, user = request.user)
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


@api_view(['GET'])
def batchList(request):
    batchlist = Batch.objects.filter(batch__lt = datetime.date.today())
    serializer = BatchSerializer(batchlist, many =True)
    return Response(serializer.data)
