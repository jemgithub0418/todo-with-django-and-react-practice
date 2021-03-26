from django.contrib import admin
from .models import Task, Batch
import datetime

class TaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'batch', 'completed', 'author',]
    list_display_links = ['title', 'batch', 'completed', 'author',]

    def author(self, obj):
        return obj.user.username

    fieldsets = (
        ('', {'fields': ('title',)}),
    )
    def save_model(self, request, obj, form, change):
        today = Batch.objects.filter(batch = datetime.date.today()).first()
        if not today:
            today = Batch.objects.create(batch = datetime.date.today())
        obj.batch = today
        super().save_model(request, obj, form, change)


admin.site.register(Task, TaskAdmin)
admin.site.register(Batch)
