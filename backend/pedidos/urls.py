from django.urls import path
from .views import AgregarPedido, PedidoUsuario

urlpatterns = [
    path('api/pedidos/agregar/', AgregarPedido.as_view(), name='agregar-pedido'),
    path('api/pedidos/ver-pedido/<int:id>/', PedidoUsuario.as_view(), name='ver-pedido'),
]



