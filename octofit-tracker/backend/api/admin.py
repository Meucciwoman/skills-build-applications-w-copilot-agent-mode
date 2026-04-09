from django.contrib import admin
from .models import Team, TeamMember, Activity, Leaderboard, Workout


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at', 'updated_at']
    search_fields = ['name']


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['user', 'team', 'joined_at']
    search_fields = ['user__username', 'team__name']


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ['user', 'activity_type', 'duration_minutes', 'calories_burned', 'created_at']
    search_fields = ['user__username', 'activity_type']
    list_filter = ['activity_type', 'created_at']


@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ['user', 'team', 'rank', 'total_activities', 'total_calories_burned']
    search_fields = ['user__username', 'team__name']
    list_filter = ['rank']


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ['name', 'difficulty', 'duration_minutes', 'expected_calories']
    search_fields = ['name']
    list_filter = ['difficulty']
