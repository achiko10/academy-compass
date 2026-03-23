from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('avatar_url', 'bio', 'university', 'interests')

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'profile')
        read_only_fields = ('email', 'username')

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None)
        
        # Core user fields update
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()

        # Nested profile update
        if profile_data is not None:
            profile = instance.profile
            profile.avatar_url = profile_data.get('avatar_url', profile.avatar_url)
            profile.bio = profile_data.get('bio', profile.bio)
            profile.university = profile_data.get('university', profile.university)
            profile.interests = profile_data.get('interests', profile.interests)
            profile.save()

        return instance


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, style={'input_type': 'password'}, min_length=8
    )
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name')

    def validate_email(self, value):
        """Ensure email is unique across all users."""
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("ეს Email უკვე გამოყენებულია. გთხოვ სხვა Email-ი მიუთითო.")
        return value.lower()

    def validate_username(self, value):
        """Ensure username is unique (case-insensitive)."""
        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError("ეს მომხმარებლის სახელი უკვე დაკავებულია.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user
