from django.contrib import admin
from .models import Task


class TaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'batch', 'completed']
    list_display_links = ['title', 'batch', 'completed']


admin.site.register(Task, TaskAdmin)
