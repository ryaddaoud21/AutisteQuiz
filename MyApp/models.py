from django.db import models
from django.contrib.auth.models import User




class Utilisateu(models.Model):
    CHOICES = (
        ('Homme', 'Homme'),
        ('Femme', 'Femme'),
    )
    user = models.OneToOneField(User,null=True, blank=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, null=True)
    email = models.CharField(max_length=200,null=True)
    Sex =models.CharField(max_length=50 ,choices=CHOICES,null=True)

class Level(models.Model):

    Level = models.IntegerField(blank=False, null=False)
    Description = models.CharField(max_length=500,blank=False, null=False)
    image = models.ImageField(blank=False, null=False)
    IQ_Interval = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.Description


class Quizz(models.Model):
    title = models.CharField(max_length=200, null=False)
    description = models.CharField(max_length=200)


class Cours(models.Model):
    title = models.CharField(max_length=200, null=False)
    description = models.CharField(max_length=200)
    Vedio = models.CharField(max_length=200,null=True, blank=True)
    level = models.ForeignKey(Level,null=True, blank=True,related_name='level',on_delete=models.CASCADE)
    Rating = models.IntegerField(default=3)


    def __str__(self):
        return self.title






class Review(models.Model):
    cours = models.ForeignKey(Cours,null=True, blank=True, on_delete=models.CASCADE)
    date_added = models.DateTimeField(auto_now_add=True)
    rating = models.IntegerField(default=3)


    def __str__(self):
        return str(self.cours)













