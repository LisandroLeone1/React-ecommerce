from django.urls import path
from .views import AgregarAlCarrito, CarritoUsuarioView, VaciarCarritoView

urlpatterns = [
    path('api/carrito/agregar/', AgregarAlCarrito.as_view(), name='agregar-al-carrito'),
    path('api/carrito/ver-carrito/', CarritoUsuarioView.as_view(), name='ver-carrito'),
    path('api/carrito/vaciar-carrito/', VaciarCarritoView.as_view(), name='vaciar-carrito'),
]
