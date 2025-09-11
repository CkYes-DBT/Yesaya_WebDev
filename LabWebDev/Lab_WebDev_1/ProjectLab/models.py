from django.db import models

class mahasiswa(models.Model):
  firstname = models.CharField(max_length=255, blank=False, null=False)
  lastname = models.CharField(max_length=255, blank=False, null=False)
  nim = models.CharField(max_length=10, default=1)
  jurusan = models.CharField(max_length=255, default="Teknik Informatika")

  def __str__(self):
    return self.firstname + ' ' + self.lastname