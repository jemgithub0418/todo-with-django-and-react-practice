from django.db import models
from django.contrib.auth.models import User

class Batch(models.Model):
    batch = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ['-batch']
        verbose_name = 'Batch'
        verbose_name_plural = 'Batches'

    def __str__(self):
        return self.batch.strftime("%B %d, %Y %A")

class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(
            max_length = 256,
        )
    completed = models.BooleanField(
            default =  False,
        )
    batch = models.ForeignKey(Batch, related_name = 'tasks', on_delete=models.CASCADE)

    def __str__(self):
        return self.title
