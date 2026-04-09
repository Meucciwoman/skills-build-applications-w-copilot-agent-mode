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
    permission_classes = [permissions.IsAuthenticated]


class TeamViewSet(viewsets.ModelViewSet):
    """ViewSet for Team objects"""
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated]


class ActivityViewSet(viewsets.ModelViewSet):
    """ViewSet for Activity objects"""
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return Activity.objects.filter(user=self.request.user)


class LeaderboardViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Leaderboard objects"""
    queryset = Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer
    permission_classes = [permissions.IsAuthenticated]


class WorkoutViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Workout objects"""
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    permission_classes = [permissions.IsAuthenticated]
