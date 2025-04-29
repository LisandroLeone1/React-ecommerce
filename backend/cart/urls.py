from django.urls import path
from .views import AgregarAlCarrito, CarritoUsuarioView

urlpatterns = [
    path('api/carrito/agregar/', AgregarAlCarrito.as_view(), name='agregar-al-carrito'),
    path('api/carrito/ver-carrito/', CarritoUsuarioView.as_view(), name='ver-carrito'),
]