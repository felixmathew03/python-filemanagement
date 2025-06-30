from rest_framework.routers import DefaultRouter
from .views import UserFileViewSet, FolderViewSet

router = DefaultRouter()
router.register(r'files', UserFileViewSet, basename='userfile')
router.register(r'folders', FolderViewSet, basename='folder')

urlpatterns = router.urls
