from django.urls import path
from . import views

urlpatterns = [     
    path('ProjectLab/', views.Mahasiswa, name='mahasiswa_WebDev'),
]
