from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Team, TeamMember, Activity, Leaderboard, Workout


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class TeamMemberSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = TeamMember
        fields = ['id', 'user', 'joined_at']


class TeamSerializer(serializers.ModelSerializer):
    members = serializers.SerializerMethodField()

    class Meta:
        model = Team
        fields = ['id', 'name', 'description', 'members', 'created_at', 'updated_at']

    def get_members(self, obj):
        # Handle teams without primary keys
        if not obj.pk:
            return []
        try:
            members = obj.members.all()
            return TeamMemberSerializer(members, many=True).data
        except (ValueError, AttributeError):
            return []


class ActivitySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Activity
        fields = ['id', 'user', 'activity_type', 'duration_minutes', 'calories_burned', 'distance_km', 'date', 'notes', 'created_at', 'updated_at']


class LeaderboardSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    team = TeamSerializer(read_only=True)

    class Meta:
        model = Leaderboard
        fields = ['id', 'user', 'team', 'total_activities', 'total_calories_burned', 'total_distance_km', 'rank', 'updated_at']


class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'difficulty', 'duration_minutes', 'expected_calories', 'exercises', 'created_at', 'updated_at']
