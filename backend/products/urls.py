from django.urls import path, include
from .views import ProductoViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'producto', ProductoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]