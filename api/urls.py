from django.urls import path
from .views import (
        apiOverview, taskList, taskDetail, taskCreate, taskDelete, taskUpdate, batchList, tasksperbatch,
    )

app_name = 'api'

urlpatterns= [
    path('', apiOverview, name= 'overview'),
    path('task-list/', taskList, name='task-list'),
    path('task-detail/<int:id>/', taskDetail, name='task-detail'),
    path('task-create/', taskCreate, name='task-create'),
    path('task-delete/<int:id>/',taskDelete, name='task-delete'),
    path('task-update/<int:id>/',taskUpdate, name='task-update'),
    path('batch-list/', batchList, name = 'batch-list'),
    path('task-batch/<str:batch>/', tasksperbatch, name='task-batch' ),
]
