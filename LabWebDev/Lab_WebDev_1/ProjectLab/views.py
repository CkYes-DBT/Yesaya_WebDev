from django.shortcuts import render, redirect
from .models import Mahasiswa

def mahasiswa_view(request):
    if request.method == 'POST':
        action = request.POST.get('action')

        if action == 'add':
            Mahasiswa.objects.create(
                nim=request.POST.get('nim'),
                firstname=request.POST.get('firstname'),
                lastname=request.POST.get('lastname'),
                jurusan=request.POST.get('jurusan'),
            )

        elif action == 'update':
            mhs = Mahasiswa.objects.get(id=request.POST.get('id'))
            mhs.firstname = request.POST.get('firstname')
            mhs.lastname = request.POST.get('lastname')
            mhs.jurusan = request.POST.get('jurusan')
            mhs.save()

        elif action == 'delete':
            mhs = Mahasiswa.objects.get(id=request.POST.get('id'))
            mhs.delete()

        return redirect('/ProjectLab/')

    mymahasiswa = Mahasiswa.objects.all()
    return render(request, 'index.html', {'mymahasiswa': mymahasiswa})


  
    
