from django.urls import path
from .views import (
        apiOverview, taskList, taskDetail, taskCreate, taskDelete, taskUpdate, batchList
    )

app_name = 'api'

urlpatterns= [
    path('', apiOverview, name= 'overview'),
    path('task-list/', taskList, name='task-list'),
    path('task-detail/<int:id>/', taskDetail, name='task-detail'),
    path('task-create/', taskCreate, name='task-create'),
    path('task-delete/<int:id>/',taskDelete, name='task-delete'),
    path('task-update/<int:id>/',taskUpdate, name='task-update'),
    path('sample/', batchList, name='sample'),
]
