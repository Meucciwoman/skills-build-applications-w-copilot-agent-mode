from django.db import models
from django.contrib.auth.models import User


class Team(models.Model):
    """Model for user teams"""
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class TeamMember(models.Model):
    """Model for team membership"""
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='members')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='team_memberships')
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('team', 'user')

    def __str__(self):
        return f"{self.user.username} in {self.team.name}"


class Activity(models.Model):
    """Model for fitness activities"""
    ACTIVITY_TYPE_CHOICES = [
        ('running', 'Running'),
        ('cycling', 'Cycling'),
        ('swimming', 'Swimming'),
        ('weightlifting', 'Weightlifting'),
        ('yoga', 'Yoga'),
        ('walking', 'Walking'),
        ('other', 'Other'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities')
    activity_type = models.CharField(max_length=20, choices=ACTIVITY_TYPE_CHOICES)
    duration_minutes = models.IntegerField()
    calories_burned = models.IntegerField(default=0)
    distance_km = models.FloatField(default=0)
    date = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.activity_type}"


class Leaderboard(models.Model):
    """Model for tracking leaderboard entries"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='leaderboard')
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='leaderboard')
    total_activities = models.IntegerField(default=0)
    total_calories_burned = models.IntegerField(default=0)
    total_distance_km = models.FloatField(default=0)
    rank = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - Rank {self.rank}"


class Workout(models.Model):
    """Model for predefined workouts"""
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    difficulty = models.CharField(max_length=20, choices=[
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ])
    duration_minutes = models.IntegerField()
    expected_calories = models.IntegerField()
    exercises = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
