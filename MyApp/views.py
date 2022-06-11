from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.shortcuts import render, redirect
from .models import *

# Create your views here.


def homeview(request):
    cours = Cours.objects.all()
    levels = Level.objects.all()
    rating = Review.objects.all()
    context = {'cours':cours,'levels':levels,'rating':rating}
    return render(request,'MyApp/index.html',context)

def coursdetail(request, cour_id):
    cours = Cours.objects.get(pk=cour_id)
    if request.method == 'POST':
        RATE = request.POST['rate']
        print(RATE)
        review = Review(cours=cours, rating=RATE)
        cours.Rating= RATE
        cours.save()
        review.save()
        messages.success(request, 'Your review was added successfully!')  # <-
        return redirect('playlist')
    context = {'cours':cours}
    return render(request,'MyApp/CoursDetail.html',context)



def LoginViewPage(request):
    if request.method == 'POST':
        form1 = AuthenticationForm(request=request, data=request.POST)
        if form1.is_valid():
            username = form1.cleaned_data.get('username')
            password = form1.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                 login(request, user)
                 return redirect('home')
            else:
                messages.error(request, "Invalid username or password.")
        else:
            messages.error(request, "Invalid username or password.")
    form = AuthenticationForm()
    context = {'form': form}
    return render(request,'MyApp/LoginPage.html',context)

def SigninView(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('homepage')
    else:
        form = UserCreationForm()

    context = { 'form':form}
    return render(request,'MyApp/Signin.html',context)


def vediopage(request):
    cours = Cours.objects.all()
    levels = Level.objects.all()
    context = {'cours': cours, 'levels': levels}
    return render(request,'MyApp/portfolio.html',context)



def Levelpage(request,level_id):
    level = Level.objects.get(pk=level_id)
    cours = Cours.objects.filter(level=level_id)
    context = {'cours': cours, 'level': level}
    return render(request,'MyApp/levelpage.html',context)


def level(request):
    cours = Cours.objects.all()
    levels = Level.objects.all()
    context = {'cours': cours, 'levels': levels}
    return render(request,'MyApp/level.html',context)

def levelquiz(request,level_id):
    level = Level.objects.get(pk=level_id)
    context = {'level': level}
    return render(request,'MyApp/quizzbylevel.html',context)


def quiz1level1(request):
    return render(request,'MyApp/quiz1_level1.html')

def quiz1level2(request):
    return render(request,'MyApp/quiz1_level2.html')

def quiz1level3(request):
    return render(request,'MyApp/quiz1_level3.html')






def quiz2level1(request):
    return render(request,'MyApp/quiz2_level1.html')
def quiz2level2(request):
    return render(request,'MyApp/quiz2_level2.html')
def quiz2level3(request):
    return render(request,'MyApp/quiz2_level3.html')



def quiz3level1(request):
    return render(request,'MyApp/quiz3_level1.html')



def Quiz(request):
    return render(request,'MyApp/Quiz.html')
