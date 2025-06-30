# files/views.py
from rest_framework import viewsets, permissions
from .models import UserFile, Folder
from .serializers import UserFileSerializer, FolderSerializer

class UserFileViewSet(viewsets.ModelViewSet):  
    serializer_class = UserFileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = UserFile.objects.filter(user=self.request.user)
        folder_id = self.request.query_params.get('folder')  # ← check if folder filter is passed
        if folder_id:
            queryset = queryset.filter(folder_id=folder_id)
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, original_name=self.request.FILES['file'].name)

class FolderViewSet(viewsets.ModelViewSet):
    serializer_class = FolderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only return folders owned by the authenticated user
        return Folder.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Automatically set the folder's user to the authenticated user
        serializer.save(user=self.request.user)