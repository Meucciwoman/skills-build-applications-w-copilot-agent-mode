from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import Team, Activity, Workout
from datetime import datetime, timedelta


class Command(BaseCommand):
    help = 'Populate the database with test data'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting database population...'))

        # Create test users
        users = []
        user_data = [
            {'username': 'alice', 'email': 'alice@example.com', 'first_name': 'Alice', 'last_name': 'Johnson'},
            {'username': 'bob', 'email': 'bob@example.com', 'first_name': 'Bob', 'last_name': 'Smith'},
            {'username': 'charlie', 'email': 'charlie@example.com', 'first_name': 'Charlie', 'last_name': 'Brown'},
            {'username': 'diana', 'email': 'diana@example.com', 'first_name': 'Diana', 'last_name': 'Wilson'},
        ]

        for data in user_data:
            user, created = User.objects.get_or_create(
                username=data['username'],
                defaults={'email': data['email'], 'first_name': data['first_name'], 'last_name': data['last_name']}
            )
            users.append(user)
            if created:
                self.stdout.write(self.style.SUCCESS(f'  Created user: {user.username}'))

        # Create test teams
        team_data = [
            {'name': 'Fitness Warriors', 'description': 'A team dedicated to fitness excellence'},
            {'name': 'Marathon Runners', 'description': 'Long-distance running enthusiasts'},
            {'name': 'Gym Rats', 'description': 'Weightlifting and strength training'},
        ]

        for data in team_data:
            team, created = Team.objects.get_or_create(
                name=data['name'],
                defaults={'description': data['description']}
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'  Created team: {team.name}'))

        # Create test activities
        activities_data = [
            {'user': users[0], 'activity_type': 'running', 'duration_minutes': 30, 'calories_burned': 300, 'distance_km': 5.0},
            {'user': users[0], 'activity_type': 'cycling', 'duration_minutes': 45, 'calories_burned': 400, 'distance_km': 15.0},
            {'user': users[1], 'activity_type': 'swimming', 'duration_minutes': 60, 'calories_burned': 500, 'distance_km': 2.0},
            {'user': users[1], 'activity_type': 'weightlifting', 'duration_minutes': 60, 'calories_burned': 350, 'distance_km': 0.0},
            {'user': users[2], 'activity_type': 'yoga', 'duration_minutes': 50, 'calories_burned': 200, 'distance_km': 0.0},
            {'user': users[3], 'activity_type': 'walking', 'duration_minutes': 40, 'calories_burned': 150, 'distance_km': 3.0},
        ]

        for data in activities_data:
            activity, created = Activity.objects.get_or_create(
                user=data['user'],
                activity_type=data['activity_type'],
                defaults={
                    'duration_minutes': data['duration_minutes'],
                    'calories_burned': data['calories_burned'],
                    'distance_km': data['distance_km'],
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'  Created activity: {activity}'))

        # Create test workouts
        workout_data = [
            {'name': 'Morning Run', 'description': 'A quick morning jog', 'difficulty': 'beginner', 'duration_minutes': 30, 'expected_calories': 300, 'exercises': 'Running'},
            {'name': 'CrossFit WOD', 'description': 'Workout of the day', 'difficulty': 'advanced', 'duration_minutes': 60, 'expected_calories': 600, 'exercises': 'Burpees, Squats, Push-ups'},
            {'name': 'Yoga Flow', 'description': 'Relaxing yoga session', 'difficulty': 'intermediate', 'duration_minutes': 50, 'expected_calories': 200, 'exercises': 'Various yoga poses'},
            {'name': 'Swimming Drill', 'description': 'Swimming technique practice', 'difficulty': 'intermediate', 'duration_minutes': 60, 'expected_calories': 500, 'exercises': 'Freestyle, Backstroke, Butterfly'},
        ]

        for data in workout_data:
            workout, created = Workout.objects.get_or_create(
                name=data['name'],
                defaults={
                    'description': data['description'],
                    'difficulty': data['difficulty'],
                    'duration_minutes': data['duration_minutes'],
                    'expected_calories': data['expected_calories'],
                    'exercises': data['exercises']
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'  Created workout: {workout.name}'))

        self.stdout.write(self.style.SUCCESS('Database population completed!'))
