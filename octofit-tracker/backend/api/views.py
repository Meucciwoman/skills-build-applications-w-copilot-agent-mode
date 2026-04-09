from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Team, Activity, Leaderboard, Workout
from .serializers import UserSerializer, TeamSerializer, ActivitySerializer, LeaderboardSerializer, WorkoutSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for User objects"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class TeamViewSet(viewsets.ModelViewSet):
    """ViewSet for Team objects"""
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        # Filter out teams without primary keys (MongoDB issues)
        return Team.objects.filter(pk__isnull=False)


class ActivityViewSet(viewsets.ModelViewSet):
    """ViewSet for Activity objects"""
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user if self.request.user.is_authenticated else None)

    def get_queryset(self):
        # Return all activities for now, can be filtered by user if authenticated
        return Activity.objects.all()


class LeaderboardViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Leaderboard objects"""
    queryset = Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer
    permission_classes = [permissions.AllowAny]


class WorkoutViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Workout objects"""
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    permission_classes = [permissions.AllowAny]
