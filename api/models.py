from django.db import models

class Task(models.Model):
    title = models.CharField(
            max_length = 256,
        )
    completed = models.BooleanField(
            default =  False,
        )
    batch = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title
