from django.db import models

class Mahasiswa(models.Model):
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    nim = models.CharField(max_length=10, unique=True)  
    jurusan = models.CharField(max_length=255, default="Teknik Informatika")

    def __str__(self):
        return f"{self.firstname} {self.lastname} - {self.nim}"