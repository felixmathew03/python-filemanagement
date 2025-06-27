# files/views.py
from rest_framework import viewsets, permissions
from .models import UserFile
from .serializers import UserFileSerializer

class UserFileViewSet(viewsets.ModelViewSet):  # ✅ this must be ModelViewSet
    serializer_class = UserFileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserFile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, original_name=self.request.FILES['file'].name)
