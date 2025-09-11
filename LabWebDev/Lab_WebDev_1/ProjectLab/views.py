from django.shortcuts import HttpResponse
from django.template import loader
from .models import mahasiswa

def Mahasiswa(request):
    mymahasiswa = mahasiswa.objects.all().values()
    template = loader.get_template('index.html')

    context = {
        'mymahasiswa': mymahasiswa,
    }

    return HttpResponse(template.render(context, request))
    
