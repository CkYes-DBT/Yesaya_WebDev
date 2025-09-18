from django.urls import path
from . import views

urlpatterns = [     
    path('ProjectLab/', views.mahasiswa_view, name='mahasiswa_WebDev'),
]

