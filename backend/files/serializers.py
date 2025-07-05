from rest_framework import serializers
from .models import UserFile, Folder

class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = ['id', 'name', 'parent']
        
class UserFileSerializer(serializers.ModelSerializer):
    folder = serializers.PrimaryKeyRelatedField(queryset=Folder.objects.all(), required=False)

    class Meta:
        model = UserFile
        fields = ['id', 'file', 'original_name', 'uploaded_at', 'folder']
        read_only_fields = ['original_name', 'uploaded_at']

    def create(self, validated_data):
        file = validated_data.get('file')
        validated_data['original_name'] = file.name
        return super().create(validated_data)
    def update(self, instance, validated_data):
        validated_data.pop('user', None)  
        return super().update(instance, validated_data)