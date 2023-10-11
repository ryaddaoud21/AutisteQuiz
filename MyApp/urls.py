from django.contrib import admin
from django.urls import path
from .views import *
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', homeview,name='homepage'),
    path('Signin/', SigninView,name='Signin'),
    path('login/', auth_views.LoginView.as_view(template_name='MyApp/LoginPage.html'), name='Login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('Playlist/',vediopage , name='playlist'),
    path('Quiz/',Quiz , name='Quiz'),
    path('Cours_Details/<int:cour_id>',coursdetail , name='coursdetail'),
    path('Level/',level , name='level'),
    path('Level/<int:level_id>',Levelpage , name='levelpage'),
    path('Level/<int:level_id>/Quiz',levelquiz , name='levelquiz'),
    path('Level/1/Quiz/1',quiz1level1 , name='quiz1level1'),
    path('Level/1/Quiz/2',quiz2level1 , name='quiz2level1'),
    path('Level/1/Quiz/3',quiz3level1 , name='quiz3level1'),


    path('Level/2/Quiz/1',quiz1level2 , name='quiz1level2'),
    path('Level/2/Quiz/2',quiz2level2 , name='quiz2level2'),
    path('Level/2/Quiz/3',quiz2level3 , name='quiz2level3'),



    path('Level/3/Quiz/1',quiz1level3 , name='quiz1level3'),
    path('Recommendation/',Recommendation , name='Recommendation'),

]
