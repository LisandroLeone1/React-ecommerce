from .views import Register, UserDetail
from django.urls import path



urlpatterns = [
    path('api/user-register/', Register.as_view(), name='user_register'),
    path('api/user-profile/', UserDetail.as_view(), name='user_profile'),
]